import React, { createContext, useState } from 'react';

export const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <SharedStateContext.Provider value={{ data, setData }}>
      {children}
    </SharedStateContext.Provider>
  );
};
