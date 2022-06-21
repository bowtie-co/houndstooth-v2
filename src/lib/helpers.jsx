import React from 'react';
import moment from 'moment';
// import {
//   WithApp
// } from '../ecosystems';

export const safeFilename = (filename) => {
  if (!filename) return '';

  return filename.trim().replace(/[^a-z0-9_\-.]/ig, '_');
};

export const injectPageProps = (routes, buildProps) => {
  const safeBuild = buildProps ? buildProps : () => ({});
  const pageProps = {};
  const injectedRoutes = {};

  Object.keys(routes).forEach(path => {
    const Page = routes[path];

    injectedRoutes[path] = (props) => {
      if (props) Object.assign(pageProps, props, safeBuild(props));
      // console.debug('RouteProps:', { path, props });

      return (args) => {
        if (args) Object.assign(pageProps, args);
        // console.debug('RouteArgs:', { path, props, args, pageProps });
        return <Page {...pageProps}/>;
        // return (
        //   <WithApp {...pageProps}>
        //     <Page />
        //   </WithApp>
        // );
      };
    };
  });

  return injectedRoutes;
};

export const calcDuration = (obj) => {
  const start = moment(obj.createdAt);
  const end = moment(obj.updatedAt);
  const duration = moment.duration(end.diff(start));

  Object.assign(obj, { start, end, duration });

  return obj;
};

export const getStatusIcon = (status) => {
  switch(status.toUpperCase()) {
    case 'SUCCEEDED':
      return 'check';
    case 'FAILED':
      return 'exclamation-circle';
    case 'IN_PROGRESS':
    default:
      return 'clock';
  }
};

export const getStatusColor = (status) => {
  switch(status.toUpperCase()) {
    case 'SUCCEEDED':
      return 'success';
    case 'FAILED':
      return 'danger';
    case 'IN_PROGRESS':
    default:
      return 'warning';
  }
};

export const createOrUpdate = (existing, subject) => {
  const updated = Object.assign([], existing);
  const index = existing.findIndex(item => item.id === subject.id);
  const item = calcDuration(subject);

  if (index > -1) {
    // console.debug('Updating item:', item);
    Object.assign(updated[index], item);
  } else {
    // console.debug('Creating item:', item);
    updated.unshift(item);
  }

  return updated;
};
