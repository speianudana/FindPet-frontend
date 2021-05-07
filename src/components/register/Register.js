import React, {Component} from "react";
import {isEmail} from "../shared/validator";
import AuthService from "../../services/AuthService";
import {Link} from "react-router-dom";
import "./Register.css"
import form from "react-validation/build/form";
import swal from "sweetalert";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);


        this.state = {
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            contacts: "",
            userPhoto:null,
            successful: false,
            message: ""
        };
    }
    onChangeUserPhoto = event => {
        this.setState({
            userPhoto: event.target.files[0],
        })
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeContacts(e) {
        this.setState({
            contacts: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        // this.form.validateAll();

        if (this.state.username && this.state.email) {
        // if (this.checkBtn.context._errors.length === 0) {

            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                this.state.address,
                this.state.contacts,
                this.state.userPhoto
            ).then(
                response => {
                    swal("Foarte bine!", "Ai fost înregistrat cu succes!", "success");
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                    this.props.history.push("/login");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }


    render() {
        return (

            <div className="card card-container">
                <form onSubmit={this.handleRegister}
                    // ref={c => {
                    //     this.form = c;
                    // }}
                >
                    <h3>Înregistrare</h3>
                    {!this.state.successful && (
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nume</label>
                                <input type="text" className="form-control" placeholder="Nume"
                                       value={this.state.firstName}
                                       onChange={this.onChangeFirstName}/>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Prenume</label>
                                <input type="text" className="form-control" placeholder="Prenume"
                                       value={this.state.lastName}
                                       onChange={this.onChangeLastName}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Nume de utilizator</label>
                                <input type="text" className="form-control" placeholder="Nume de utilizator"
                                       value={this.state.username}
                                       onChange={this.onChangeUsername}/>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Adresă e-mail</label>
                                <input type="email" className="form-control" placeholder="Adresă e-mail"
                                       value={this.state.email}
                                       onChange={this.onChangeEmail}/>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Parolă</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}/>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Regiune</label>
                                <input type="text" className="form-control" placeholder="Regiune"
                                       value={this.state.address}
                                       onChange={this.onChangeAddress}/>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Contacte</label>
                                <input type="text" className="form-control" placeholder="Contacte"
                                       value={this.state.contacts}
                                       onChange={this.onChangeContacts}/>
                            </div>

                            <div className="form-group col-md-3">
                                <label> Încarcă o fotografie</label>
                                <input type="file" className="form-control"  onChange={this.onChangeUserPhoto} />

                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Înregistrează-te</button>
                            <p className="forgot-password text-right">
                                Deja înregistrat? <Link to={"/login"} className="nav-link">
                                Autentificare
                            </Link></p>
                        </div>)}


                    {this.state.message && (
                        <div className="form-group">
                            <div
                                className={
                                    this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {this.state.message}
                            </div>

                        </div>
                    )}
                    <button
                        style={{display: "none"}}
                        // ref={c => {
                        //     this.checkBtn = c;
                        // }}
                    />

                </form>
            </div>
        );
    }
}

