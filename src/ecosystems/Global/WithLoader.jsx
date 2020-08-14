import React, { Fragment } from 'react';
import { css } from "@emotion/core";

import { Loader, DefaultLoader } from '../../molecules';
import { WithChildren } from '.';

const override = css`
  display: block;
  margin: 15% auto;
`;

export const WithLoader = ({ children, loader, isLoading, nonBlocking, ...props }) => {
  const { defer = false } = props;
  const loaderName = loader ? (/Loader$/.test(loader) ? loader : `${loader}Loader`) : 'DefaultLoader';
  const LoaderComponent = Loader[loaderName] || DefaultLoader;

  // console.debug('WithLoader', { props, loaderName, LoaderComponent });

  if (isLoading && !defer) {
    return <LoaderComponent css={override} size={100} nonBlocking={nonBlocking} {...props} />;
  } else if (children) {
    return <WithChildren {...props} children={children} />;
  } else {
    return <Fragment />;
  }
};
