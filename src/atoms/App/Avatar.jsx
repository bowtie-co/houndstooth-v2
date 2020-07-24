import React from 'react';
import PropTypes from 'prop-types';

export const AppAvatar = ({ owner, className = '' }) => {
  // console.debug('AppAvatar', { owner, className });

  return (
    <img className={`avatar ${className}`} src={owner.avatar_url} alt={owner.login || owner.name || 'Unknown'} />
  );
};

AppAvatar.propTypes = {
  owner: PropTypes.object.isRequired
};
