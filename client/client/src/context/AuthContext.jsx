import Password from "antd/es/input/Password";
import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services"; // Assuming `baseUrl` and `postRequest` are exported from the same file

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null); 
    const [isRegisterLoading, setIsRegisterLoading] = useState(false); 
    const [loginError, setLoginError] = useState(null); 
    const [isLoginLoading, setIsLoginLoading] = useState(false); 
    
    const [registerInfo, setRegisterInfo] = useState({
        name: "", 
        email: "", 
        password: "", 
    });
    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: "", 
    });

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (user) {
            setUser(JSON.parse(user)); 
        }
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault(); 
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo)); 
        setIsRegisterLoading(false);

        if (response.error) {
            setRegisterError(response);
            return;
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response); 
    }, [registerInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    const loginUser = useCallback(async (e) => {
        e.preventDefault(); 
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        setIsLoginLoading(false);

        if (response.error) {
            setLoginError(response);
            return;
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response); 
    }, [loginInfo]);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo, 
                updateRegisterInfo,
                registerUser, 
                registerError, 
                isRegisterLoading, 
                logoutUser, 
                loginUser, 
                loginError, 
                loginInfo, 
                updateLoginInfo, 
                isLoginLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    ); 
};
