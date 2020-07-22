import React, { Fragment, useCallback } from 'react';
import {
  SelectButton
} from '../../molecules';

export const RepoSelector = ({ repos = [], repo, ...props }) => {
  // console.debug('RepoSelector', { repos, repo, props });

  const repoSelectOptions = useCallback(() => {
    return repos.map(r => ({
      text: r.full_name,
      href: `/${r.full_name}`
    }));
  }, [ repos ]);

  return repos.length > 0 ? (
    <SelectButton title={repo || 'Select Repo'} options={repoSelectOptions()} />
  ) : (
    <Fragment />
  );
};
