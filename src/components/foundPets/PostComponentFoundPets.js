import React from "react";
import PostService from '../../services/PostService';
import PostCard from "../PostCard";
import Pagination from "../Pagination";
import Grid from "@material-ui/core/Grid";

class PostComponentFoundPets extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            allPosts: [],
            currentPosts: [],
            currentPage: null,
            totalPages: null
        }
    }

    componentDidMount() {
        PostService.getFoundPetsPosts().then((response) => {
            this.setState({allPosts: response.data})

        });
        const allPosts = this.state.allPosts;
    }

    onPageChanged = data => {
        const {allPosts} = this.state;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentPosts = allPosts.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentPosts, totalPages});
    };

    render() {

        const {
            allPosts,
            currentPosts,
            currentPage,
            totalPages
        } = this.state;
        const totalPosts = allPosts.length;

        if (totalPosts === 0) return null;

        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();

        return (
                <div className="container mb-5">
                    <h3> Animale de companie găsite</h3>
                    <div className="row d-flex flex-row py-5">
                        <div
                            className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <h2 className={headerClass}>
                                    <strong className="text-secondary">{totalPosts}</strong>{" "}
                                    Animale găsite
                                </h2>
                                {currentPage && (
                                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Pagina <span className="font-weight-bold">{currentPage}</span> /{" "}
                                        <span className="font-weight-bold">{totalPages}</span>
                </span>
                                )}
                            </div>
                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination
                                    totalRecords={totalPosts}
                                    pageLimit={12}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}
                                />
                            </div>

                        </div>
                        <Grid container spacing={1}>
                            {currentPosts.map(post => (
                                <Grid item xs={3}>
                                    <PostCard key={post.id} post={post}/>
                                </Grid>
                            ))}
                        </Grid>

                    </div>

                </div>


        );
    }
}

export default PostComponentFoundPets