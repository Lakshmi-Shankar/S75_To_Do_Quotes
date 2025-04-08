import React from 'react';
import LandingPage from './landingPage';
import Dropdown from './dropDown';

const App = () => {
  const projectName = "To Do Quotes";
  return (
    <div className="appContainer">
      <Dropdown />
      <LandingPage projectName={projectName} />
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .appContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 800px;
        }
      `}</style>
    </div>
  );
}

export default App;
