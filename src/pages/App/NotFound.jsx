import React from 'react';
import { WithApp, WithLanguage } from '../../ecosystems';
import { DebugProps, AppNotFound } from '../../organisms';

export const AppNotFoundPage = (props) => {
  return (
    <WithLanguage>
      <WithApp {...props}>
        <AppNotFound />
        <DebugProps debug {...props} />
      </WithApp>
    </WithLanguage>
  );
};
