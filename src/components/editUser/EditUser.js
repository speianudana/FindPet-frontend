import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import PostService from "../../services/PostService";
import UserService from "../../services/UserService";
import dogBreeds from "../../constants/Breeds"
import swal from 'sweetalert'
import NavSideBar from "../NavSideBar";

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {

            imageChanged: false,
            user: {
                userPhoto: null,
                username: "",
                lastName: "",
                firstName: "",
                email: "",
                address: "",
                contacts: "",
                successful: false,
                message: ""
            },
            copyUser: {
                userPhoto: null,
                username: "",
                lastName: "",
                firstName: "",
                email: "",
                address: "",
                contacts: "",
                successful: false,
                message: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeUserPhoto = this.onChangeUserPhoto.bind(this);
    }

    handleChange(user) {
        const {name, value} = user.target;
        const {copyUser} = this.state;
        this.setState({
            copyUser: {
                ...copyUser,
                [name]: value  //see
            }
        });
    }

    onChangeUserPhoto(user) {
        const {copyUser} = this.state;

        this.setState({
            imageChanged: true,
            copyUser: {
                ...copyUser,
                userPhoto: user.target.files[0],

            }
        });

    };

    handleSubmit(e) {
        e.preventDefault();
        // if (!this.state.imageChanged) {this.state.copyUser.petImage = this.state.user.petImage;}
        console.log(this.state.copyUser.userPhoto)
        console.log(this.state.imageChanged)


        if (this.state.imageChanged) {
            UserService.editUser(this.state.copyUser)

                .then(response => {
                    swal("Foarte bine!", "Profilul a fost editat!", "success");
                    this.props.history.push("/home");

                    // this.props.history.push('/userDetails/${currentPost.data.user.id});


                })
                .catch(error => {
                    swal("Oops!", "Profilul nu a fost editat!", "error");

                })
        } else {
            UserService.editUserWithoutImage(this.state.copyUser)

                .then(response => {
                    swal("Foarte bine!", "Profilul a fost editat!", "success");
                    this.props.history.push("/home");

                })
                .catch(error => {
                    swal("Oops!", "Profilul nu a fost editat!", "error");

                })
        }
    }

async componentDidMount()
{
    UserService.getUserDetails(`${this.props.match.params.id}`).then(response => {
        this.setState({user: response.data});
    });
    UserService.getUserDetails(`${this.props.match.params.id}`).then(response => {
        this.setState({copyUser: response.data});
    });
}

render()
{
    const {copyUser} = this.state;
    const {user} = this.state;
    // console.log(user)
    // console.log(copyUser)
    return (
        <div>
            <div>
                <Typography variant="h4" align="center" style={{
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}>Editează profilul</Typography>
            </div>
            < div
                className="card1 card-container1">
                {
                    (user && copyUser) ? (
                        <div className="form-row">
                            <div className=" form-group col-6 col-sm-4">
                                <CardMedia
                                    component="img"
                                    image={[user.userPhoto]}
                                />
                                <label> Schimbă fotografia</label>
                                <input type="file" className="form-control-file"
                                    // value={copyUser.petImage}
                                       onChange={this.onChangeUserPhoto}
                                       name="userPhoto"
                                />
                            </div>
                            <div className="col-12 col-sm-8">
                                <Typography variant="h4">

                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Nume: </Typography>
                                    </Typography>
                                    <input defaultValue={copyUser.firstName} type="text"
                                           className="form-control" placeholder="Nume"
                                           value={copyUser.firstName}
                                           onChange={this.handleChange}
                                           name="firstName"/>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Prenume: </Typography>
                                    </Typography>
                                    <input defaultValue={copyUser.lastName} type="text"
                                           className="form-control" placeholder="Prenume"
                                           value={copyUser.lastName}
                                           onChange={this.handleChange}
                                           name="lastName"/>

                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Nume de utilizator: </Typography>
                                        <input defaultValue={copyUser.username}
                                               type="text" className="form-control"
                                               placeholder="Nume de utilizator"
                                               value={copyUser.username}
                                               onChange={this.handleChange}
                                               name="username"/>
                                    </Typography>

                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> E-mail: </Typography>
                                        <input defaultValue={copyUser.email} type="text"
                                               className="form-control" placeholder="E-mail"
                                               value={copyUser.email}
                                               onChange={this.handleChange}
                                               name="email"/>
                                    </Typography>

                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Adresă: </Typography>
                                        <input defaultValue={copyUser.address} type="text"
                                               className="form-control" placeholder="Adresă"
                                               value={copyUser.address}
                                               onChange={this.handleChange}
                                               name="address"/>
                                    </Typography>

                                    <Typography variant="h4">
                                        <Typography
                                            style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Contacts: </Typography>
                                        <input defaultValue={copyUser.contacts} type="text"
                                               className="form-control"
                                               value={copyUser.contacts}
                                               onChange={this.handleChange}
                                               name="contacts"
                                               placeholder="Contacte"/>
                                    </Typography>
                                </Typography>
                            </div>
                        </div>
                    ) : console.log("There is no data!")
                }
                <button type="submit" className="btn btn-primary btn-block" onClick={
                    this.handleSubmit
                }>Salvează schimbările
                </button>

            </div>
        </div>
    )
}
}