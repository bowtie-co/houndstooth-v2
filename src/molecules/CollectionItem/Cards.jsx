import React from 'react';
import { Row, Col } from 'reactstrap';
import { CollectionItemCard } from '../';

export const CollectionItemCards = ({ ...props }) => {
  // console.debug('CollectionItemCards', { props });

  const { entries, filterEntries } = props;
  // const { collections } = jekyll;
  // const { collection } = pageProps;

  return (
    <Row className='CollectionItemCards'>
      {entries.filter(filterEntries).map((entry, index) => (
        <Col sm='6' md='4' lg='3' xl='2' key={index}>
          <CollectionItemCard entry={entry} {...props} />
        </Col>
      ))}
    </Row>
  );
};
