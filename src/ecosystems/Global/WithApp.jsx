import React, { useState, useCallback } from 'react';
import { WithChildren, WithSidebar } from '.';
import { language } from '../../lib';

export const WithApp = ({ children, ...props }) => {
  const [ lang, setLang ] = useState('en');

  // TODO: Cleanup usage for deployed url detect (enhance with build/deploy api data)
  const getDeployedUrl = (branch) => `${branch}.preview.example.com`.toLowerCase();

  const translate = useCallback((key) => {
    const data = language[lang];
    const parts = key.split('.');
    let pointer = data;

    if (!data) {
      throw new Error(`Invalid language: ${lang}`);
    }

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (pointer[part]) {
        pointer = pointer[part];
      }
    }

    return pointer;
  }, [ lang ]);

  const appProps = {
    languages: Object.keys(language),
    lang,
    setLang,
    translate,
    getDeployedUrl,
  };

  return (
    <WithSidebar {...props} {...appProps}>
      <WithChildren children={children} {...props} {...appProps} />
    </WithSidebar>
  );
};
