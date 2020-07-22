import React from 'react';
import {
  ListGroup
} from 'reactstrap';
import {
  CollectionListItem
} from '../';

export const CollectionList = ({ ...props }) => {
  // console.debug('CollectionList', { props });

  const { jekyll } = props;
  const { collections } = jekyll;

  return (
    <ListGroup className='CollectionList'>
      {Object.keys(collections).map((name, index) => (
        <CollectionListItem key={index} {...props} name={name} config={collections[name]} />
      ))}
    </ListGroup>
  );
};
