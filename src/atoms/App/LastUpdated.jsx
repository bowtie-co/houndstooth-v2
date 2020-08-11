import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// Add supported language locales here
import 'moment/locale/es';

export const AppLastUpdated = ({ time, ...props }) => {
  const { lang, translate } = props;
  const [ fromNow, setFromNow ] = useState();

  useEffect(() => {
    moment.locale(lang);
    setFromNow(moment(time, 'YYYYMMDD').fromNow());
  }, [ lang, time ]);

  return (
    <p class="AppLastUpdated small">{translate('general.last_updated')}: {fromNow}</p>
  );
};

AppLastUpdated.propTypes = {
  time: PropTypes.string,
  translate: PropTypes.func
};