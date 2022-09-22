import React, { useState } from 'react';
import { isSignedIn } from '../helper/storageHelper';

const MainContext = React.createContext();

function AuthContextProvider({ children }) {
  const [jwt, setJwt] = useState(isSignedIn());

  return (
    <MainContext.Provider value={{ jwt, setJwt }}>
      {children}
    </MainContext.Provider>
  );
}

export { AuthContextProvider, MainContext };
