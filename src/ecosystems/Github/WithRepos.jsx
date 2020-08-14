import React, { useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  const { github } = props;

  const flattenRepos = (repos) => {
    const flattenedRepos = [];
    repos.forEach(repo => {
      const { id, default_branch, description, full_name, name, owner, updated_at } = repo;
      flattenedRepos.push(Object.assign({}, {
        id, default_branch, description, full_name, name, owner, updated_at
      }));
    });
    return flattenedRepos;
  };

  const reloadRepos = useCallback(() => {
    storage.remove('reposCached');
    storage.remove('repos');
  }, [ ]);

  useEffect(() => {
    const loadRepos = () => {
      if (storage.get('reposCached')) {
        return;
      }

      storage.set('repos', []);

      github.iterateRepos((reposPage) => {
        const storedRepos = storage.get('repos') || [];
        const newRepos = storedRepos.concat(flattenRepos(reposPage));

        storage.set('repos', newRepos);
      }, { sort: 'updated', per_page: 24 }).then(() => {
        storage.set('reposCached', true);
      }).catch(err => {
        console.warn(err);
      });
    };

    loadRepos();

    storage.on('repos_removed', loadRepos);

    return () => {
      storage.off('repos_removed', loadRepos);
    };
  }, [ github ]);

  const passReposProps = { reloadRepos };

  return (
      <WithChildren children={children} {...props} {...passReposProps} />
  );
};
