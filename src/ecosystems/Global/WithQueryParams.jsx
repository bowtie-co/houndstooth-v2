import React, { useCallback } from 'react';
import qs from 'qs';
import { useQueryParams } from 'hookrouter';
import { WithChildren } from '..';

export const WithQueryParams = ({ children, ...props }) => {
  // console.debug('WithQueryParams', { children, props });

  const [ queryParams ] = useQueryParams();

  const linkWithQueryParams = useCallback((pathName, extraParams = {}) => {
    const newParams = Object.assign({}, queryParams, extraParams);
    return Object.keys(newParams).length ? `${pathName}?${qs.stringify(newParams)}` : pathName;
  }, [ queryParams ]);

  const withQueryProps = { queryParams, linkWithQueryParams };

  return (
    <WithChildren children={children} {...props} {...withQueryProps} />
  );
};
