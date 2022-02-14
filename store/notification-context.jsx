import React, { useState } from "react";
const Context = React.createContext()

function ContextProvider({ children }) {

    const [activeNotification, setActiveNotification] = useState()

    function showNotificationHandler(notification) {
        setActiveNotification(notification)
    }

    function hideNotificationHandler(notification) {
        setActiveNotification(null)
    }

    const contextProviderValues = {
        activeNotification,
        showNotificationHandler,
        hideNotificationHandler
    }

    return (
        <Context.Provider value={contextProviderValues}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }