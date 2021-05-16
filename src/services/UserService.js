import axios from 'axios';
import authHeader from './AuthHeader';
import http from "../http-common";
import header from "./Header";

const API_URL = 'http://localhost:8080/api/users/';
const GET_USER_DETAILS = 'http://localhost:8080/api/users/getUserDetails';
const EDIT_USER_DETAILS = 'http://localhost:8080/api/users/editUser';

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }
  //
  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }
  //
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getNumberOfUser(){
    return axios.get(API_URL+'getNumberOfUsers', { headers: authHeader() });
  }

  getUserDetails(user_id){
    const params = [
      ['id', user_id]
    ];

    return axios.get(`${GET_USER_DETAILS}?${new URLSearchParams(params)}`);
  }

  editUser(user) {
    console.log(user)
    let formData = new FormData();
    formData.append("id", user.id);
    formData.append("userPhoto", user.userPhoto);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("contacts", user.contacts);

    console.log(formData)

    return http.put(EDIT_USER_DETAILS, formData, {
      headers: header()
    });
  }
  editUserWithoutImage(user) {
    console.log(user)
    let formData = new FormData();
    formData.append("id", user.id);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("contacts", user.contacts);

    console.log(formData)

    return http.put(EDIT_USER_DETAILS, formData, {
      headers: header()
    });
  }

}

export default new UserService();
