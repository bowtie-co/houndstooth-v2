import React from 'react';
import { WithApp } from '../../ecosystems';
import { DebugProps, AppHome } from '../../organisms';

export const PageHome = (props) => {
  return (
    <WithApp {...props}>
      <AppHome />
      <DebugProps debug {...props} />
    </WithApp>
  );
};
