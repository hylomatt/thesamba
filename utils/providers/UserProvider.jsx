import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    parentNav: null
  })

  const value = { state, setState }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
