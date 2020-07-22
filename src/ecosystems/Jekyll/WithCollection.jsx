import React, { useState, useEffect } from 'react';
import { WithLoader, WithChildren } from '../';
import { notifier } from '../../lib';

export const WithCollection = ({ children, ...props }) => {
  // console.debug('WithCollection', { children, props });

  const { github, branch, jekyll = {}, pageProps, parseFrontMatter } = props;
  const { collections_dir = '' } = jekyll;
  const { collection } = pageProps;
  const [ collDir, setCollDir ] = useState('');
  const [ entries, setEntries ] = useState([]);
  const [ fixedOptions, setFixedOptions ] = useState();
  const [ loading, setLoading ] = useState(true);
  const filterEntries = (file) => !/^_/.test(file.name);
  const friendlyName = (name) => name.replace(/\.[a-zA-Z]{2,}$/, '');

  useEffect(() => {
    const loadCollection = async () => {
      setLoading(true);

      try {
        const prefix = (collections_dir || '').replace(/\/$/g, '');
        const dir = `${prefix}/_${collection}`;
        const files = await github.getContents(Object.assign({}, pageProps, { path: dir, ref: branch }));

        setCollDir(dir);
        setEntries(files);

        const file = files.find(file => file.type === 'file' && /^_options\.md$/i.test(file.name));
        if (file) {
          const data = await github.getContents(Object.assign({}, pageProps, { path: file.path, ref: branch }));
          const { fields } = parseFrontMatter(data);
          setFixedOptions(fields);
        }
      } catch (err) {
        notifier.airbrake(err);
      }

      setLoading(false);
    };

    loadCollection();
  }, [ github, branch, pageProps, collection, collections_dir, parseFrontMatter ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ entries, collDir, filterEntries, fixedOptions, friendlyName }} />
    </WithLoader>
  );
};
