import React, { useState, useEffect } from 'react';
import * as toml from 'toml';
import * as yaml from 'js-yaml';
import { WithLoader, WithChildren } from '..';
import { notifier } from '../../lib';

export const JEKYLL_FIELDS_SEP = '---';

export const WithJekyll = ({ children, ...props }) => {
  // console.debug('WithJekyll', { children, props });

  const [ jekyll, setJekyll ] = useState();
  const [ loading, setLoading ] = useState(true);
  const { github, branch, pageProps } = props;

  const parseFields = (path, content) => {
    let fields = {};

    if (/toml$/.test(path)) {
      fields = toml.parse(content);
    } else {
      fields = yaml.safeLoadAll(content);
    }

    // console.debug('parseFields', { path, fields, content });

    // TODO: Why is sometimes array for single file?
    if (Array.isArray(fields)) {
      return fields[0];
    }

    return fields;
  };

  const parseFrontMatter = (file) => {
    const content = Buffer.from(file.content, 'base64').toString();
    const fileParts = content.split(JEKYLL_FIELDS_SEP);

    // console.debug(fileParts.length, 'fileParts', { fileParts });

    let data = {
      fields: {},
      content: ''
    };

    if (fileParts.length > 1) {
      data.fields = parseFields(file.path, fileParts[1]);
    }

    if (fileParts.length > 2) {
      fileParts.shift();
      fileParts.shift();
      data.content = fileParts.join(JEKYLL_FIELDS_SEP);
    }

    // console.debug('parseFrontMatter', { data, file });

    return data;
  };

  useEffect(() => {
    const loadJekyllConfig = async () => {
      setLoading(true);

      try {
        const files = await github.getContents(Object.assign({}, pageProps, { path: '.', ref: branch }));
        const file = files.find(file => file.type === 'file' && /^_config\.(to|ya?)ml$/i.test(file.name));

        if (file) {
          const data = await github.getContents(Object.assign({}, pageProps, { path: file.path, ref: branch }));
          const content = Buffer.from(data.content, 'base64').toString();

          setJekyll(parseFields(data.path, content));
        }
      } catch (err) {
        notifier.airbrake(err);
      }

      setLoading(false);
    };

    loadJekyllConfig();
  }, [ github, branch, pageProps ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ jekyll, parseFields, parseFrontMatter }} />
    </WithLoader>
  );
};
