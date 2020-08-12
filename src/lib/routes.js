import { storage, injectPageProps } from '.';
import { useQueryParams } from 'hookrouter';
import {
  // AppHomePage,
  AppNotFoundPage,
  RepoAllPage,
  RepoOnePage,
  PullAllPage,
  PullOnePage,
  UserAllPage,
  UserOnePage,
  CollectionOnePage,
  CollectionItemOnePage,
} from '../pages';

export const pageRoutes = {
  '/': RepoAllPage,
  '/:owner/:repo': RepoOnePage,
  '/:owner/:repo/pulls': PullAllPage,
  '/:owner/:repo/pulls/:num': PullOnePage,
  '/:owner/:repo/users': UserAllPage,
  '/:owner/:repo/users/:username': UserOnePage,
  '/:owner/:repo/collections': RepoOnePage,
  '/:owner/:repo/collections/:collection': CollectionOnePage,
  '/:owner/:repo/collections/:collection/:entry': CollectionItemOnePage,
  '/*': AppNotFoundPage
};

export const routes = injectPageProps(pageRoutes, (props) => {
  const [ queryParams ] = useQueryParams();

  const {
    num,
    repo,
    owner,
    entry,
    docId,
    subId,
    username,
    filepath,
    collection
  } = props;

  const pageProps = {
    num,
    repo,
    owner,
    entry,
    docId,
    subId,
    username,
    filepath,
    collection,
    queryParams
  };

  storage.set('pageProps', pageProps);

  return { pageProps };
});
