import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { AppLink, AppIcon } from '../../atoms';

export const CollectionListItem = ({ name, config, ...props }) => {
  // console.debug('CollectionListItem', { name, config, props });

  const { repo } = props;
  const { label = name, icon = 'folder' } = config;

  return (
    <ListGroupItem className='CollectionListItem'>
      <AppLink href={`/${repo.full_name}/collections/${name}`}>
        <AppIcon iconName={icon} fill={false} />
        {label}
      </AppLink>
    </ListGroupItem>
  );
};
