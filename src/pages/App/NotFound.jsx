import React from 'react';
import { WithApp } from '../../ecosystems';
import { DebugProps, AppNotFound } from '../../organisms';

export const AppNotFoundPage = (props) => {
  return (
    <WithApp {...props}>
      <AppNotFound />
      <DebugProps debug {...props} />
    </WithApp>
  );
};
