import React from 'react';
import { Nav } from 'reactstrap';
import { CollectionNavLink } from '../';

export const CollectionNav = ({ ...props }) => {
  // console.debug('CollectionNav', { props });

  const { jekyll } = props;
  const { collections } = jekyll;

  return (
    <Nav vertical className='CollectionNav'>
      {Object.keys(collections).map((name, index) => (
        <CollectionNavLink key={index} {...props} name={name} config={collections[name]} />
      ))}
    </Nav>
  );
};
