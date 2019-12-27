import React, { useMemo } from 'react';
import Header from 'components/Header';

const Layer = props => {
  const user = useMemo(() => {
    return global.auth.getUser() || {};
  }, []);

  return (
    <div className="main">
      <Header user={user} />
      {props.children}
    </div>
  );
};

export default Layer;
