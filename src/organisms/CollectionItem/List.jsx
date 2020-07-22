import React from 'react';
import { A, navigate } from 'hookrouter';
import {
  // Badge,
  Container, Row, Col, Button,
  ListGroup, ListGroupItem
} from 'reactstrap';
import { DebugProps } from '../Debug';

export const CollectionItemList = ({ ...props }) => {
  // console.debug('CollectionItemList', { props });

  const { repo, entries, filterEntries, jekyll = {} } = props;
  const { collections = {} } = jekyll;

  return (
    <Container fluid className='CollectionList'>
      <Row>
        <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <ListGroup>
            {entries.filter(filterEntries).map((entry, index) => (
              <ListGroupItem key={index} className="justify-content-between" onClick={() => navigate(`/${repo.full_name}/collections/${entry.name}`)}>
                {entry.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
