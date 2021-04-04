import { createAuthProvider } from 'react-token-auth';


const offlineUrl = "http://localhost:5000/api/refresh";

export const [ useAuth, authFetch, login, logout] = 
    createAuthProvider({
        accessTokenExpireKey: 'accessToken',
        onUpdateToken: (token) => fetch(offlineUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: token.refreshToken
        })
        .then(rsp => rsp.json())
    });