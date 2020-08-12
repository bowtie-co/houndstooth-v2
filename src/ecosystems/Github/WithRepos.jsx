import React, { useState, useCallback, useEffect } from 'react';
import { storage } from '../../lib';
import {
  // WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  console.debug('WithGithubRepos', { children, props });

  const [ repos, setRepos ] = useState(storage.get('all_repos') || []);
  const [ loading, setLoading ] = useState(true);
  const { github } = props;

  const loadRepos = useCallback((force = false) => {
    console.log('loadRepos()', repos);

    github.iterateRepos((reposPage) => {
      // Handle each page of repos
      console.log('github.iterateRepos - reposPage', reposPage);
    }, { sort: 'updated' }).then((allRepos) => {
      // OPTIONAL - Do something after all? Could be unique resp/etc ...
      console.log('github.iterateRepos - allRepos', allRepos);
    }).catch(err => {
      console.warn(err);
    });

    if (!repos.length || force) {
      setLoading(true);

      github.repos({sort: 'updated'}).then(results => {
        const flattenedRepos = [];
        results.forEach(result => {
          const { id, default_branch, description, full_name, name, owner, updated_at } = result;
          flattenedRepos.push(Object.assign({}, {
            id, default_branch, description, full_name, name, owner, updated_at
          }));
        });
        storage.set('all_repos', flattenedRepos);
        setRepos(flattenedRepos);
        setLoading(false);
      }).catch(err => {
        console.warn(err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [ github, repos ]);

  const reloadRepos = useCallback(() => {
    storage.remove('all_repos');
    setRepos([]);
  }, [ setRepos ])

  useEffect(() => {
    loadRepos();
  }, [ loadRepos ]);

  return (
    // <WithLoader isLoading={loading} defer>
      <WithChildren children={children} {...props} {...{ repos, reloadRepos, reposLoading: loading }} />
    // </WithLoader>
  );
};
