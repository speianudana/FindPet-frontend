// import React, {useState} from 'react';
// import './App.css';
// // import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// // import SuccessStoriesPage from './pages/SuccessStoriesPage';
// // import Reports from './pages/Reports';
// // import Products from './pages/Products';
// import Login from './components/login/Login';
// import Registration from './components/registration/RegisterPage';
//
// function App() {
//
//
//   return (
//       <Router>
//
//         <div>
//           <Route exact path="/" component={Login}/>
//           <Route path='/registration' component={Registration}/>
//
//           {/*<Route path='/registration' component={Registration}/>*/}
//           {/*<Route path='/dashboard' component={Dashboard}/>*/}
//           {/*<ProtectedRoute path={'/profile'} component={Profile}/>*/}
//           {/*<ProtectedRoute path={'/create'} component={NewEvent}/>*/}
//           {/*<ProtectedRoute path={'/eventdetails'} component={EventDetails}/>*/}
//           {/*<ProtectedRoute path={'/myevents'} component={MyEvents}/>*/}
//           {/*<ProtectedRoute path={'/editevent'} component={EditEvent}/>*/}
//
//         </div>
//
//       </Router>
//   );
// }
//
// export default App;

import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "./App.css";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink
} from "shards-react";
import AuthService from "./services/AuthService";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/board-user.component";
import MyPosts from "./components/MyPosts"
import CreatePost from "./components/createPost/CreatePostPage"
import PostDetails from "./components/postDetails/PostDetails"
import EditPost from "./components/editPost/EditPost"
import BoardAdmin from "./components/board-admin.component";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Navbar} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import LostPetsPage from "./components/lostPets/LostPetsPage";
import FoundPetsPage from "./components/foundPets/FoundPetsPage";
import SuccessStoriesPage from "./components/successStories/SuccessStoriesPage";
import EditUser from "./components/editUser/EditUser";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            visible: false
        };

        this.toggleUserActions = this.toggleUserActions.bind(this);
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible
        });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }


    render() {
        const {currentUser, showAdminBoard} = this.state;
        console.log(currentUser)

        return (
            <div>
                <Navbar className="color-nav">
                    <Link to={"/"} className="navbar-brand">
                        <img src="LOGO1.png"/>
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                <h6>Acasă</h6>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/animale-pierdute"} className="nav-link">
                                <h6>Animale pierdute</h6>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/animale-găsite"} className="nav-link">
                                <h6>Animale găsite</h6>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/istorii-cu-suces"} className="nav-link">
                                <h6>Istorii de success</h6>
                            </Link>
                        </li>
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/myPosts"} className="nav-link">
                                    <h6>Postările mele</h6>
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/createPost"} className="nav-link">
                                    <h6>Creează o postare</h6>
                                </Link>
                            </li>
                        )}

                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            {/*<li className="nav-item">*/}
                            {/*    <Link to={"/profile"} className="nav-link">*/}
                            {/*        {currentUser.username}*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                                <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                                    <img
                                        className="user-avatar rounded-circle mr-2"
                                        // src="https://t4.ftcdn.net/jpg/01/22/26/41/240_F_122264106_LT3eZSVPB3AJSvj0cEkmrG2FMntQHaPS.jpg"
                                        src={currentUser.userPhoto}
                                        alt="User Avatar"
                                    />{" "}
                                    {/*<Avatar style={{ display: 'inline-block'}}*/}
                                    {/*    className="avatar"*/}
                                    {/*    src="https://t4.ftcdn.net/jpg/01/22/26/41/240_F_122264106_LT3eZSVPB3AJSvj0cEkmrG2FMntQHaPS.jpg"*/}
                                    {/*/>*/}
                                    <span style={{ display: 'inline-block'}} className="d-none d-md-inline-block">{currentUser.username}</span>

                                </DropdownToggle>
                                <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                                    <DropdownItem tag={Link} to={`/userDetails/${currentUser.id}`}>
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="text-danger">
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Logout
                                            </a>
                                        </li>
                                    </DropdownItem>
                                </Collapse>
                            </NavItem>
                        </div>
                    ) : (


                        <div className="navbar-nav ml-auto">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </Navbar>


                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path={"/animale-pierdute"} component={LostPetsPage}/>
                    <Route exact path={"/animale-găsite"} component={FoundPetsPage}/>
                    <Route exact path={"/istorii-cu-suces"} component={SuccessStoriesPage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/userDetails/:id" component={Profile}/>
                    <Route exact path="/editProfile/:id" component={EditUser}/>
                    <Route path="/user" component={BoardUser}/>
                    <Route path="/myPosts" component={MyPosts}/>
                    <Route path="/createPost" component={CreatePost}/>
                    <Route path="/postDetails/:id" component={PostDetails}/>
                    <Route path="/editPost/:id" component={EditPost}/>
                    <Route path="/deletePost/:id"/>
                    {/*<Route path="/admin" component={BoardAdmin} />*/}
                </Switch>

            </div>
        );
    }
}

export default App;

