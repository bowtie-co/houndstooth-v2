import React, { useState, useEffect } from 'react';
import {
  WithLoader,
  WithChildren,
} from '../';

export const WithGithubRepos = ({ children, ...props }) => {
  console.debug('WithGithubRepos', { children, props });

  const [ repos, setRepos ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { github } = props;

  useEffect(() => {
    setLoading(true);

    github.repos().then(data => {
      setRepos(data);
      setLoading(false);
    }).catch(err => {
      console.warn(err);
      setLoading(false);
    });
  }, [ github ]);

  return (
    <WithLoader isLoading={loading} defer>
      <WithChildren children={children} {...props} {...{ repos }} />
    </WithLoader>
  );
};
