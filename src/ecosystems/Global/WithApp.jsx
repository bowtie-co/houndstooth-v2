import React from 'react';
import { WithChildren, WithSidebar } from '.';

export const WithApp = ({ children, ...props }) => {
  // TODO: Cleanup usage for deployed url detect (enhance with build/deploy api data)
  const getDeployedUrl = (branch) => `${branch}.preview.example.com`.toLowerCase();

  const appProps = {
    getDeployedUrl,
  };

  return (
    <WithSidebar {...props} {...appProps}>
      <WithChildren children={children} {...props} {...appProps} />
    </WithSidebar>
  );
};
