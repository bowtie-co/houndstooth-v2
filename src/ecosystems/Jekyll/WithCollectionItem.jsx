import React, { useState, useEffect, useCallback } from 'react';
import * as yaml from 'js-yaml';
import slugify from 'slugify';
import { WithLoader, WithChildren } from '../';
import { notifier } from '../../lib';

export const WithCollectionItem = ({ children, ...props }) => {
  const { repo, entries, openPull, github, branch, jekyll, repoProps, pageProps, parseFrontMatter, makePullPending, setBranchRef, translate } = props;
  const { collection, entry } = pageProps;
  const [itemFile, setItemFile] = useState({});
  const [itemName, setItemName] = useState(entry);
  const [itemFields, setItemFields] = useState({});
  const [itemContent, setItemContent] = useState('');
  const [loading, setLoading] = useState(true);
  const isItemNew = () => (entry === '_new');

  const mergeFile = useCallback((updates) => {
    setItemFile(Object.assign({}, itemFile, updates));
  }, [itemFile]);

  const getItemPath = useCallback((item) => {
    return `${(jekyll.collections_dir || '').replace(/\/$/g, '')}/_${collection}/${item}`;
  }, [jekyll, collection]);

  const itemPath = isItemNew() ? getItemPath('_fields.md') : getItemPath(entry);

  const defaultName = useCallback(() => {
    return ['_new', '_fields.md'].includes(itemName) ? '' : itemName;
  }, [itemName]);

  const isNameTaken = useCallback(() => {
    const currentNames = entries.map(e => e.name).filter(e => e !== entry);
    return currentNames.includes(itemName);
  }, [itemName, entries, entry]);

  const isValidName = useCallback(() => {
    return itemName && itemName.replace(/\.[^.]+$/, '') !== '' && defaultName() !== '';
  }, [itemName, defaultName]);

  const updateItemName = useCallback((rawName) => {
    // TODO: @Brennan - Sanitize for spanish?
    let newName = slugify(rawName).replace(/[^a-z0-9\s-_.]/gmi, '');

    if (newName && newName !== '' && !/\.(html|md)$/i.test(newName)) newName += '.md';

    console.log('updateItemName', rawName, newName);

    setItemName(newName);
  }, [setItemName]);

  useEffect(() => {
    if (itemName !== itemFile.name) {
      mergeFile({
        name: itemName,
        path: getItemPath(itemName).replace(/^\/+/, '')
      });
    }
  }, [itemName, itemFile, mergeFile, getItemPath]);

  useEffect(() => {
    const loadCollectionItem = async () => {
      setLoading(true);

      const headers = {
        'If-None-Match': ''
      };

      try {
        const file = await github.getContents(Object.assign({}, pageProps, { headers, path: itemPath, ref: branch }));
        const { fields, content } = parseFrontMatter(file);

        setItemFile(file);
        setItemFields(fields);
        setItemContent(content);
      } catch (err) {
        notifier.airbrake(err);
      }

      setLoading(false);
    };

    loadCollectionItem();
  }, [github, branch, pageProps, collection, entry, parseFrontMatter, itemPath]);

  const upsertItem = (duplicate = false, follow = true) => {
    const { entry } = pageProps;
    const { name, path, sha } = itemFile;

    const message = `[HT] ${sha ? 'Updated' : 'Created'} file: ${path}`;
    const content = Buffer.from(`---\n${yaml.safeDump(itemFields)}\n---\n${itemContent ? itemContent.trim() : ''}\n`).toString('base64');
    const params = Object.assign({}, repoProps, {
      sha,
      path,
      branch,
      content,
      message
    });

    setLoading(true);

    // console.log('WithCollectionItem: (before) createOrUpdateFile()', params);

    const completeUpsert = () => {
      if (!duplicate && name !== entry && entry !== '_new') {
        // console.log('WithCollectionItem.upsertItem() - RENAME ITEM:', { entry, name });

        const deleteParams = Object.assign({}, repoProps, {
          sha,
          branch,
          path: path.replace(name, entry),
          message: `[HT] Rename file: ${entry} => ${name}`
        });

        return github.deleteFile(deleteParams);
      } else {
        return Promise.resolve(itemFile);
      }
    };

    github.createOrUpdateFile(params).then(data => {
      // console.log('WithCollectionItem.upsertItem()', { params, data });
      setItemFile(data.content);

      if (data.commit && data.commit.sha) {
        setBranchRef(data.commit.sha);
      }

      return completeUpsert().then(resp => {
        // console.log('WithCollectionItem.upsertItem() - completeUpsert()', { entry, name, resp });

        notifier.success(translate('notify.item_saved'));

        makePullPending(openPull, (err, pull) => {
          if (err) console.warn(err);

          setLoading(false);

          if (follow && itemName !== entry) {
            window.location.href = `/${repo.full_name}/collections/${collection}/${itemName}`;
          }
        });
      });
    }).catch(err => {
      console.warn(err);
      notifier.bad(err);
      setLoading(false);
    });
  };

  const deleteItem = (follow = true) => {
    const { path, sha } = itemFile;
    const deleteParams = Object.assign({}, repoProps, {
      sha,
      branch,
      path,
      message: `[HT] Delete file: ${path}`
    });

    setLoading(true);

    github.deleteFile(deleteParams).then(resp => {
      // console.log('WithCollectionItem.deleteItem() - File deleted', { sha, path, resp });
      // TODO: Failure here with "translate is not a function" ... missing from parent ecosystem/props?
      // notifier.success(translate('notify.item_deleted'));

      makePullPending(openPull, (err, pull) => {
        if (err) console.warn(err);

        setLoading(false);

        if (follow) {
          window.location.href = `/${repo.full_name}/collections/${collection}`;
        }
      });
    }).catch(err => {
      console.warn(err);
      notifier.bad(err);
      setLoading(false);
    });
  };

  const itemProps = {
    isItemNew,
    itemName,
    setItemName,
    itemFile,
    setItemFile,
    itemFields,
    setItemFields,
    itemContent,
    setLoading,
    setItemContent,
    defaultName,
    isValidName,
    isNameTaken,
    updateItemName,
    upsertItem,
    deleteItem
  };

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...itemProps} />
    </WithLoader>
  );
};
