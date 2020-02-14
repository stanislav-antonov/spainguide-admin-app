import { authHeader } from "../_helpers/auth.header.js";

export const articleService = {
    save(id, formData) {
		const action = id ? "update/" + id  : "create";
		const endpointUrl = process.env.REACT_APP_SERVER_URL + "/api/article/" + action;
        const requestOptions = {
            method: "POST",
            headers: authHeader(),
            body: formData,
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