import React, { Fragment } from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
// import { WithChildren } from '../../ecosystems';
import { AppIcon, AppButton } from '../../atoms';

export const CardBasic = ({ children, ...props }) => {
  const { label, title, icon, image, actionText, onAction, className = '', iconMarginTop, iconProps = {}, imageProps = {}, iconFill = false } = props;

  return (
    <Card className={`CardBasic text-center pointer-event ${className || ''}`}>
      {image ? (
        <CardImg top width="100%" src={image} alt={`Card Image: ${image}`} {...imageProps} />
      ): icon && (
        <AppIcon style={{ marginTop: iconMarginTop || '25px' }} iconName={icon || 'file-alt'} size='l' fill={iconFill} {...iconProps} />
      )}
      <CardBody>
        {title && <CardTitle>{title}</CardTitle>}
        {label}
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

CardBasic.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
  iconProps: PropTypes.object,
  imageProps: PropTypes.object
};
