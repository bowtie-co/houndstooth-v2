import React, { Fragment } from 'react';

export const AppNotFound = (props) => {
  const { translate } = props;

  return (
    <Fragment>
      <h1>{translate('general.not_found')}</h1>
      <p>{translate('general.oops')} ...</p>
    </Fragment>
  );
};
