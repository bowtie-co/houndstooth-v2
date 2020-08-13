import React, { useState, useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  // WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  const { github, location } = props;

  const [ repos, setRepos ] = useState(storage.get('all_repos') || []);
  const [ reposLoading, setReposLoading ] = useState(false);
  const [ repoPages, setRepoPages ] = useState({});
  const [ repoPage, setRepoPage ] = useState([]);
  const [ repoPageLoading, setRepoPageLoading ] = useState(false);

  // console.debug('WithGithubRepos', { children, props });

  // TODO: @Brennan - further flatten 'all_repos' to just id & full_name (for repo selector)
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

  const loadRepos = useCallback((force = false, first = false) => {
    if (!repos.length || force || first) {
      setRepoPageLoading(true);
      (!repos.length || force) && setReposLoading(true);

      let pageNumber = 1;

      github.iterateRepos((reposPage) => {
        // Handle each page of repos
        const page = flattenRepos(reposPage);

        const storedRepos = storage.get('repos') || {};
        const newRepos = Object.assign(storedRepos, { [pageNumber]: page });

        storage.set('repos', newRepos);
        setRepoPages(newRepos);

        if (pageNumber === 1) {
          setRepoPage(page);
          setRepoPageLoading(false);
        }

        pageNumber += 1;
      }, { sort: 'updated', per_page: 24 }).then((allRepos) => {
        if (!repos.length) {
          const flattenedRepos = flattenRepos(allRepos);
          storage.set('all_repos', flattenedRepos);
          setRepos(flattenedRepos);
          setReposLoading(false);
        }
      }).catch(err => {
        console.warn(err);
      });
    }
  }, [ github, repos ]);

  const reloadRepos = useCallback(() => {
    storage.remove('repos');
    storage.remove('all_repos');
    setRepos([]);
  }, [ setRepos ])

  useEffect(() => {
    location.pathname === '/' && loadRepos(false, true);
  }, [ loadRepos, location ]);

  return (
      <WithChildren children={children} {...props} {...{ repos, repoPages, repoPage, setRepoPage, reposLoading, repoPageLoading, reloadRepos }} />
  );
};
