import React, { useState, useEffect } from 'react';
import {
  WithLoader,
  WithChildren,
} from '../';

export const WithGithubBranches = ({ children, ...props }) => {
  // console.debug('WithGithubBranches', { children, props });

  const [ branches, setBranches ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { github, pageProps } = props;

  useEffect(() => {
    setLoading(true);

    github.branches(pageProps).then(data => {
      setBranches(data);
      setLoading(false);
    }).catch(err => {
      console.warn(err);
      setLoading(false);
    });
  }, [ github, pageProps ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ branches }} />
    </WithLoader>
  );
};
