import axios from "axios";
import authHeader from "./AuthHeader";
import http from "../http-common";
import header from "./Header";

const POST_URL = 'http://localhost:8080/api/posts/getAllPosts';
const MY_POSTS_URL = 'http://localhost:8080/api/posts/getMyPosts';
const CREATE_POST_URL = 'http://localhost:8080/api/posts/createPost';

class PostService {
    getAllPosts() {
        return axios.get(POST_URL);

    }

    getMyPosts() {
        return axios.get(MY_POSTS_URL,{headers: authHeader() })
    }

    createPost(petImage,
               status,
               species,
               sterilization,
               furColor,
               address,
               contacts,
               gender,
               breed,
               eyeColor,
               specialSigns,
               reward,
               age){

        let formData = new FormData();
        formData.append("petImage", petImage);
        formData.append("status", status);
        formData.append("species", species);
        formData.append("sterilization", sterilization);
        formData.append("furColor", furColor);
        formData.append("address", address);
        formData.append("contacts", contacts);
        formData.append("gender", gender);
        formData.append("breed", breed);
        formData.append("eyeColor", eyeColor);
        formData.append("specialSigns", specialSigns);
        formData.append("reward", reward);
        formData.append("age", age);

        console.log(petImage)
        // return axios.post(CREATE_POST_URL, {
        // petImage,
        // status,
        // species,
        // sterilization,
        // furColor,
        // address,
        // contacts,
        // gender,
        // breed,
        // eyeColor,
        // specialSigns,
        // reward,
        // age
        // },{headers: authHeader() });

        return http.post("/api/posts/createPost", formData, {
            headers: header()});
    }
}

export default new PostService();