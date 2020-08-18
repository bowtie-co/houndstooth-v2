import React from 'react';
import {
  WithApp,
  WithCollection,
  WithCollectionItem,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithLanguage
} from '../../ecosystems';
import {
  CollectionItemSingle
} from '../../organisms';

export const CollectionItemOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
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
      </WithLanguage>
    </WithGithubAuth>
  );
};
