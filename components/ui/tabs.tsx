import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [active, setActive] = useState(defaultValue);
  return React.Children.map(children, child =>
    React.cloneElement(child, { active, setActive })
  );
};

export const TabsList = ({ children }) => <div>{children}</div>;

export const TabsTrigger = ({ children, value, active, setActive }) => (
  <button onClick={() => setActive(value)} style={{ fontWeight: active === value ? 'bold' : 'normal', margin: '0 10px' }}>{children}</button>
);

export const TabsContent = ({ children, value, active }) => (
  active === value ? <div>{children}</div> : null
);