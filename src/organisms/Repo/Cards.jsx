import React from 'react';
import { navigate } from 'hookrouter';
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { AppButton } from '../../atoms';

export const RepoCards = ({ repos }) => {
  return (
    <Row>
      {repos.map((repo, index) => (
        <Col sm='6' md='4' lg='3' xl='2' key={index}>
          <Card>
            <CardImg top width="100%" src={repo.owner.avatar_url} alt={repo.owner.login} />
            <CardBody>
              <CardTitle>{repo.name}</CardTitle>
              <AppButton block onClick={() => navigate(`/${repo.full_name}`)}>Select</AppButton>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
