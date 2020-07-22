import React from 'react';
// import { navigate } from 'hookrouter';
// import { Card, CardBody } from 'reactstrap';
import { AppLink, CardBasic } from '../../atoms';

export const CollectionCard = ({ name, config, ...props }) => {
  // console.debug('CollectionCard', { name, config, props });

  const { repo } = props;
  const { label = name, icon = 'folder' } = config;

  const href = `/${repo.full_name}/collections/${name}`;

  return (
    <AppLink href={href}>
      <CardBasic
        {...{ label, icon }}
        className='CollectionCard text-center pointer-event'>
      </CardBasic>
    </AppLink>
  );
};
