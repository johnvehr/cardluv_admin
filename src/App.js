import React from 'react';
import logo from './logo.svg';

import './App.css';
import "antd/dist/antd.css";
import {useRoutes} from 'react-router-dom'
import routes from './routes'

const App = () => {
  const content = useRoutes(routes)
  return (
    <div>
      {content}
    </div>
  )
}

export default App;
