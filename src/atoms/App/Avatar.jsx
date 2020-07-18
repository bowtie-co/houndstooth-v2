import React from 'react';
import PropTypes from 'prop-types';

export const AppAvatar = ({ owner, ...props }) => {
  // console.debug('AppAvatar', { props });

  return (
    <img className='avatar' src={owner.avatar_url} alt={owner.login || owner.name || 'Unknown'} />
  );
};

AppAvatar.propTypes = {
  owner: PropTypes.object.isRequired
};
