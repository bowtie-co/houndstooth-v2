import React, { Fragment } from 'react';
import qs from 'qs';
import uuid from 'uuid/v1';
import EventEmitter from 'eventemitter2';
import { navigate } from 'hookrouter';
import { storage } from '.';

export class Auth extends EventEmitter {
  get token() {
    return storage.get('access_token');
  }

  get routes() {
    return {
      '/login': () => () => this.login() && <Fragment />,
      '/redirect': () => () => this.handleRedirect() && <Fragment />,
      '/callback': () => () => this.handleCallback() && <Fragment />,
    };
  }

  login () {
    const authState = uuid();
    storage.set('authState', authState);

    // console.debug('redirecting for login with state', authState);
    window.location = process.env.REACT_APP_AUTHORIZE_URL + '?' + qs.stringify({
      state: authState,
      scope: 'user:email,read:user,repo'
    });

    return true;
  }

  handleRedirect () {
    const authState = storage.get('authState');
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    // console.debug('handling auth redirect!', authState, window.location, params);

    if (params.state !== authState) {
      throw new Error('BAD AUTH STATE');
    }

    window.location = process.env.REACT_APP_CALLBACK_URL + '?' + qs.stringify({
      state: authState,
      code: params.code
    });

    return true;
  }

  handleCallback () {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    // console.debug('handling auth callback!', window.location, params);

    if (params.access_token) {
      this.setSession(params);
      this.resume();
    } else {
      throw new Error('MISSING AUTH TOKEN');
    }

    return true;
  }

  setSession (authResult) {
    storage.set('access_token', authResult.access_token);
    this.emit('authorized', authResult);
  }

  resume () {
    // console.debug('Resume nav after auth');

    if (storage.get('resumeRoute')) {
      navigate(storage.get('resumeRoute'));
      storage.remove('resumeRoute');
    } else {
      navigate('/');
    }
  }

  logout () {
    storage.clear();
    navigate('/');
  }

  isAuthenticated () {
    return !!this.token;
  }
}

export const auth = new Auth();
