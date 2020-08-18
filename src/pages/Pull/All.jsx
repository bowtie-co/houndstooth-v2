import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithLanguage
} from '../../ecosystems';
import { PullList } from '../../organisms';

export const PullAllPage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithJekyll>
            <WithApp>
              <PullList />
            </WithApp>
          </WithJekyll>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
