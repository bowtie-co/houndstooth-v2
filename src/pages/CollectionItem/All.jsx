import React from 'react';
import { WithGithubAuth, WithGithubRepo, WithJekyll, WithApp } from '../../ecosystems';
import { CollectionList } from '../../organisms';

export const CollectionItemAllPage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithJekyll>
          <WithApp>
            <CollectionList />
          </WithApp>
        </WithJekyll>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
