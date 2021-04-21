import React, {Component} from "react";
import PostService from "../../services/PostService";
import "./CreatePostPage.css"
import form from "react-validation/build/form";
import dogBreeds from "../../constants/Breeds"
import swal from "sweetalert";

export default class CreatePostPage extends Component {
    constructor(props) {
        super(props);
        this.handlePostCreation = this.handlePostCreation.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContacts = this.onChangeContacts.bind(this);
        this.onChangeSterilization = this.onChangeSterilization.bind(this);
        this.onChangeFurColor = this.onChangeFurColor.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBreed = this.onChangeBreed.bind(this);
        this.onChangeEyeColor = this.onChangeEyeColor.bind(this);
        this.onChangeSpecialSigns = this.onChangeSpecialSigns.bind(this);
        this.onChangeReward = this.onChangeReward.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);


        this.state = {
            petImage: null,
            status: "Pierdut",
            species: "Câine",
            sterilization: true,
            furColor: "",
            address: "",
            contacts: "",
            gender: "Nu știu",
            breed: "Nu știu",
            eyeColor: "",
            specialSigns: "",
            reward: "",
            age: "",
            successful: false,
            message: ""
        };
    }


    handleChange = (e) => {
        const { target: { name: fieldName, value }} = e;
        this.setState({
            [fieldName]: value
        })
    }

    onChangePetImage = event => {
        this.setState({
            petImage: event.target.files[0],
        })
    }

    onChangeSterilization(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onChangeFurColor(e) {
        this.setState({
            furColor: e.target.value
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

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeBreed(e) {
        this.setState({
            breed: e.target.value
        });
    }

    onChangeEyeColor(e) {
        this.setState({
            eyeColor: e.target.value
        });
    }

    onChangeSpecialSigns(e) {
        this.setState({
            specialSigns: e.target.value
        });
    }

    onChangeReward(e) {
        this.setState({
            reward: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    handlePostCreation(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

            PostService.createPost(
                this.state.petImage,
                this.state.status,
                this.state.species,
                this.state.sterilization,
                this.state.furColor,
                this.state.address,
                this.state.contacts,
                this.state.gender,
                this.state.breed,
                this.state.eyeColor,
                this.state.specialSigns,
                this.state.reward,
                this.state.age
            ).then(

                response => {
                    swal("Foarte bine!","Postarea a fost creată!", {
                        icon: "success",
                    });
                    this.props.history.push("/home");
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    console.log(error);
                    swal("Oops!","Postarea NU a fost creată!", {
                        icon: "error",
                    });
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


    render() {
        return (

            <div className="card card-container">
                <form onSubmit={this.handlePostCreation}
                    // ref={c => {
                    //     this.form = c;
                    // }}
                >
                    <h3>Creează o postare</h3>
                    {!this.state.successful && (
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label>
                                    Status </label>

                                <select value={this.state.status} className="form-control"
                                        onChange={this.handleChange} name="status">
                                    <option value="Pierdut">Pierdut</option>
                                    <option value="Găsit">Găsit</option>
                                </select>
                            </div>

                            <div className="form-group col-md-2">
                                <label>
                                    Specie </label>

                                <select value={this.state.species} className="form-control"
                                        onChange={this.handleChange} name="species">
                                    <option value="Câine">Câine</option>
                                    <option value="Pisică">Pisică</option>
                                </select>
                            </div>

                            <div className="form-group col-md-2">
                                <label>
                                    Genul </label>

                                <select value={this.state.gender} className="form-control"
                                        onChange={this.onChangeGender}>
                                    <option value="Nu știu">Nu știu</option>
                                    <option value="Feminin">Feminin</option>
                                    <option value="Masculin">Masculin</option>


                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label>
                                    Rasă </label>

                                <select value={this.state.breed}  className="form-control"
                                        onChange={this.onChangeBreed}>
                                    {dogBreeds.map((option) => (
                                        <option value={option.value}>{option.show}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label>
                                    Culoarea blănii</label>
                                <input type="text" className="form-control" placeholder="Culoarea blănii"
                                       value={this.state.furColor}
                                       onChange={this.onChangeFurColor}/>

                            </div>

                            <div className="form-group col-md-6">
                                <label>Culoarea ochilor</label>
                                <input type="text" className="form-control" placeholder="Culoarea ochilor"
                                       value={this.state.eyeColor}
                                       onChange={this.onChangeEyeColor}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Semne speciale</label>
                                <input type="text" className="form-control" placeholder="Semne speciale"
                                       value={this.state.specialSigns}
                                       onChange={this.onChangeSpecialSigns}/>
                            </div>


                            <div className="form-group col-md-6">
                                <label>Recompensă</label>
                                <input type="text" className="form-control" placeholder="Suma (Lei)"
                                       value={this.state.reward}
                                       onChange={this.onChangeReward}/>

                            </div>

                            <div className="form-group col-md-6">
                                <label>Vârsta</label>
                                <input type="text" className="form-control" placeholder="Vârsta"
                                       value={this.state.age}
                                       onChange={this.onChangeAge}/>
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
                            <div className="form-group col-md-2">
                                <label> Sterilizat/ă </label>

                                <input className="form-control" type="checkbox" checked={this.state.sterilization} onChange={this.onChangeSterilization} id="flexCheckDefault"/>
                            </div>

                            <div className="form-group col-md-3">
                                <label> Încarcă o fotografie</label>
                                {/*<input type="file" className="custom-file-input"*/}
                                {/*       value={this.state.petImage}*/}
                                {/*       onChange={this.onChangePetImage}/>*/}
                                <input type="file" className="form-control"  onChange={this.onChangePetImage} />

                            </div>
                            {/*<div className="form-group col-md-3">*/}
                            {/*    <label> Încarcă o fotografie</label>*/}
                            {/*    <div className="custom-file">*/}
                            {/*        /!*<label className="custom-file-label" htmlFor="inputGroupFile04">Choose*!/*/}
                            {/*        /!*    file</label>*!/*/}
                            {/*        <input type="file" className="custom-file-input" id="inputGroupFile04"*/}
                            {/*               value={this.state.petImage} onChange={this.onChangePetImage}/>*/}

                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<input type="file" className="form-control" name="upload_file" onChange={this.onChangePetImage} />*/}
                            <button type="submit" className="btn btn-primary btn-block">Salvează postarea</button>
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

