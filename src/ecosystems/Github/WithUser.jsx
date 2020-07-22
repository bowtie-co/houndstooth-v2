import React, { useState, useEffect } from 'react';
import {
  WithLoader,
  WithChildren,
} from '../';

export const WithGithubUser = ({ children, ...props }) => {
  // console.debug('WithGithubUser', { children, props });

  const [ user, setUser ] = useState();
  const [ loading, setLoading ] = useState(true);
  const { github } = props;

  useEffect(() => {
    setLoading(true);

    github.user().then(data => {
      setUser(data);
      setLoading(false);
    }).catch(err => {
      console.warn('WithGithubUser: Caught Error', err);
      setLoading(false);
    });
  }, [ github ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ user }} />
    </WithLoader>
  );
};
