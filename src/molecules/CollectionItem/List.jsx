import React from 'react';
import {
  ListGroup
} from 'reactstrap';
import {
  CollectionItemListItem
} from '../';

export const CollectionItemList = ({ ...props }) => {
  // console.debug('CollectionItemList', { props });

  const { jekyll } = props;
  const { collections } = jekyll;

  return (
    <ListGroup className='CollectionItemList'>
      {Object.keys(collections).map((name, index) => (
        <CollectionItemListItem key={index} {...props} name={name} config={collections[name]} />
      ))}
    </ListGroup>
  );
};
