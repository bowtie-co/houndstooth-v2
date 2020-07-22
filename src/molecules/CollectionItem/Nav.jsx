import React from 'react';
import { Nav } from 'reactstrap';
import { CollectionItemNavLink } from '../';

export const CollectionItemNav = ({ ...props }) => {
  // console.debug('CollectionItemNav', { props });

  const { entries, filterEntries } = props;

  return (
    <Nav vertical className='CollectionItemNav'>
      {entries.filter(filterEntries).map((item, index) => (
        <CollectionItemNavLink key={index} {...props} {...{ item }} />
      ))}
    </Nav>
  );
};
