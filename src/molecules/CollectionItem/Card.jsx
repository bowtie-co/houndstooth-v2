import React from 'react';
import { AppLink, CardBasic } from '../../atoms';

export const CollectionItemCard = ({ entry, ...props }) => {
  // console.debug('CollectionItemCard', { entry, props });

  const { repo, linkWithQueryParams, pageProps } = props;
  const { collection } = pageProps;

  const href = linkWithQueryParams(`/${repo.full_name}/collections/${collection}/${entry.name}`);

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
