import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { AppAvatar, AppIcon, AppLastUpdated, AppSummary, AppTitle } from '../../atoms';
import { WithLoader } from '../../ecosystems';
import { AppPagination } from '../../molecules';

export const RepoCards = ({ repos, ...props }) => {
  const { reloadRepos, translate } = props;

  const perPage = 24;
  const [ page, setPage ] = useState(1);
  const [ pageRepos, setPageRepos ] = useState([]);

  useEffect(() => {
    const indexStart = (page - 1) * perPage;
    const indexEnd = indexStart + perPage;

    setPageRepos(repos && repos.slice(indexStart, indexEnd));
  }, [ repos, page ]);

  return (
    <section className='RepoCards'>
      <div className='repo-list-header flex-row space-between'>
        <AppTitle>{translate('repos.list_title')}</AppTitle>
        <div>
          <AppIcon iconName='sync-alt' size='sm' onClick={() => reloadRepos()} />
        </div>
      </div>
      <WithLoader isLoading={!repos.length} nonBlocking={true}>
        <Row>
          {pageRepos.map((repo, index) => (
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
          <AppPagination items={repos} page={page} perPage={perPage} maxPages={5} setPage={setPage} {...props}></AppPagination>
        </div>
      </WithLoader>
    </section>
  );
};
