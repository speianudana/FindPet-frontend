// import React, {useState} from 'react';
// import './App.css';
// // import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// // import Home from './pages/Home';
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
//           {/*<ProtectedRoute path={'/profile'} component={MyProfile}/>*/}
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
import Home from "./pages/Home";
import Profile from "./components/profile.component";
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
        return (
            <div>
                <Navbar className="color-nav">
                    <Link to={"/"} className="navbar-brand">
                        <img src="LOGO1.png"/>
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                <h5>Acasă</h5>
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
                                    <h5>Postările mele</h5>
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/createPost"} className="nav-link">
                                    <h5>Creează o postare</h5>
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
                                    <DropdownItem tag={Link} to={"/profile"}>
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
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profile" component={Profile}/>
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

