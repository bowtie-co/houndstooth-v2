import React, { useState } from 'react';
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
// import { AppIcon } from '../../atoms';

export const AppNavbar = ({ children, ...props }) => {
  const { languages, lang, setLang } = props;

  const [ isNavOpen, setIsNavOpen ] = useState(false);
  const toggleNav = () => setIsNavOpen(prevState => !prevState);

  return (
    <Navbar className='AppNavbar top-nav-section' expand="md">
      <NavbarBrand href={'/'}>
        React App
      </NavbarBrand>

      <NavbarToggler onClick={toggleNav} />

      {/* TODO: How to better structure the layout + collapse for better mobile UX? */}
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className='ml-auto' navbar>
          {languages.map((l, i) => (
            <NavItem>
              <NavLink title={('general.edit')} onClick={() => setLang(l)}>
                <Badge pill color={l === lang ? 'success' : 'warning'}>
                  {l}
                </Badge>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
