import React from 'react';

import { Tabs as BootstrapTabs } from 'react-bootstrap';

const Tabs = ({ id, defaultActiveKey, onSelect, children }) => {
  return (
    <BootstrapTabs id={id} activeKey={defaultActiveKey} onSelect={onSelect}>
      {children}
    </BootstrapTabs>
  );
};
  
export default Tabs;
