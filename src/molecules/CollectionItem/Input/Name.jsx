import React from 'react';
// import { navigate } from 'hookrouter';
import { Input } from 'reactstrap';
// import { AppLink, CardBasic } from '../../../atoms';
// import { FormGroup, FormFieldInput } from '../../';
// import { es } from '../../../lib';

export const CollectionItemInputName = ({ defaultValue, placeholder, ...props }) => {
  // console.debug('CollectionItemInputName', { props });

  return (
    <Input {...{ defaultValue, placeholder }} />
  );
};
