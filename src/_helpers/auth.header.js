import { authenticationService } from "../_services/authentication.service.js";

export const authHeader = () => {
	const token = authenticationService.token;
	if (token) {
		return { Authorization: token };
	} else {
		return {};
	}
}