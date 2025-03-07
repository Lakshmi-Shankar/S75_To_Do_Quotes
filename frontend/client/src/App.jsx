/* eslint-disable no-unused-vars */
import React from 'react';
import LandingPage from './landingPage';

const App = () => {
  const projectName = "To Do Quotes";
  return (
    <>
      <div>
        <LandingPage projectName={projectName}/>
      </div>
    </>
  );
}

export default App;
