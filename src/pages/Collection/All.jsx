import React from 'react';
import { WithGithubAuth, WithGithubRepo, WithJekyll, WithApp } from '../../ecosystems';
import { CollectionList } from '../../organisms';

export const CollectionAllPage = ({ children, ...props }) => {
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
