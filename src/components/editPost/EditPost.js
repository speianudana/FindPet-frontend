import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import PostService from "../../services/PostService";
import {Redirect} from "react-router-dom";
import convertDate from "../postDetails/PostDetails"
import dogBreeds from "../../constants/Breeds"
import swal from 'sweetalert'

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        // this.onChangeAddress = this.onChangeAddress.bind(this);
        // this.onChangeContacts = this.onChangeContacts.bind(this);
        // this.onChangeSterilization = this.onChangeSterilization.bind(this);
        // this.onChangeFurColor = this.onChangeFurColor.bind(this);
        // this.onChangeGender = this.onChangeGender.bind(this);
        // this.onChangeBreed = this.onChangeBreed.bind(this);
        // this.onChangeEyeColor = this.onChangeEyeColor.bind(this);
        // this.onChangeSpecialSigns = this.onChangeSpecialSigns.bind(this);
        // this.onChangeReward = this.onChangeReward.bind(this);
        // this.onChangeAge = this.onChangeAge.bind(this);
        this.state = {
            // redirect: null,
            // currentPost: {id: ""},
            imageChanged: false,
            post: {
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
                details: "",
                successful: false,
                message: ""
            },
            copyPost: {
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
                details: "",
                successful: false,
                message: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSterilization = this.onChangeSterilization.bind(this);
        this.onChangePetImage = this.onChangePetImage.bind(this);
    }

    handleChange(post) {
        const {name, value} = post.target;
        const {copyPost} = this.state;
        this.setState({
            copyPost: {
                ...copyPost,
                [name]: value  //see
            }
        });
    }

    onChangePetImage(post) {
        const {name, value} = post.target;

        const {copyPost} = this.state;

        this.setState({
            imageChanged: true,
            copyPost: {
                ...copyPost,
                petImage: post.target.files[0],

            }
        });

    };

    handleSubmit(e) {
        e.preventDefault();
        // if (!this.state.imageChanged) {this.state.copyPost.petImage = this.state.post.petImage;}
        console.log(this.state.copyPost.petImage)
        console.log(this.state.imageChanged)


        if (this.state.imageChanged) {
            PostService.editPost(this.state.copyPost)

                .then(response => {
                    swal("Foarte bine!", "Postarea a fost editată!", "success");
                    this.props.history.push("/home");

                })
                .catch(error => {
                    swal("Oops!", "Postarea nu a fost editată!", "error");

                })
        } else {
            PostService.editPostWithoutImage(this.state.copyPost)

                .then(response => {
                    swal("Foarte bine!", "Postarea a fost editată!", "success");
                    this.props.history.push("/home");

                })
                .catch(error => {
                    swal("Oops!", "Postarea nu a fost editată!", "error");

                })
        }
    }


convertDate(inputFormat)
{
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}


onChangeSterilization(e)
{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
}

async
componentDidMount()
{
    PostService.getPostDetails(`${this.props.match.params.id}`).then(response => {
        this.setState({post: response.data});
    });
    PostService.getPostDetails(`${this.props.match.params.id}`).then(response => {
        this.setState({copyPost: response.data});
    });
}

render()
{
    const {copyPost} = this.state;
    const {post} = this.state;
    // console.log(post)
    // console.log(copyPost)
    return (
        <div>
            <div>
                <Typography variant="h4" align="center" style={{
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}>Editează postarea</Typography>
            </div>
            < div
                className="card1 card-container1">
                {
                    (post && copyPost) ? (
                        <div className="form-row">
                            <div className=" form-group col-6 col-sm-4">
                                <CardMedia
                                    component="img"
                                    image={[post.petImage]}
                                />
                                <label> Schimbă fotografia</label>
                                <input type="file" className="form-control-file"
                                    // value={copyPost.petImage}
                                       onChange={this.onChangePetImage}
                                       name="petImage"
                                />
                            </div>
                            <div className="col-12 col-sm-8">
                                <Typography variant="h4">
                                    <Typography>
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Status:</Typography>
                                        <select defaultValue={copyPost.status} value={copyPost.status}
                                                className="form-control"
                                                onChange={this.handleChange} name="status">
                                            <option value="Pierdut">Pierdut</option>
                                            <option value="Gasit">Găsit</option>
                                            <option value="Ajuns acasa">Ajuns acasă</option>

                                        </select>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Specie: </Typography>
                                        <select defaultValue={copyPost.species} value={copyPost.species}
                                                className="form-control"
                                                onChange={this.handleChange} name="species">
                                            <option value="Caine">Câine</option>
                                            <option value="Pisica">Pisică</option>
                                        </select>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Culoarea
                                            blănii: </Typography>
                                    </Typography>
                                    <input defaultValue={copyPost.furColor} type="text"
                                           className="form-control" placeholder="Culoarea blănii"
                                           value={copyPost.furColor}
                                           onChange={this.handleChange}
                                           name="furColor"/>
                                    <Typography variant="h4">
                                        <Typography
                                            style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Rasă: </Typography>

                                        <select defaultValue={copyPost.breed}
                                                value={copyPost.breed}
                                                className="form-control"
                                                onChange={this.handleChange}
                                                name="breed">
                                            {dogBreeds.map((option) => (
                                                <option value={option.value}>{option.show}</option>
                                            ))}
                                        </select>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Vârstă: </Typography>
                                        <input defaultValue={copyPost.age}
                                               type="text" className="form-control"
                                               placeholder="Vârsta"
                                               value={copyPost.age}
                                               onChange={this.handleChange}
                                               name="age"/>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Genul: </Typography>
                                        <select defaultValue={copyPost.gender} value={copyPost.gender}
                                                className="form-control"
                                                onChange={this.handleChange} name="gender">
                                            <option value="Nu știu">Nu știu</option>
                                            <option value="Feminin">Feminin</option>
                                            <option value="Masculin">Masculin</option>


                                        </select>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Culoarea
                                            ochilor: </Typography>
                                        <input defaultValue={copyPost.eyeColor} type="text"
                                               className="form-control" placeholder="Culoarea ochilor"
                                               value={copyPost.eyeColor}
                                               onChange={this.handleChange}
                                               name="eyeColor"/>
                                    </Typography>

                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Detalii: </Typography>
                                        <input defaultValue={copyPost.details} type="text"
                                               className="form-control" placeholder="Detalii"
                                               value={copyPost.details}
                                               onChange={this.handleChange}
                                               name="details"/>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Sterilizat/ă: </Typography>
                                        <input defaultValue={copyPost.sterilization} className="form-control"
                                               type="checkbox" name="sterilization"
                                               checked={copyPost.sterilization}
                                               onChange={this.onChangeSterilization} id="flexCheckDefault"/>

                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Semne
                                            speciale: </Typography>
                                        <input defaultValue={copyPost.specialSigns} type="text"
                                               className="form-control" placeholder="Semne speciale"
                                               value={copyPost.specialSigns}
                                               onChange={this.handleChange}
                                               name="specialSigns"/>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography
                                            style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Regiune: </Typography>
                                        <input defaultValue={copyPost.address} type="text"
                                               className="form-control"
                                               value={post.address}
                                               onChange={this.handleChange}
                                               name="address"
                                               placeholder="Regiunea"/>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Recompensă: </Typography>
                                        <input defaultValue={copyPost.reward}
                                               type="text" className="form-control"
                                               value={copyPost.reward}
                                               onChange={this.handleChange}
                                               name="reward"
                                               placeholder="Recompensă"/>
                                    </Typography>
                                    <Typography variant="h4">
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            fontSize: '20'
                                        }}> Data creării postării: </Typography>
                                        <Typography style={{
                                            display: 'inline-block',
                                            fontSize: '30'
                                        }}>{this.convertDate(post.createdDate)}</Typography>
                                    </Typography>
                                </Typography>
                            </div>
                        </div>
                    ) : console.log("There is no data!")
                }
                <button type="submit" className="btn btn-primary btn-block" onClick={
                    this.handleSubmit
                }>Salvează postarea
                </button>

            </div>
        </div>
    )
}
}