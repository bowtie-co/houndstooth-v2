import {
  storage
} from '.';
import {
  injectPageProps
} from '.';
import {
  PageHome,
  PageNotFound,
  // DocumentCreate
} from '../pages';

export const pageRoutes = {
  '/': PageHome,
  // '/:owner/:repo': RepoOne,
  // '/:owner/:repo/pulls': PullAll,
  // '/:owner/:repo/pulls/:num': PullOne,
  // '/:owner/:repo/users': UserAll,
  // '/:owner/:repo/users/:username': UserOne,
  // '/:owner/:repo/collections': RepoOne,
  // '/:owner/:repo/collections/:collection': CollectionOne,
  // '/:owner/:repo/collections/:collection/:entry': CollectionItemOne,
  '/*': PageNotFound
};

export const routes = injectPageProps(pageRoutes, (props) => {
  console.debug('routes.injectPageProps()', props);

  const pageProps = { example: 'value' };

  storage.set('pageProps', pageProps);

  return { pageProps };
});
