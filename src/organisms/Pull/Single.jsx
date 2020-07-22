import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { CollectionList } from '../../molecules';

export const PullSingle = ({ children, ...props }) => {
  // console.debug('PullSingle', { props });

  const { pageProps } = props;
  const { num } = pageProps;

  return (
    <Container fluid className="PullSingle">
      <Row className="ActionsRow">
        <Col sm='12'>
          <h1>PR #{num}</h1>
        </Col>
      </Row>
    </Container>
  );
};
