import { authHeader } from "../_helpers/auth.header.js";

export const articleService = {
    save(article) {
        const action = article.id ? "update/" + article.id  : "create";
		const endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/article/" + action;
        
        const headers = authHeader();
        headers["Content-Type"] =  "application/json";

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(article),
        };
        
        return fetch(endpointUrl, requestOptions);
    },

    one(id) {
		const endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/article/one/" + id;
        
        const requestOptions = {
            method: "GET",
            headers: authHeader(),
        };
        
        return fetch(endpointUrl, requestOptions);
    },

    list() {
		const endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/article/list";
        const requestOptions = {
            method: "GET",
            headers: authHeader(),
        };
    
        return fetch(endpointUrl, requestOptions);
    }
};