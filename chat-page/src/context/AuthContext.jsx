import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, posRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: ""
    })

    const [loginError, setLoginError] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setloginInfo(info);
    }, []);


    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null)
        const response = await posRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        if (response.error) {
            return setRegisterError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);
    },
        [registerInfo])

    const logout = useCallback(() => {
        localStorage.removeItem("User")
        setUser(null)

    }, [])

    const login = useCallback(async (e) => {
        e.preventDefault();
        setLoginError(null)
        const response = await posRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    },
        [loginInfo])

    return <AuthContext.Provider
        value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            setIsRegisterLoading,
            logout,
            login,
            loginInfo,
            updateLoginInfo,
            loginError
        }}>
        {children}
    </AuthContext.Provider>
}