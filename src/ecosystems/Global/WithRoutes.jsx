import React from 'react';
import { useRoutes } from 'hookrouter';
import { AppNotFoundPage } from '../../pages';
import { WithQueryParams } from './WithQueryParams';

export const WithRoutes = ({ children, ...props }) => {
  const { auth, routes } = props;

  const authRouteAction = useRoutes(auth.routes);
  const appRouteAction = useRoutes(routes);

  if (authRouteAction && typeof authRouteAction === 'function') {
    return authRouteAction(props);
  }

  return (
    <WithQueryParams>
      {
        (typeof appRouteAction === 'function')
          ? appRouteAction(props)
          : <AppNotFoundPage {...props} />
      }
    </WithQueryParams>
  );
};
