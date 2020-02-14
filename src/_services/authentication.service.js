export const authenticationService = {
    get isAuthenticated() { 
        return this.token != null;
    },
    
    get token() { 
        return localStorage.getItem("token");
    },
    
    login(username, password) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        };
    
        const endpointUrl = process.env.REACT_APP_SERVER_URL + "/login";
        return fetch(endpointUrl, requestOptions)
            .then(response => {
                if (response.ok) {
                    const token = response.headers.get("Authorization");
                    localStorage.setItem("token", token);
                }

                return response;
            });
    },
    
    logout() {
        localStorage.removeItem("token");
    },
};
