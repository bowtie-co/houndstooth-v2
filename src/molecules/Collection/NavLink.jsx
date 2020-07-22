import React from 'react';
import { NavLink } from 'reactstrap';
import { AppIcon } from '../../atoms';
import { CollectionItemNav } from '../';

export const CollectionNavLink = ({ name, config, ...props }) => {
  // console.debug('CollectionNavLink', { props });

  const { label = name, icon = 'folder' } = config;
  const { repo, entries, pageProps } = props;
  const { collection } = pageProps;

  const href = `/${repo.full_name}/collections/${name}`;
  const active = (name === collection);

  return (
    <NavLink className='CollectionNavLink' {...{ href, active }}>
      <AppIcon iconName={icon} fill={false} />
      <span>{label}</span>
      {active && entries && <CollectionItemNav {...props} />}
    </NavLink>
  );
};
