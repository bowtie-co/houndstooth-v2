import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { AppIcon } from '../../atoms';


export const LanguageSelect = ({ ...props }) => {
  const { languages, lang, setLang, translate } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <ButtonDropdown className='LanguageSelect pr-1' title={translate('navbar.change_language')} direction='down' isOpen={dropdownOpen} toggle={toggleDropdown} size='sm'>
      <DropdownToggle className='dropdown-btn'>
        <AppIcon className='fa fa-flag-o' size='md' />
      </DropdownToggle>
      <DropdownMenu>
        {languages.map((l, i) => (
          <DropdownItem key={i} onClick={() => setLang(l)} disabled={lang === l}>
            {l.toUpperCase()}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};