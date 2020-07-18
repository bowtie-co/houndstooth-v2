import React from 'react';
import { useRoutes } from 'hookrouter';
import { PageNotFound } from '../../pages';

export const WithRoutes = ({ children, ...props }) => {
  // console.debug('WithRoutes', { children, routes });
  const appRouteAction = useRoutes(props.routes);

  return (typeof appRouteAction === 'function') ? appRouteAction(props) : <PageNotFound {...props} />;
};
