import React, { useState, useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  // WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  const { github } = props;

  const [ repos, setRepos ] = useState(storage.get('all_repos') || []);
  const [ reposLoading, setReposLoading ] = useState(false);
  const [ repoPages, setRepoPages ] = useState(storage.get('repos') || {});
  const [ repoPage, setRepoPage ] = useState([]);
  const [ repoPageLoading, setRepoPageLoading ] = useState(false);

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
    storage.remove('all_repos');
    setRepos([]);
  }, [ setRepos ]);

  useEffect(() => {
    if (repoPages && repoPages[1] && repoPages[1].length && (!repoPage || repoPage.length === 0)) {
      setRepoPage(repoPages[1]);
    }
  }, [ repoPage, repoPages ]);

  useEffect(() => {
    const loadRepos = async () => {
      if (storage.get('all_repos') && storage.get('all_repos').length > 0) {
        return;
      }

      setReposLoading(true);
      setRepoPageLoading(true);

      let pageNumber = 1;

      github.iterateRepos((reposPage) => {
        // Handle each page of repos
        const page = flattenRepos(reposPage);

        const storedRepos = storage.get('repos') || {};
        const newRepos = Object.assign(storedRepos, { [pageNumber]: page });

        storage.set('repos', newRepos);
        setRepoPages(newRepos);

        if (pageNumber === 1) {
          // setRepoPage(page);
          setRepoPageLoading(false);
        }

        pageNumber += 1;
      }, { sort: 'updated', per_page: 24 }).then((allRepos) => {
        const flattenedRepos = flattenRepos(allRepos);
        storage.set('all_repos', flattenedRepos);
        setRepos(flattenedRepos);
        setReposLoading(false);
      }).catch(err => {
        console.warn(err);
      });
    };

    loadRepos();
  }, [ github ]);

  const passReposProps = { repos, repoPages, repoPage, setRepoPage, reposLoading, repoPageLoading, reloadRepos };

  return (
      <WithChildren children={children} {...props} {...passReposProps} />
  );
};
