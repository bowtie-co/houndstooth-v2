import React from 'react';
import { WithApp, WithGithubAuth, WithGithubRepo, WithLanguage } from '../../ecosystems';
import { UserSingle } from '../../organisms';

export const UserOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithApp>
            <UserSingle />
          </WithApp>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
