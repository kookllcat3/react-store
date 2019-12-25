import React from 'react';
import Header from 'components/Header';

const Layer = props => (
  <div className="main">
    <Header nickName="Admin" />
    {props.children}
  </div>
);

export default Layer;
