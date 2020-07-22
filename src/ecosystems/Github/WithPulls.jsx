import React, { useState, useEffect, useCallback } from 'react';
import { WithLoader, WithChildren } from '../';
import { notifier } from '../../lib';

export const WithGithubPulls = ({ children, ...props }) => {
  const [ pulls, setPulls ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const { github, pageProps, translate } = props;

  const approveChanges = useCallback((pull_number) => {
    console.log('WithGithubRepoControls.approveChanges()', pull_number);

    // TODO: Check / enforce admin repo access here? Permissions should ultimately rely on remote repository

    const mergePull = async (pull_number) => {
      setLoading(true);

      try {
        // TODO: Utilize PR merge response
        // const { data } = result;
        // const { sha, merged, message } = data;
        const result = await github.octokit.pulls.merge(Object.assign({}, pageProps, { pull_number }));

        setPulls(pulls.filter(pr => pr.number !== pull_number));

        console.log('WithGithubRepoControls.mergePull()', { result });
      } catch (err) {
        console.warn('WithGithubRepoControls.mergePull(): Caught', err.message || err);
        notifier.bad(err);
      }

      setLoading(false);
    };

    if (window.confirm(translate('notify.confirm'))) {
      mergePull(pull_number);
    }
  }, [ pulls, github, pageProps, translate ]);

  useEffect(() => {
    setLoading(true);

    github.pulls(pageProps).then(data => {
      setPulls(data);
      setLoading(false);
    }).catch(err => {
      console.warn(err);
      setLoading(false);
    });
  }, [ github, pageProps ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ pulls, approveChanges }} />
    </WithLoader>
  );
};
