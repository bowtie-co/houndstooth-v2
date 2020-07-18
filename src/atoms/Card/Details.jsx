import React, { Fragment } from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
// import { WithChildren } from '../../ecosystems';
import { AppIcon, AppButton } from '../../atoms';

export const CardDetails = ({ children, ...props }) => {
  const { title, icon, details, actionText, onAction, className = '', iconMargin = '10px', iconProps = {}, iconSize = 'md', iconFill = false } = props;

  return (
    <Card className={`CardDetails pointer-event ${className || ''}`}>
      <CardHeader className='text-right'>
        {icon && (
          <AppIcon style={{ float: 'left', margin: iconMargin }} iconName={icon} size={iconSize} fill={iconFill} {...iconProps} />
        )}
        <span className='details'>
          {details}
        </span>
      </CardHeader>
      <CardBody>
        {title && <CardTitle>{title}</CardTitle>}
        {actionText &&
          <Fragment>
            <br /><br />
            <AppButton size='xs' onClick={onAction}>{actionText}</AppButton>
          </Fragment>
        }
        {children}
      </CardBody>
    </Card>
  );
};

CardDetails.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
  iconProps: PropTypes.object,
  imageProps: PropTypes.object
};
