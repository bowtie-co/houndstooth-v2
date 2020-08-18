import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo, WithLanguage } from '../../ecosystems';
import { PullSingle } from '../../organisms';

export const PullOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithApp>
            <PullSingle />
          </WithApp>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
