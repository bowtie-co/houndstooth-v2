import React from 'react';
// import { Container } from 'reactstrap';
import { CollectionList } from '../../organisms';

export const RepoSingle = ({ children, ...props }) => {
  // console.debug('RepoSingle', { props });

  return (
    <CollectionList {...props} />
  );
};
