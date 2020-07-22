import React, { useState, useEffect, useCallback } from 'react';
import async from 'async';
import { WithLoader, WithChildren } from '../';

export const WithGithubRepoUsers = ({ children, ...props }) => {
  const [ teams, setTeams ] = useState([]);
  const [ contributors, setContributors ] = useState([]);
  const [ collaborators, setCollaborators ] = useState([]);
  const [ otherMembers, setOtherMembers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const { github, repo, pageProps, translate } = props;

  useEffect(() => {
    const { owner, repo } = pageProps;

    setLoading(false);

    github.octokit.repos.listTeams({ owner, repo }).then(({ data }) => {
      setTeams(data);
    }).catch(err => {
      console.warn('WithGithubRepoUsers: Caught Error', err);
    });
  }, [ github, pageProps ]);

  useEffect(() => {
    github.contributors(pageProps).then(data => {
      setContributors(data);
    }).catch(err => {
      console.warn('WithGithubRepoUsers: Caught Error', err);
    });
  }, [ github, pageProps ]);

  useEffect(() => {
    const { owner } = pageProps;

    github.collaborators(pageProps).then(data => {
      setCollaborators(data);

      const headers = {
        'If-None-Match': ''
      };

      return github.octokit.orgs.listMembers({
        org: owner,
        headers
      }).then((members) => {
        const collabUserIds = data.map(u => u.id);
        const filteredMembers = members.data.filter(m => !collabUserIds.includes(m.id));

        console.log('GH ORG Members', members, collabUserIds, filteredMembers);

        setOtherMembers(filteredMembers);
      });
    }).catch(err => {
      console.warn('WithGithubRepoUsers: Caught Error', err);
    });
  }, [ github, pageProps ]);

  const revokeUserAccess = useCallback((username, refresh = true) => {
    const { owner } = pageProps;
    const { full_name } = repo;

    if (window.confirm(translate('notify.confirm'))) {
      async.each(teams, (team, next) => {
        github.octokit.teams.removeMembershipInOrg({
          org: owner,
          team_slug: team.slug,
          username,
        }).then(resp => {
          console.log('remove user from team resp', resp);
          next();
        }).catch(err => {
          console.warn('remove user from team error', err);
          next();
        });
      }, err => {
        if (err) {
          console.warn('Failed revoking user team access', err);
        } else {
          console.log('User team access revoked.', username, teams);
        }

        if (refresh) {
          window.location.href = `/${full_name}/users`;
        }
      });
    }
  }, [ github, repo, teams, pageProps, translate ]);

  return (
    <WithLoader isLoading={loading}>
      <WithChildren children={children} {...props} {...{ teams, contributors, collaborators, otherMembers, revokeUserAccess }} />
    </WithLoader>
  );
};
