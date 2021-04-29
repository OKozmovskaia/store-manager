import React, { useReducer } from 'react';

const APIContext = React.createContext();

export const APIProvider = ({children}) => {
  return(
    <APIContext.Provider value={[]}>
      {children}
    </APIContext.Provider>
  )
}