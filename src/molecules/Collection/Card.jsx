import React from 'react';
import { AppLink, CardBasic } from '../../atoms';

export const CollectionCard = ({ name, config, pageProps, ...props }) => {
  // console.debug('CollectionCard', { name, config, props });

  const { repo, linkWithQueryParams } = props;
  const { label = name, icon = 'folder' } = config;

  const href = linkWithQueryParams(`/${repo.full_name}/collections/${name}`);

  return (
    <AppLink href={href}>
      <CardBasic
        {...{ label, icon }}
        className='CollectionCard text-center pointer-event'>
      </CardBasic>
    </AppLink>
  );
};
