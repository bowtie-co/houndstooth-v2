import React, { useState, useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  // WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  console.debug('WithGithubRepos', { children, props });

  const [ repos, setRepos ] = useState(storage.get('all_repos') || []);
  const [ reposLoading, setReposLoading ] = useState(true);
  const [ repoPage, setRepoPage ] = useState([]);
  const [ repoPageLoading, setRepoPageLoading ] = useState(true);
  const { github } = props;

  // TODO: @Brennan - further flatten 'all_repos' to just id & full_name (for repo selector)
  const flattenRepos = (repos, flatter = false) => {
    const flattenedRepos = [];
    repos.forEach(repo => {
      const { id, default_branch, description, full_name, name, owner, updated_at } = repo;
      const flattenedRepo = flatter ?
        {id, full_name} : {id, default_branch, description, full_name, name, owner, updated_at};
      flattenedRepos.push(Object.assign({}, flattenedRepo));
    });
    return flattenedRepos;
  };

  const loadRepos = useCallback((force = false) => {
    console.log('loadRepos()', repos);

    if (!repos.length || force) {
      setReposLoading(true);
      setRepoPageLoading(true);

      let pageNumber = 1;

      github.iterateRepos((reposPage) => {
        // Handle each page of repos
        const repos = flattenRepos(reposPage);

        const storedRepos = storage.get('repos') || {};
        const newRepos = Object.assign(storedRepos, { [pageNumber]: repos });

        storage.set('repos', newRepos);

        if (pageNumber === 1) {
          setRepoPage(repos);
          setRepoPageLoading(false);
        }

        pageNumber += 1;
      }, { sort: 'updated', per_page: 24 }).then((allRepos) => {
        const flattenedRepos = flattenRepos(allRepos, true);
        storage.set('all_repos', flattenedRepos);
        setRepos(flattenedRepos);
        setReposLoading(false);
      }).catch(err => {
        console.warn(err);
      });
    } else {
      setReposLoading(false);
    }
  }, [ github, repos ]);

  const reloadRepos = useCallback(() => {
    storage.remove('repos');
    storage.remove('all_repos');
    setRepos([]);
  }, [ setRepos ])

  useEffect(() => {
    loadRepos();
  }, [ loadRepos ]);

  return (
    // <WithLoader isLoading={loading} defer>
      <WithChildren children={children} {...props} {...{ repos, reposLoading, repoPage, repoPageLoading, reloadRepos }} />
    // </WithLoader>
  );
};
