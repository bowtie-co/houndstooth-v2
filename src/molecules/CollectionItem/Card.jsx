import React from 'react';
// import { navigate } from 'hookrouter';
// import { Card, CardBody } from 'reactstrap';
import { AppLink, CardBasic } from '../../atoms';

export const CollectionItemCard = ({ entry, ...props }) => {
  // console.debug('CollectionItemCard', { entry, props });

  const { repo, pageProps } = props;
  const { collection } = pageProps;

  const href = `/${repo.full_name}/collections/${collection}/${entry.name}`;

  return (
    <AppLink href={href}>
      <CardBasic
        icon='file-alt'
        label={entry.name}
        className='CollectionItemCard text-center pointer-event'>
      </CardBasic>
    </AppLink>
  );
};
