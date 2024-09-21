import React from 'react';

import useRouteElements from './useRouteElements';
import './App.css';

function App() {
  const routeElements = useRouteElements()
  return <div>{routeElements}</div>
}

export default App;
