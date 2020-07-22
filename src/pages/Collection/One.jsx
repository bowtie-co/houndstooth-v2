import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithCollection
} from '../../ecosystems';
import {
  CollectionSingle
} from '../../organisms';

export const CollectionOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithJekyll>
          <WithCollection>
            <WithApp>
              <CollectionSingle />
            </WithApp>
          </WithCollection>
        </WithJekyll>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
