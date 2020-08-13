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
    <UncontrolledButtonDropdown className='LanguageSelect pr-1' direction='down' size='sm'>
      <DropdownToggle className='dropdown-btn'>
        <AppIcon iconName='globe-americas' size='sm' />
        <div className="small">{translate('navbar.language')}</div>
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