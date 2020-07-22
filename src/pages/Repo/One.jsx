import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo, WithJekyll } from '../../ecosystems';
import { RepoSingle } from '../../organisms';

export const RepoOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithJekyll>
          <WithApp>
            <RepoSingle />
          </WithApp>
        </WithJekyll>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
