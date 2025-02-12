
import Main from "./components/Main";
import React, { createContext, useState } from 'react';


export const userContext = createContext({
  targetComponentFields: {}, 
  setTargetComponentFields: () => {} ,

  actionComponents: {},
  setActionComponents: () => {}
});



function App() {
  const [targetComponentFields, setTargetComponentFields] = useState({});
  const [actionComponents , setActionComponents] = useState({});

  return (
    <userContext.Provider value={{ targetComponentFields, setTargetComponentFields  , actionComponents , setActionComponents }}>
      <div className="App">
       <Main/>  
      
      </div>
    </userContext.Provider>
  );
}

export default App;
