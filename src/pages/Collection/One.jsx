import React from 'react';
import {
  WithApp,
  WithCollection,
  WithGithubAuth,
  WithGithubRepo,
  WithJekyll,
  WithLanguage,
} from '../../ecosystems';
import {
  CollectionSingle
} from '../../organisms';

export const CollectionOnePage = ({ children, ...props }) => {
  return (
    <WithGithubAuth {...props}>
      <WithLanguage>
        <WithGithubRepo>
          <WithJekyll>
            <WithCollection>
              <WithApp>
                <CollectionSingle />
              </WithApp>
            </WithCollection>
          </WithJekyll>
        </WithGithubRepo>
      </WithLanguage>
    </WithGithubAuth>
  );
};
