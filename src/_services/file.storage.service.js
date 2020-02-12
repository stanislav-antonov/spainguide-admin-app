import { authHeader } from "../_helpers/auth.header.js";

export const fileStorageService = {
    store(file) {
        const endpointUrl = process.env.REACT_APP_SERVER_URL + "/file-storage/store-file";
        const formData = new FormData();
		formData.append("file", file);

        const requestOptions = {
            method: "POST",
            headers: authHeader(),
            body: formData
        };
    
        return fetch(endpointUrl, requestOptions);
    }
};