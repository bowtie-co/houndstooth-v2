import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithLanguage
} from '../../ecosystems';
import { CollectionList } from '../../organisms';

export const CollectionAllPage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithJekyll>
            <WithApp>
              <CollectionList />
            </WithApp>
          </WithJekyll>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
