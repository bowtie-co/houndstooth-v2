import React, { useState, useEffect, useCallback } from 'react';
import { notifier, storage } from '../../lib';
import { WithLoader, WithChildren, WithServicePubnub, WithGithubRepoControls } from '../';

export const WithGithubRepo = ({ children, ...props }) => {
  console.debug('WithGithubRepo', { children, props });

  // const { user } = props;
  const [ repo, setRepo ] = useState();
  const [ branch, setBranch ] = useState();
  const [ branches, setBranches ] = useState([]);
  const [ branchRef, setBranchRef ] = useState();
  const [ loading, setLoading ] = useState(true);
  const { github, pageProps, queryParams } = props;
  const { num, entry, username, filepath, collection, docId, subId, ...repoProps } = pageProps;

  const loadRepoData = useCallback(() => {
    setLoading(true);

    // const { login } = user;

    github.repo(pageProps).then(repoData => {
      setRepo(repoData);

      github.branches(pageProps).then(branchesData => {
        const refBranch = queryParams.ref;
        // TODO: @Charlie - Do we want to re-implement the userBranch logic?
        // const userBranch = branchesData.find(b => b.name === login);
        const activeBranch = refBranch || (storage.get('activeBranch') || repoData.default_branch);

        setBranches(branchesData);

        const branchData = branchesData.find(b => b.name === activeBranch);

        if (branchData && branchData.commit && branchData.commit.sha) {
          setBranch(activeBranch);
          setBranchRef(branchData.commit.sha);
          storage.set('activeBranch', activeBranch);
        } else {
          setBranch(repoData.default_branch);
          storage.set('activeBranch', repoData.default_branch);
        }

        setLoading(false);
      }).catch(err => {
        console.warn(err);
        notifier.bad(err);
        setLoading(false);
      });
    }).catch(err => {
      console.warn(err);
      notifier.bad(err);
      setLoading(false);
    });
  }, [ github, pageProps, queryParams ]);

  useEffect(() => {
    loadRepoData();
  }, [ loadRepoData ]);

  return (
    <WithLoader isLoading={loading}>
      <WithGithubRepoControls {...props} {...{ repoProps, repo, branch, branches, branchRef, setBranchRef, loadRepoData }}>
        <WithServicePubnub>
          <WithChildren children={children} />
        </WithServicePubnub>
      </WithGithubRepoControls>
    </WithLoader>
  );
};
