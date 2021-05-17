import axios from "axios";

const API_URL = "http://findmypet-back.azurewebsites.net/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, firstName, lastName, address, contacts, userPhoto) {

        let formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("address", address);
        formData.append("contacts", contacts);
        formData.append("userPhoto", userPhoto);
        console.log(formData);
        return axios.post(API_URL + "signup", formData);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }
}

export default new AuthService();
