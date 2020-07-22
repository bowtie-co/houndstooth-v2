import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo, WithJekyll } from '../../ecosystems';
import { PullList } from '../../organisms';

export const PullAllPage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithJekyll>
          <WithApp>
            <PullList />
          </WithApp>
        </WithJekyll>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
