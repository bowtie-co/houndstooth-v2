import async from 'async';
import React, { useState, useEffect, useCallback } from 'react';
import { WithLoader, WithChildren } from '../';
import { notifier, airbrake } from '../../lib';
import { RepoModalResolve } from '../../organisms';

export const WithGithubRepoControls = ({ children, ...props }) => {
  const [ branchConflicts, setBranchConflicts ] = useState();
  const [ branchStatus, setBranchStatus ] = useState();
  const [ deployedUrl, setDeployedUrl ] = useState();
  const [ refStatus, setRefStatus ] = useState();
  const [ pulls, setPulls ] = useState();
  const [ openPull, setOpenPull ] = useState();
  const [ loading, setLoading ] = useState(false);
  const { github, repo, branch, branchRef, repoProps, translate } = props;

  useEffect(() => {
    if (branch) {
      github.sumStatuses(Object.assign({}, repoProps, { ref: branch })).then(statusSummary => {
        setBranchStatus(statusSummary);
        console.log('set statusSummary', statusSummary);

        if (statusSummary && statusSummary.deploy && statusSummary.deploy.target_url) {
          setDeployedUrl(statusSummary.deploy.target_url);
        }
      });
    }
  }, [ github, branch, repoProps ]);

  useEffect(() => {
    if (branchRef) {
      github.sumStatuses(Object.assign({}, repoProps, { ref: branchRef })).then(statusSummary => {
        setRefStatus(statusSummary);
      });
    }
  }, [ github, branchRef, repoProps ]);

  const isPullPending = (pull) => {
    // const reg = new RegExp(translate('changes.pr_pending_title'));

    // TODO: Additional check(s) for pending? Labels, keywords, etc?

    // return reg.test(pull.title) || true;

    return !/(ready|listo)/ig.test(pull.title);
  };

  const submitChanges = useCallback((pull) => {
    const updatePull = async () => {
      if (!pull) {
        console.warn('Cannot update pull (no pull)', { pull });
        return;
      }

      setLoading(true);

      try {
        // TODO: Utilize PR merge response
        // const { data } = result;
        // const { sha, merged, message } = data;
        const result = await github.octokit.pulls.update(Object.assign({}, repoProps, {
          pull_number: pull.number,
          title: `${translate('changes.pr_ready_title')} ${branch}`,
        }));

        console.log('WithGithubRepoControls.updatePull()', { result });

        setOpenPull(result.data);

        notifier.success(translate('notify.changes_submitted'));
      } catch (err) {
        console.warn('WithGithubRepoControls.updatePull(): Caught', err.message || err);
        notifier.bad(err);
      }

      setLoading(false);
    };

    if (window.confirm(translate('notify.confirm'))) {
      updatePull();
    }
  }, [ github, branch, repoProps, translate ]);

  const makePullPending = useCallback((pull, cb) => {
    const updatePull = async (cb) => {
      if (branch === repo.default_branch) {
        return cb && cb(null, pull);
      }

      setLoading(true);

      try {
        // TODO: Utilize PR merge response
        // const { data } = result;
        // const { sha, merged, message } = data;

        let currentPull = pull;

        if (!currentPull) {
          currentPull = await github.octokit.pulls.create(Object.assign({}, repoProps, {
            title: `${translate('changes.pr_pending_title')} ${branch}`,
            base: repo.default_branch,
            head: branch,
            body: `${translate('changes.pr_pending_body')} ${branch}`
          }));
        } else {
          const result = await github.octokit.pulls.update(Object.assign({}, repoProps, {
            pull_number: pull.number,
            title: `${translate('changes.pr_pending_title')} ${branch}`,
          }));

          currentPull = result.data;
        }

        console.log('WithGithubRepoControls.updatePull()', { currentPull });

        setOpenPull(currentPull);

        notifier.success(translate('notify.changes_submitted'));

        cb && cb(null, currentPull);
      } catch (err) {
        console.warn('WithGithubRepoControls.updatePull(): Caught', err.message || err);
        notifier.bad(err);
        cb && cb(err);
      }

      setLoading(false);
    };

    updatePull(cb);
  }, [ github, repo, branch, repoProps, translate ]);

  const approveChanges = useCallback((pull_number) => {
    console.log('WithGithubRepoControls.approveChanges()', pull_number);

    // TODO: Check / enforce admin repo access here? Permissions should ultimately rely on remote repository

    const mergePull = async (pull_number) => {
      setLoading(true);

      try {
        // TODO: Utilize PR merge response
        // const { data } = result;
        // const { sha, merged, message } = data;
        const result = await github.octokit.pulls.merge(Object.assign({}, repoProps, { pull_number }));

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
  }, [ pulls, github, repoProps, translate ]);

  const resolveConflicts = useCallback((reload = false) => {
    const resolveBranchConflicts = () => {
      if (!branchConflicts || branchConflicts.length === 0) {
        return;
      }

      const resolveConflict = ({ sha, path, content }) => {
        const message = `[HT] Reverted from base file: ${path}`;
        const params = Object.assign({}, repoProps, {
          sha,
          path,
          branch,
          content,
          message
        });

        return github.createOrUpdateFile(params);
      };

      async.each(branchConflicts, (fileConflict, next) => {
        const baseParams = Object.assign({}, repoProps, { path: fileConflict.filename, ref: repo.default_branch });

        github.getContents(baseParams).then(baseContent => {
          const { sha, filename } = fileConflict;
          const { content } = baseContent;

          resolveConflict({ path: filename, sha, content }).then(resp => {
            if (resp && resp.commit) {
              notifier.warning(`${translate('general.file')}: ${filename} ${translate('notify.merge_conflict_resolve')}`);
            }

            next();
          }).catch(next);
        }).catch(err => {
          console.warn(err);
          console.warn('Skipping force resolve overwrite (unable to compare/resolve conflict)', fileConflict);
          next();
        });
      }, err => {
        if (err) {
          console.error(err);

          // Send error to Airbrake
          airbrake.notify({
            error: err,
            params: {
              repoProps
            }
          });
        }

        if (reload) {
          window.location.reload(true);
        }
      });
    };

    resolveBranchConflicts();
  }, [ github, repo, branch, repoProps, branchConflicts, translate ]);

  useEffect(() => {
    setLoading(true);

    github.pulls(repoProps).then(data => {
      setPulls(data);

      console.log('Loaded pulls', { data });

      // TODO: Find or create PR (based on current user/branch)
      // const open = data.find(pr => pr.)

      setLoading(false);
    }).catch(err => {
      console.warn(err);
      setLoading(false);
    });
  }, [ github, repoProps ]);

  useEffect(() => {
    if (!pulls) {
      console.log('Skip pull find (missing/invalid pulls)');
      return;
    }

    const findPull = pulls.find(pull => pull.head && pull.head.ref === branch);

    console.log('findPull', { findPull });

    setOpenPull(findPull);
  }, [ branch, pulls ]);

  useEffect(() => {
    const compareCommits = async () => {
      let compareResponse;

      try {
        if (!repo || !branch || !openPull || branch === repo.default_branch) {
          console.debug('WithRepoControls.compareCommits(): Skipping', { repo, branch, openPull });
          return;
        }

        const headers = {
          'If-None-Match': ''
        };

        compareResponse = await github.octokit.repos.compareCommits(Object.assign({ headers }, repoProps, {
          base: repo.default_branch,
          head: branch
        }));

        const { data } = compareResponse;

        if (openPull && data.behind_by && data.behind_by > 0) {
          await github.octokit.pulls.updateBranch(Object.assign({}, repoProps, {
            pull_number: openPull.number,
            // expected_head_sha: data.commits[0].sha
          }));
        }
      } catch (err) {
        const { data } = compareResponse;

        if (data && data.files && data.files.length > 0) {
          const conflicts = [];

          async.each(data.files, (file, next) => {
            const baseParams = Object.assign({}, repoProps, { path: file.filename, ref: repo.default_branch });

            github.getContents(baseParams).then(data => {
              conflicts.push(file);
              next();
            }).catch(err => {
              console.warn(err);
              next();
            });
          }, (err) => {
            if (err) {
              console.error(err);
            }

            setBranchConflicts(conflicts);
          });
        }
      }
    };

    compareCommits();
  }, [ github, repo, branch, openPull, repoProps ]);

  const repoControlProps = {
    pulls,
    openPull,
    branchConflicts,
    branchStatus,
    deployedUrl,
    refStatus,
    resolveConflicts,
    submitChanges,
    isPullPending,
    makePullPending,
    approveChanges,
  };

  return (
    <WithLoader isLoading={loading}>
      <RepoModalResolve {...props} {...repoControlProps} />
      <WithChildren children={children} {...props} {...repoControlProps} />
    </WithLoader>
  );
};
