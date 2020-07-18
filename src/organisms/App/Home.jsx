import React, { Fragment } from 'react';

export const AppHome = (props) => {
  const { translate } = props;

  return (
    <Fragment>
      <h1>{translate('general.home')}</h1>
      <p>{translate('general.welcome')}</p>
    </Fragment>
  );
};
