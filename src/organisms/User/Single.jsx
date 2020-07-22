import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { CollectionList } from '../../molecules';

export const UserSingle = ({ children, ...props }) => {
  // console.debug('UserSingle', { props });

  return (
    <Container fluid className="UserSingle">
      <Row className="ActionsRow">
        <Col sm='12'>
          <h1>UserSingle</h1>
        </Col>
      </Row>
    </Container>
  );
};
