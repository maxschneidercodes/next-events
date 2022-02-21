import React, { useState } from "react";
import { useEffect } from "react";
const Context = React.createContext()

function ContextProvider({ children }) {

    const [succesNewsletter, setSuccesNewsletter] = useState(false)
    const [activeNotification, setActiveNotification] = useState()

    useEffect(() => {
        if (activeNotification &&
            (activeNotification.status === "success"
                || activeNotification.status === "error")) {
            const timer = setTimeout(() => {
                setActiveNotification(null)
            }, 2000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [activeNotification])

    function showNotificationHandler(notification) {
        setActiveNotification(notification)
    }

    function hideNotificationHandler(notification) {
        setActiveNotification(null)
    }

    const contextProviderValues = {
        activeNotification,
        showNotificationHandler,
        hideNotificationHandler,
        succesNewsletter,
        setSuccesNewsletter
    }

    return (
        <Context.Provider value={contextProviderValues}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }