import { createContext, useState, useRef } from "react";

const AccountContext = createContext({});

export const AccountProvider = ({ children }) => {

    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const toast = useRef(null)
    const [wasLoggedOut, setWasLoggedOut] = useState(false)

    return (
        <AccountContext.Provider value={{
            username,
            setUsername,
            userId,
            setUserId,
            toast,
            wasLoggedOut,
            setWasLoggedOut
        }}>
            {children}
        </AccountContext.Provider>
    )
};

export default AccountContext;