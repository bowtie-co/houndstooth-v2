import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo } from '../../ecosystems';
import { PullSingle } from '../../organisms';

export const PullOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithApp>
          <PullSingle />
        </WithApp>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
