import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { storage } from '../../lib';
import { AppAvatar, AppIcon, AppLastUpdated, AppSummary, AppTitle } from '../../atoms';
import { WithLoader } from '../../ecosystems';
import { AppPagination } from '../../molecules';

export const RepoCards = ({ ...props }) => {
  const { reloadRepos, translate } = props;

  const perPage = 24;
  const [ repos, setRepos ] = useState(storage.get('repos') || []);
  const [ reposCached, setReposCached ] = useState(storage.get('reposCached') || false);
  const [ page, setPage ] = useState(1);
  const [ pageRepos, setPageRepos ] = useState([]);

  useEffect(() => {
    const indexStart = (page - 1) * perPage;
    const indexEnd = indexStart + perPage;
    const selectedRepos = repos && Array.isArray(repos) ? repos.slice(indexStart, indexEnd) : [];
    setPageRepos(selectedRepos);
  }, [ repos, page ]);

  useEffect(() => {
    const removeRepos = () => setRepos([]);
    const updateRepos = (savedRepos) => setRepos(savedRepos);
    const updateCached = (reposCached) => setReposCached(!!reposCached);
    const removeCached = () => setReposCached(false);

    storage.on('repos_changed', updateRepos);
    storage.on('repos_removed', removeRepos);
    storage.on('reposCached_changed', updateCached);
    storage.on('reposCached_removed', removeCached);

    return () => {
      storage.off('repos_changed', updateRepos);
      storage.off('repos_removed', removeRepos);
      storage.off('reposCached_updated', updateCached);
      storage.off('reposCached_removed', removeCached);
    };
  }, [ setRepos ]);

  return (
    <section className='RepoCards'>
      <div className='repo-list-header flex-row space-between'>
        <AppTitle>{translate('repos.list_title')}</AppTitle>
        <div>
          <AppIcon iconName='sync-alt' size='sm' onClick={() => reloadRepos()} />
        </div>
      </div>
      {/* TODO: Address edge case of user w/o repos */}
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
          <AppPagination items={repos} page={page} perPage={perPage} maxPages={5} disableLast={!reposCached} setPage={setPage} {...props}></AppPagination>
        </div>
      </WithLoader>
    </section>
  );
};
