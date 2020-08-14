import React, { useState } from 'react';
// import { BarLoader } from 'react-spinners';
import {
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Badge,
} from 'reactstrap';
import { HoundstoothLogo, AppIcon, AppButton } from '../../atoms';
import { BranchSelect, LanguageSelect, RepoSelect } from '../../molecules';

export const AppNavbar = ({ children, ...props }) => {
  const { auth, languages, translate } = props;
  const { user, repos, repo, branch, openPull, deployedUrl, isPullPending, submitChanges, pulls } = props;

  const [ isNavOpen, setIsNavOpen ] = useState(false);
  const toggleNav = () => setIsNavOpen(prevState => !prevState);

  // console.debug('AppNavbar', { repos, props });

  return (
    <Navbar className='AppNavbar top-nav-section' expand="md">
      <NavbarBrand href={'/'}>
        <HoundstoothLogo size='md' color='white' />
      </NavbarBrand>

      <NavbarToggler onClick={toggleNav} />

      {repos && (
        <Nav className="m-auto nav-bar nav-bar-left" navbar>
          <RepoSelect {...props} />
        </Nav>
      )}

      {branch && (
        <Nav className="m-auto nav-bar nav-bar-left" navbar>
        <BranchSelect {...props} />
      </Nav>
      )}

      {repo && (
        <Nav className="m-auto nav-bar" navbar>
          {/* TODO: Finalize enforcement / visibility for the approvals feature */}
          {repo.permissions.admin && pulls && pulls.length > 0 && (
            <NavItem>
              <NavLink title={`${pulls.length} ${translate('navbar.pending_title')}`} href={`/${repo.full_name}/pulls`}>
                <AppButton size='xs' color='warning'>
                  <Badge pill color="warning">{pulls.length}</Badge>
                  &nbsp;
                  {translate('navbar.pending')}
                </AppButton>
              </NavLink>
            </NavItem>
          )}

          {/* {(refStatus && refStatus.build && refStatus.build.state === 'pending' && refStatus.build.target_url) && (
            <NavItem>
              <NavLink title={getDeployedUrl(branch)} href={'//' + getDeployedUrl(branch)} target='_blank' rel='noopener noreferrer'>
                <span>
                  {translate('general.deploying')}...
                  <br />
                  <BarLoader />
                </span>
              </NavLink>
            </NavItem>
          )} */}

          {deployedUrl && (
            <NavItem>
              <NavLink title={deployedUrl} href={deployedUrl} target='_blank' rel='noopener noreferrer'>
                <section>
                  <AppIcon className='fa fa-eye' size='sm' />
                  <div className="small">{translate('navbar.preview')}</div>
                </section>
              </NavLink>
            </NavItem>
          )}

          {openPull && isPullPending(openPull) && (
            <NavItem>
              <NavLink title={translate('navbar.submit_title')} onClick={() => submitChanges(openPull)}>
                <AppButton size='xs' color='success'>
                  {translate('navbar.submit')}
                </AppButton>
              </NavLink>
            </NavItem>
          )}

          {/* <NavItem>
            <NavLink title={translate('navbar.submit_title')} href={`/${repo.full_name}/pulls`} target='_blank' rel='noopener noreferrer'>
              <AppButton size='xs' color='success'>
                {translate('navbar.submit')}
              </AppButton>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink title={translate('navbar.update_title')} href={`/${repo.full_name}/pulls`} target='_blank' rel='noopener noreferrer'>
              <AppButton size='xs' color='warning'>
                {translate('navbar.update')}
              </AppButton>
            </NavLink>
          </NavItem> */}
        </Nav>
      )}

      {/* TODO: How to better structure the layout + collapse for better mobile UX? */}
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className="ml-auto nav-bar" navbar>
          {languages.length > 1 && (
            <LanguageSelect {...props} />
          )}

          {repo && (
            <NavItem>
              <NavLink href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                <section>
                  <AppIcon className='fab fa-github' color='white' size='sm' />
                  <div className="small">{translate('navbar.source')}</div>
                </section>
              </NavLink>
            </NavItem>
          )}

          {user && (
            <NavItem>
              <NavLink onClick={() => auth.logout()} href='/' className='logout-btn'>
                <section>
                  <AppIcon className='fa fa-sign-out' size='sm' />
                  <div className="small">{translate('navbar.exit')}</div>
                </section>
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
