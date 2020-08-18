import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithGithubRepoUsers,
  WithJekyll,
  WithLanguage
} from '../../ecosystems';
import { UserList } from '../../organisms';

export const UserAllPage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithJekyll>
            <WithGithubRepoUsers>
              <WithApp>
                <UserList />
              </WithApp>
            </WithGithubRepoUsers>
          </WithJekyll>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
