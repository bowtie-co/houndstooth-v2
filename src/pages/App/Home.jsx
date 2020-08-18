import React from 'react';
import { WithApp, WithLanguage } from '../../ecosystems';
import { DebugProps, AppHome } from '../../organisms';

export const AppHomePage = (props) => {
  return (
    <WithLanguage>
      <WithApp {...props}>
        <AppHome />
        <DebugProps debug {...props} />
      </WithApp>
    </WithLanguage>
  );
};
