import React from 'react';

export const WithChildren = ({ children, ...props }) => {
  // console.debug('WithChildren', { props });

  return (Array.isArray(children) ? children : [ children ]).map((c, i) => React.cloneElement(c, Object.assign(props, { key: i })));
};
