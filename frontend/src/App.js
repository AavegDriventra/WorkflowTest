import Main from "./components/Main";
import React, { createContext, useState } from 'react';

export const userContext = createContext({
  targetComponentFields: {}, 
  setTargetComponentFields: () => {} 
});

function App() {
  const [targetComponentFields, setTargetComponentFields] = useState({});

  return (
    <userContext.Provider value={{ targetComponentFields, setTargetComponentFields }}>
      <div className="App">
        <Main />
      </div>
    </userContext.Provider>
  );
}

export default App;
