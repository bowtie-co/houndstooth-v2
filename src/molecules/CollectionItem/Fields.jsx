import React from 'react';
import PropTypes from 'prop-types';
import { FormRecursive } from '../';

export const CollectionItemFields = (props) => {
  // console.debug('CollectionItemFields', { props });

  const { itemFields, setItemFields } = props;

  return (
    <section className='CollectionItemFields tab-content-card'>
      <FormRecursive {...props} fields={itemFields} onChange={setItemFields} />
    </section>
  );
};

CollectionItemFields.propTypes = {
  itemFields: PropTypes.object,
  pageProps: PropTypes.object
};
