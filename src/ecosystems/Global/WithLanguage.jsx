import React, { useCallback, useState } from 'react';
import { language } from '../../lib';
import { WithChildren } from '..';

export const WithLanguage = ({ children, ...props }) => {
  // console.debug('WithLanguage', { children, props });
  const [ lang, setLang ] = useState('en');

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

  const languageProps = {
    languages: Object.keys(language),
    lang,
    setLang,
    translate,
  };

  return (
    <WithChildren children={children} {...props} {...languageProps} />
  );
};
