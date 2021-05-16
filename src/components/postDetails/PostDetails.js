import React, {Component} from "react";
import PostService from "../../services/PostService";
import {Link} from "react-router-dom";
import "./PostDetails.css"
import AuthService from "../../services/AuthService";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';
import ShareForm from "../ShareForm";

export default class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            currentPost: {id: ""},
            postReady: false
        }
    }

    handleEditPost=(postId)=> {
            this.props.history.push(`/editPost/${[postId]}`);

    }

    handleDeletePost=(postId)=> {
        swal({
            title: "Doriți să ștergeți această postare?",
            text: "Nu vei putea reîntoarce postarea!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    PostService.deletePost(`${this.props.match.params.id}`).then(res => {
                            swal("Postarea a fost ștearsă!", {
                                icon: "success",
                            });
                            this.props.history.push("/home");
                        }
                    )
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }

    convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }

        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    async componentDidMount() {
        const post = await PostService.getPostDetails(`${this.props.match.params.id}`);
        this.setState({
            post
        });
        if (!post) this.setState({redirect: "/postDetails:id"});
        this.setState({currentPost: post, userReady: true})

    }

    isAuthor() {
        const authenticatedUser = AuthService.getCurrentUser();
        var authenticatedUsername;
        if(authenticatedUser){
        authenticatedUsername = authenticatedUser.username;
        var authorUser;
        if (this.state.currentPost.data) {
            authorUser = this.state.currentPost.data.user.username;
        }
        return authenticatedUsername === authorUser;}
        else {return false;}
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect}/>
        // }

        const currentPost = this.state.currentPost;
        console.log(currentPost)
        return (
            <div>
                <div>
                    <Typography variant="h4" align="center" style={{
                        fontWeight: 'bold',
                        marginTop: '20px'
                    }}>Detaliile postării</Typography>
                </div>
                < div
                    className="card1 card-container1">
                    {
                        currentPost.data ? (
                            <div className="row">
                                <div className="col-6 col-sm-4">
                                    <CardMedia
                                        component="img"
                                        image={[currentPost.data.petImage]}
                                    />
                                    {
                                        this.isAuthor() ? (
                                            <div className="col-6 col-sm-4" style={{display: 'inline-block'}}>

                                                <Button variant="outlined"
                                                        color="primary" style={{marginTop: '10px'}}
                                                        onClick={() => { this.handleEditPost(this.state.currentPost.data.id) }}>
                                                    Editează
                                                </Button>
                                                <Button variant="outlined"
                                                        color="secondary" style={{marginTop: '10px'}} onClick={() => { this.handleDeletePost(currentPost.id) }} >
                                                    Șterge
                                                </Button>
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
                                            }}> Status:</Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}>{currentPost.data.status}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Specie: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.species}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Culoarea
                                                blănii: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.furColor}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography
                                                style={{
                                                    display: 'inline-block',
                                                    fontWeight: 'bold',
                                                    fontSize: '20'
                                                }}> Rasă: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.breed}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Vârstă: </Typography><Typography
                                            style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.age} ani</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Genul: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.gender}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Culoarea
                                                ochilor: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.eyeColor}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Sterilizat/ă: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.specialSigns ? "Da" : "Nu"}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Semne
                                                speciale: </Typography><Typography style={{
                                            display: 'inline-block',
                                            fontSize: '20'
                                        }}> {currentPost.data.specialSigns}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography
                                                style={{
                                                    display: 'inline-block',
                                                    fontWeight: 'bold',
                                                    fontSize: '20'
                                                }}> Regiune: </Typography><Typography
                                            style={{
                                                display: 'inline-block',
                                                fontSize: '20'
                                            }}> {currentPost.data.address}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Recompensă: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '30'
                                            }}> {currentPost.data.reward} lei</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Detalii: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '30'
                                            }}> {currentPost.data.details}</Typography>
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
                                            }}> {this.convertDate(currentPost.data.createdDate)}</Typography>
                                        </Typography>
                                        <Typography variant="h4">
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontWeight: 'bold',
                                                fontSize: '20'
                                            }}> Autor: </Typography>
                                            <Typography style={{
                                                display: 'inline-block',
                                                fontSize: '30'
                                            }} ><Link to={`/userDetails/${currentPost.data.user.id}`}>{currentPost.data.user.firstName} {currentPost.data.user.lastName}</Link></Typography>

                                        </Typography>
                                    </Typography>
                                   <ShareForm post = {currentPost}/>
                                </div>
                            </div>
                        ) : console.log("There is no data!")
                    }
                </div>
                <div>
                    <Typography variant="h4" align="center" style={{
                        fontWeight: 'bold',
                        marginTop: '20px'
                    }}>Postări similare</Typography>
                </div>
                < div className="card1 card-container1">
                    Here must be similar posts
                </div>
            </div>
        )
    }
}


