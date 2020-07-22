import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AppIcon } from '../../atoms';
import { CollectionItemControls, CollectionItemFields, CollectionItemEditor } from '../../molecules';

export const CollectionItemSingle = ({ children, ...props }) => {
  // console.debug('CollectionItemSingle', { props });

  const { jekyll, pageProps, itemName, isValidName } = props;
  const { entry, collection } = pageProps;
  const { icon = 'folder' } = jekyll.collections[collection];
  const [ showEditName, setShowEditName ] = useState(!isValidName());

  return (
    <Container fluid className="CollectionItemSingle">
      <Row>
        <Col md='6' lg='8' xl='9'>
          <h3 onClick={() => setShowEditName(true)}>
            <AppIcon iconName={icon} />
            &nbsp;
            {isValidName() && itemName}
          </h3>
        </Col>
        <Col md='6' lg='4' xl='3'>
          <CollectionItemControls {...props} {...{ entry, showEditName, setShowEditName }} />
        </Col>
        <Col sm='12'>
          <hr />
        </Col>
      </Row>

      <Row style={{ marginTop: '25px', marginBottom: '50px' }} className='nav-tabs'>
        <Col lg='4'>
          <CollectionItemFields {...props} />
        </Col>
        <Col lg='8'>
          <CollectionItemEditor {...props} />
        </Col>
      </Row>

      <Row>
        <Col md='6' lg='4' xl='3'>
          <CollectionItemControls {...props} {...{ entry, showEditName, setShowEditName }} />
        </Col>
      </Row>
    </Container>
  );
};
