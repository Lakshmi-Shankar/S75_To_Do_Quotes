/* eslint-disable no-unused-vars */
import React from 'react';
import LandingPage from './landingPage';
import Dropdown from './dropDown';

const App = () => {
  const projectName = "To Do Quotes";
  return (
    <>
      <div>
        <Dropdown />
        <LandingPage projectName={projectName}/>
      </div>
    </>
  );
}

export default App;
