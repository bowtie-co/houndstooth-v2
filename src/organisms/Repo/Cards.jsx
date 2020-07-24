import React from 'react';
import { navigate } from 'hookrouter';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { AppAvatar, AppIcon, AppLastUpdated, AppSummary, AppTitle } from '../../atoms';

export const RepoCards = ({ repos, ...props }) => {
  return (
    <section className='RepoCards'>
      <div className='repo-list-header flex-row space-between'>
        <AppTitle>Welcome! Please select a repository.</AppTitle>
        <div>
          <AppIcon iconName='sync-alt' size='sm' />
          {/* TODO: @Brennan - enable `reloadReposAndBranches` logic (set up local storage) */}
          {/* <AppIcon iconName='sync-alt' size='sm' onClick={reloadReposAndBranches} /> */}
        </div>
      </div>
      <Row>
        {repos.map((repo, index) => (
          <Col lg='6' xl='4' key={index} className='list-item'>
            <Card className='repo-card' onClick={() => navigate(`/${repo.full_name}`)}>
              <CardTitle>{repo.name}</CardTitle>
              <CardBody>
                <div className='flex-row align-center'>
                  <AppAvatar owner={repo.owner} />
                  <div className='repo-name'>{repo.owner.login}</div>
                </div>
                <AppSummary>
                  <div className='truncate-multi'>{repo.description || 'N/A'}</div>
                </AppSummary>
                <AppLastUpdated time={repo.updated_at} {...props} />
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};
