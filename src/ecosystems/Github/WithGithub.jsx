import React, { useEffect } from 'react';
import { GithubClient } from '@bowtie/ts-github';
import { WithChildren } from '../';

export const WithGithub = ({ children, token, ...props }) => {
  const github = new GithubClient({ token });

  useEffect(() => {
    github.auth(token);
  }, [ token, github ]);

  return (
    <WithChildren children={children} {...props} {...{ github }} />
  );
};
