import React from 'react';
import { NavLink } from 'reactstrap';
import { AppIcon } from '../../atoms';

export const CollectionItemNavLink = ({ item, ...props }) => {
  // console.debug('CollectionItemNavLink', { item, props });

  const { repo, pageProps, friendlyName } = props;
  const { collection, entry } = pageProps;
  // const { icon = 'folder' } = jekyll.collections[collection];
  const { name } = item;

  const href = `/${repo.full_name}/collections/${collection}/${name}`;
  const active = (name === entry);

  return (
    <NavLink className='CollectionItemNavLink' {...{ href, active }}>
      <AppIcon iconName={'file-alt'} fill={false} />
      <div className={'nav-text'}>
        <span>{friendlyName(name)}</span>
      </div>
    </NavLink>
  );
};
