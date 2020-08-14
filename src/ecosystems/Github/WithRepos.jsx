import React, { useState, useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  const { github } = props;

  const [ repos, setRepos ] = useState(storage.get('repos') || []);
  const [ reposLoading, setReposLoading ] = useState(false);

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
    storage.remove('repos');
    setRepos([]);
  }, [ setRepos ]);

  useEffect(() => {
    const loadRepos = async () => {
      if (storage.get('repos') && storage.get('repos').length > 0) {
        return;
      }

      setReposLoading(true);

      github.iterateRepos((reposPage) => {
        const storedRepos = storage.get('repos') || [];
        const newRepos = storedRepos.concat(flattenRepos(reposPage));

        storage.set('repos', newRepos);
        setRepos(newRepos);
      }, { sort: 'updated', per_page: 24 }).then(() => {
        setReposLoading(false);
      }).catch(err => {
        setReposLoading(false);
        console.warn(err);
      });
    };

    loadRepos();
  }, [ github, repos ]);

  const passReposProps = { repos, reposLoading, reloadRepos };

  return (
      <WithChildren children={children} {...props} {...passReposProps} />
  );
};
