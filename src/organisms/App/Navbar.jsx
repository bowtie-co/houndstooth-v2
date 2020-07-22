import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';
import {
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Badge
} from 'reactstrap';
import { HoundstoothLogo, AppIcon, AppButton } from '../../atoms';

export const AppNavbar = ({ children, ...props }) => {
  const { auth, languages, lang, setLang, translate } = props;
  const { user, repo, branch, openPull, isBranchBuilding, isPullPending, submitChanges, getDeployedUrl, pulls } = props;

  const [ isNavOpen, setIsNavOpen ] = useState(false);
  const toggleNav = () => setIsNavOpen(prevState => !prevState);

  return (
    <Navbar className='AppNavbar top-nav-section' expand="md">
      <NavbarBrand href={'/'}>
        <HoundstoothLogo size='sm' />
      </NavbarBrand>

      <NavbarToggler onClick={toggleNav} />

      {repo && (
        <Nav className="m-auto" navbar>
          <NavItem>
            <NavLink title={getDeployedUrl(branch)} href={'//' + getDeployedUrl(branch)} target='_blank' rel='noopener noreferrer'>
              {/* TODO: Handle status failed state? */}
              {isBranchBuilding() ? (
                <span>
                  {translate('general.deploying')}...
                  <br />
                  <BarLoader />
                </span>
              ) : (
                <AppButton size='xs' color='info'>
                  {translate('navbar.preview')} <AppIcon iconName='external-link-alt' />
                </AppButton>
              )}
            </NavLink>
          </NavItem>
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
        </Nav>
      )}

      {/* TODO: How to better structure the layout + collapse for better mobile UX? */}
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className="ml-auto" navbar>
          {languages.map((l, i) => (
            <NavItem key={i}>
              <NavLink title={('general.edit')} onClick={() => setLang(l)}>
                <Badge pill color={l === lang ? 'success' : 'warning'}>
                  {l}
                </Badge>
              </NavLink>
            </NavItem>
          ))}
          {repo && (
            <NavItem>
              <NavLink title={repo.full_name} href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                <AppIcon className='fab fa-github' color='#07102c' size='md' />
              </NavLink>
            </NavItem>
          )}

          {user && (
            <NavItem>
              <NavLink onClick={() => auth.logout()} href='/' className='logout-btn'>
                {translate('navbar.logout')}
                {/* <br />
                ({user.login}) */}
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
