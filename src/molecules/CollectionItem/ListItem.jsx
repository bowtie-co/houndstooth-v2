import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { AppIcon } from '../../atoms';

export const CollectionItemListItem = ({ name, config, ...props }) => {
  // console.debug('CollectionItemListItem', { name, config, props });

  return (
    <ListGroupItem className='CollectionItemListItem'>
      <AppIcon iconName={'file'} fill={false} />
      {name}
    </ListGroupItem>
  );
};
