import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithLanguage
} from '../../ecosystems';
import { RepoSingle } from '../../organisms';

export const RepoOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithJekyll>
            <WithApp>
              <RepoSingle />
            </WithApp>
          </WithJekyll>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
