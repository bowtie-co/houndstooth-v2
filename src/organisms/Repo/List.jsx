import React from 'react';
import {
  Container, Row, Col,
  ListGroup, ListGroupItem
} from 'reactstrap';

export const RepoList = ({ repos }) => {
  return (
    <Container fluid className='RepoList'>
      <Row>
        <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <ListGroup>
            {repos.map((repo, index) => (
              // <ListGroupItem key={service} className="justify-content-between">{service} <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem key={index} className="justify-content-between">
                <pre>{JSON.stringify(repo)}</pre>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
