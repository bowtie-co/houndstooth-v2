import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo } from '../../ecosystems';
import { UserSingle } from '../../organisms';

export const UserOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithApp>
          <UserSingle />
        </WithApp>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
