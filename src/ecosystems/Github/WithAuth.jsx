import React, { useState, useEffect } from 'react';
import { auth, storage } from '../../lib';
import { WithGithub, WithGithubUser, WithChildren } from '../';
import { LoginGithub } from '../../organisms';

export const WithGithubAuth = ({ children, ...props }) => {
  const [ token, setToken ] = useState(auth.token);
  const [ isAuthorized, setIsAuthorized ] = useState(auth.isAuthenticated());
  const location = window.location;

  useEffect(() => {
    auth.on('authorized', (authResult) => {
      console.error('AUTHORIZED!', authResult);
      setToken(authResult.access_token);
      setIsAuthorized(true);
    });
  }, [ setIsAuthorized ]);

  useEffect(() => {
    !isAuthorized && storage.set('resumeRoute', location.pathname);
  }, [ location, isAuthorized ]);

  return (
    !isAuthorized ? (
      <LoginGithub {...props} />
    ) : (
      <WithGithub {...props} {...{ token, isAuthorized, location }}>
        <WithGithubUser>
          <WithChildren children={children} />
        </WithGithubUser>
      </WithGithub>
    )
  );
};
