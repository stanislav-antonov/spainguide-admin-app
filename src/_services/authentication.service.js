
import { BehaviorSubject } from 'rxjs';

const tokenSubject = new BehaviorSubject(localStorage.getItem('token'));

export const authenticationService = {
    get isAuthenticated() { 
        return tokenSubject.value != null;
    },
    
    get tokenValue() { 
        return tokenSubject.value;
    },
    
    login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
    
        let endpointUrl = process.env.REACT_APP_SERVER_URL + "/login";
        return fetch(endpointUrl, requestOptions)
            .then(response => {
                if (response.ok) {
                    let token = response.headers.get('Authorization');
                    localStorage.setItem('token', token);
                    tokenSubject.next(token);
                }

                return response;
            });
    },
    
    logout() {
        localStorage.removeItem('token');
        tokenSubject.next(null);
    },
};
