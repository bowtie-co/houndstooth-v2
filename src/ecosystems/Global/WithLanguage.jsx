import React, { useCallback, useEffect, useState } from 'react';
import { language, storage } from '../../lib';
import { WithChildren } from '..';

export const WithLanguage = ({ children, ...props }) => {
  // console.debug('WithLanguage', { children, props });
  const [ lang, setLang ] = useState(storage.get('lang') || 'en');

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

  useEffect(() => {
    storage.set('lang', lang);
  }, [ lang ]);

  const languageProps = {
    languages: Object.keys(language),
    lang,
    setLang,
    translate
  };

  return (
    <WithChildren children={children} {...props} {...languageProps} />
  );
};
