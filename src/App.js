
import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "./App.css";

import AuthService from "./services/AuthService";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts"
import CreatePost from "./components/createPost/CreatePostPage"
import PostDetails from "./components/postDetails/PostDetails"
import EditPost from "./components/editPost/EditPost"
import BoardAdmin from "./components/AdminBoard/BoardAdmin";
import LostPetsPage from "./components/lostPets/LostPetsPage";
import FoundPetsPage from "./components/foundPets/FoundPetsPage";
import SuccessStoriesPage from "./components/successStories/SuccessStoriesPage";
import EditUser from "./components/editUser/EditUser";
import NavSideBar from "./components/NavSideBar"
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            visible: false
        };

    }

    // toggleUserActions() {
    //     this.setState({
    //         visible: !this.state.visible
    //     });
    // }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }
    reload() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }
    // logOut() {
    //     AuthService.logout();
    // }


    render() {
        const {currentUser, showAdminBoard} = this.state;
        console.log(currentUser)

        return (
            <div>
                <NavSideBar user = {currentUser}/>

                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path={"/animale-pierdute"} component={LostPetsPage}/>
                    <Route exact path={"/animale-găsite"} component={FoundPetsPage}/>
                    <Route exact path={"/istorii-cu-succes"} component={SuccessStoriesPage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/userDetails/:id" component={Profile}/>
                    <Route exact path="/editProfile/:id" component={EditUser}/>
                    <Route path="/myPosts" component={MyPosts}/>
                    <Route path="/createPost" component={CreatePost}/>
                    <Route path="/postDetails/:id" component={PostDetails}/>
                    <Route path="/editPost/:id" component={EditPost}/>
                    <Route path="/deletePost/:id"/>
                    <Route path="/admin" component={BoardAdmin} />
                </Switch>

            </div>
        );
    }
}

export default App;

