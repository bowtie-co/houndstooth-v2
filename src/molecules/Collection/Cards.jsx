import React from 'react';
import { Row, Col } from 'reactstrap';
import { CollectionCard } from '../';

export const CollectionCards = ({ ...props }) => {
  // console.debug('CollectionCards', { props });

  const { jekyll } = props;
  const { collections } = jekyll;

  return (
    <Row className='CollectionCards'>
      {Object.keys(collections).map((name, index) => (
        <Col sm='6' md='4' lg='3' xl='2' key={index}>
          <CollectionCard key={index} {...props} name={name} config={collections[name]} />
        </Col>
      ))}
    </Row>
  );
};
