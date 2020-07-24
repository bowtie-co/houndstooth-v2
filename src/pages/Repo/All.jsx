import React from 'react';
import { useTitle } from 'hookrouter';
import { WithApp, WithGithubAuth } from '../../ecosystems';
import { RepoCards } from '../../organisms';

export const RepoAllPage = ({ children, ...props }) => {
  useTitle(`Select a project (repository)`);

  return (
    <WithGithubAuth {...props}>
      <WithApp>
        <RepoCards />
      </WithApp>
    </WithGithubAuth>
  );
};
