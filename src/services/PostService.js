import axios from "axios";
import authHeader from "./AuthHeader";
import http from "../http-common";
import header from "./Header";

const ALL_POST_URL = 'http://findmypet-back.azurewebsites.net/api/posts/getAllPosts';
const FOUND_POST_URL = 'http://findmypet-back.azurewebsites.net/api/posts/getFoundPetsPosts';
const LOST_POST_URL = 'http://findmypet-back.azurewebsites.net/api/posts/getLostPetsPosts';
const SUCCESS_POST_URL = 'http://findmypet-back.azurewebsites.net/api/posts/getSuccessStories';
const MY_POSTS_URL = 'http://findmypet-back.azurewebsites.net/api/posts/getMyPosts';
const GET_POST_DETAILS = 'http://findmypet-back.azurewebsites.net/api/posts/getPost';
const DELETE_POST = 'http://findmypet-back.azurewebsites.net/api/posts/deletePost';
const EDIT_POST = 'http://findmypet-back.azurewebsites.net/api/posts/editPost';

class PostService {
    getAllPosts() {
        return axios.get(ALL_POST_URL);

    }

    getFoundPetsPosts() {
        return axios.get(FOUND_POST_URL);

    }

    getLostPetsPosts() {
        return axios.get(LOST_POST_URL);
    }

    getSuccessStories() {
        return axios.get(SUCCESS_POST_URL);
    }

    getMyPosts() {
        return axios.get(MY_POSTS_URL, {headers: authHeader()})
    }

    getPostDetails(post_id) {
        const params = [
            ['id', post_id]
        ];

        return axios.get(`${GET_POST_DETAILS}?${new URLSearchParams(params)}`);
        // return axios.get(`${GET_POST_DETAILS}?id=${post_id}`);
    }

    deletePost(post_id) {
        const params = [
            ['id', post_id]
        ];
        return axios.delete(`${DELETE_POST}?${new URLSearchParams(params)}`, {headers: authHeader()});

    }

    editPost(post) {
        console.log(post)
        let formData = new FormData();
        formData.append("id", post.id);
        formData.append("petImage", post.petImage);
        formData.append("status", post.status);
        formData.append("species", post.species);
        formData.append("sterilization", post.sterilization);
        formData.append("furColor", post.furColor);
        formData.append("address", post.address);
        formData.append("contacts", post.contacts);
        formData.append("gender", post.gender);
        formData.append("breed", post.breed);
        formData.append("eyeColor", post.eyeColor);
        formData.append("specialSigns", post.specialSigns);
        formData.append("reward", post.reward);
        formData.append("age", post.age);
        formData.append("details", post.details);
        formData.append("user", post.user);
        formData.append("authorId", post.user.id);


        console.log(formData)

        return http.put(EDIT_POST, formData, {
            headers: header()
        });
    }

    editPostWithoutImage(post) {
        console.log(post)
        let formData = new FormData();
        formData.append("id", post.id);
        formData.append("status", post.status);
        formData.append("species", post.species);
        formData.append("sterilization", post.sterilization);
        formData.append("furColor", post.furColor);
        formData.append("address", post.address);
        formData.append("contacts", post.contacts);
        formData.append("gender", post.gender);
        formData.append("breed", post.breed);
        formData.append("eyeColor", post.eyeColor);
        formData.append("specialSigns", post.specialSigns);
        formData.append("reward", post.reward);
        formData.append("age", post.age);
        formData.append("details", post.details)
        formData.append("user", post.user);
        formData.append("authorId", post.user.id);


        console.log(formData)

        return http.put(EDIT_POST, formData, {
            headers: header()
        });
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
               age,
               details) {

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
        formData.append("details", details);
        console.log(formData)
        return http.post("/api/posts/createPost", formData, {
            headers: header()
        });
    }
}

export default new PostService();