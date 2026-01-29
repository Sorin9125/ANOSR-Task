import { useState } from "react";
import AppContext from "./AppContext";

function Context({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    return (
        <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
            {children}
        </AppContext.Provider>
    )
};

export default Context;