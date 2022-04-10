import React, { useState, useEffect } from "react";

const LoginContext = React.createContext({
    loginState: {},
    loginSuccess: (loginResuslt) => { },
    logoutSuccess: () => {}
});

function useLogin() {
    const [loginState, setLoginState] = useState(null);

    useEffect(() => {
        //TODO in the future get last used login from the local storage/cookies/something
    });

    useEffect(() => {
        //TODO when the login state changes, set the storage/cookies/something
    }, [loginState])

    const loginSuccess = (loginResult) => {
        setLoginState(loginResult);
    }

    const logoutSuccess = () => {
        setLoginState(null);
    }

    return {
        loginState,
        loginSuccess,
        logoutSuccess
    }
}

export default useLogin;
export { LoginContext };