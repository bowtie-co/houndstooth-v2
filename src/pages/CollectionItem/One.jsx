import React from 'react';
import {
  WithApp,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithCollection,
  WithCollectionItem
} from '../../ecosystems';
import {
  CollectionItemSingle
} from '../../organisms';

export const CollectionItemOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithGithubRepo>
        <WithJekyll>
          <WithCollection>
            <WithCollectionItem>
              <WithApp>
                <CollectionItemSingle />
              </WithApp>
            </WithCollectionItem>
          </WithCollection>
        </WithJekyll>
      </WithGithubRepo>
    </WithGithubAuth>
  );
};
