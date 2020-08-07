import React from 'react';
import Block from './containers/BlockContainer'
import 'antd/dist/antd.css';

function App() {
  return (
    <div>
      <Block index={0} prevHash="0"/>
    </div>
  )
}

export default App;
