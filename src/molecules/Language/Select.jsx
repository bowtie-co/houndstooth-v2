import React from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { AppIcon } from '../../atoms';


export const LanguageSelect = ({ ...props }) => {
  const { languages, lang, setLang, translate } = props;

  return (
    <UncontrolledButtonDropdown className='LanguageSelect pr-1' title={translate('navbar.change_language')} direction='down' size='sm'>
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
    </UncontrolledButtonDropdown>
  );
};