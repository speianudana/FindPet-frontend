import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import AuthService from "../services/AuthService";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }
  handleEditUser=(userId)=> {
    this.props.history.push(`/editProfile/${[userId]}`);

  }
  async componentDidMount() {
    const user = await UserService.getUserDetails(`${this.props.match.params.id}`);
    this.setState({
      user
    });
    if (!user) this.setState({redirect: "/userDetails/:id"});

    this.setState({currentUser: user, userReady: true})

  }

  isAuthenticatedUser(user) {
    console.log(user)
    const authenticatedUser = AuthService.getCurrentUser();
    let authenticatedUsername;
    if(authenticatedUser){
      authenticatedUsername = authenticatedUser.username;
      let authorUser;
      if (user) {
        authorUser = user.data.username;
      }
      console.log( authorUser)
      console.log( authenticatedUser)
      return authenticatedUsername === authorUser;}
    else {return false;}
  }
  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }
    const currentUser = this.state.currentUser;
    console.log(currentUser)
    return (
        <div>
          <div>
            <Typography variant="h4" align="center" style={{
              fontWeight: 'bold',
              marginTop: '20px'
            }}>Detalii</Typography>
          </div>
          < div
              className="card1 card-container1">
            {
              currentUser.data ? (
                  <div className="row">
                    <div className="col-6 col-sm-4">
                      <CardMedia
                          component="img"
                          image={[currentUser.data.userPhoto]}
                      />
                      {
                        this.isAuthenticatedUser(this.state.currentUser) ? (
                            <div className="col-6 col-sm-3" style={{display: 'inline-block'}}>

                              <Button variant="outlined"
                                      color="primary" style={{marginTop: '10px'}}
                                      onClick={() => { this.handleEditUser(this.state.currentUser.data.id) }}>
                                Editează
                              </Button>
                              {/*<Button variant="outlined"*/}
                              {/*        color="secondary" style={{marginTop: '10px'}} onClick={() => { this.handleDeletePost(currentUser.id) }} >*/}
                              {/*  Șterge*/}
                              {/*</Button>*/}
                            </div>
                        ) : console.log("Is not the owner")
                      }
                    </div>
                    <div className="col-12 col-sm-8">
                      <Typography variant="h4">
                        <Typography>
                          <Typography style={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            fontSize: '20'
                          }}> Nume/Prenume: </Typography>
                          <Typography style={{
                            display: 'inline-block',
                            fontSize: '20'
                          }}>{currentUser.data.firstName} {currentUser.data.lastName}</Typography>

                        </Typography>
                        <Typography variant="h4">
                          <Typography style={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            fontSize: '20'
                          }}> Nume de utilizator: </Typography>
                          <Typography style={{
                            display: 'inline-block',
                            fontSize: '20'
                          }}>{currentUser.data.username}</Typography>
                        </Typography>
                        <Typography variant="h4">
                          <Typography style={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            fontSize: '20'
                          }}> E-mail: </Typography>
                          <Typography style={{
                            display: 'inline-block',
                            fontSize: '20'
                          }}>{currentUser.data.email}</Typography>
                        </Typography>
                        <Typography variant="h4">
                          <Typography
                              style={{
                                display: 'inline-block',
                                fontWeight: 'bold',
                                fontSize: '20'
                              }}> Adresă: </Typography>
                          <Typography style={{
                            display: 'inline-block',
                            fontSize: '20'
                          }}>{currentUser.data.address}</Typography>
                        </Typography>
                        <Typography variant="h4">
                          <Typography style={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            fontSize: '20'
                          }}> Contacts: </Typography><Typography
                            style={{
                              display: 'inline-block',
                              fontSize: '20'
                            }}>{currentUser.data.contacts} </Typography>
                        </Typography>

                      </Typography>
                    </div>
                  </div>
              ) : console.log("There is no data!")
            }
          </div>
        </div>
    )
  }
}
