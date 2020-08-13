import React from 'react';
import { navigate } from 'hookrouter';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { AppAvatar, AppIcon, AppLastUpdated, AppSummary, AppTitle } from '../../atoms';
import { WithLoader } from '../../ecosystems';
import { RepoPagination } from '../../molecules';

export const RepoCards = ({ repoPage, ...props }) => {
  const { reloadRepos, repoPageLoading, translate } = props;

  return (
    <section className='RepoCards'>
      <div className='repo-list-header flex-row space-between'>
        <AppTitle>{translate('repos.list_title')}</AppTitle>
        <div>
          <AppIcon iconName='sync-alt' size='sm' onClick={() => reloadRepos()} />
          {/* TODO: @Brennan - enable `reloadReposAndBranches` logic (first set up local storage) */}
          {/* <AppIcon iconName='sync-alt' size='sm' onClick={reloadReposAndBranches} /> */}
        </div>
      </div>
      <WithLoader isLoading={repoPageLoading} nonBlocking={true}>
        <Row>
          {repoPage.map((repo, index) => (
            <Col md='6' lg='4' xl='3' key={index} className='list-item'>
              <Card className='repo-card' onClick={() => navigate(`/${repo.full_name}`)}>
                <CardTitle>{repo.name}</CardTitle>
                <CardBody>
                  <div className='flex-row align-center'>
                    <AppAvatar owner={repo.owner} />
                    <div className='repo-name truncate'>{repo.owner.login}</div>
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
        <div className='mt-4'>
          <RepoPagination {...props}></RepoPagination>
        </div>
      </WithLoader>
    </section>
  );
};
