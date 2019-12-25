import React from 'react';
import Products from 'components/Products';
import Layer from 'Layer';

class App extends React.Component {
  render() {
    return (
      <Layer>
        <Products />
      </Layer>
    );
  }
}

export default App;
