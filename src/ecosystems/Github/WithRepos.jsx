import React, { useState, useEffect } from 'react';
import { storage } from '../../lib';
import {
  WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  console.debug('WithGithubRepos', { children, props });

  const [ repos, setRepos ] = useState(storage.get('all_repos') || []);
  const [ loading, setLoading ] = useState(true);
  const { github } = props;

  useEffect(() => {
    if (!repos.length) {
      setLoading(true);

      // TODO: @Brennan - remove temporary arguments
      github.repos().then(results => {
        const flattenedRepos = [];
        results.forEach(result => {
          const { id, default_branch, description, full_name, name, owner, updated_at } = result;
          flattenedRepos.push(Object.assign({}, {
            id, default_branch, description, full_name, name, owner, updated_at
          }));
        });
        storage.set('all_repos', flattenedRepos);
        setRepos(flattenedRepos);
        debugger;
        setLoading(false);
      }).catch(err => {
        console.warn(err);
        setLoading(false);
      });
    }
  }, [ github, repos, loading ]);

  return (
    <WithLoader isLoading={loading} defer>
      <WithChildren children={children} {...props} {...{ repos }} />
    </WithLoader>
  );
};
