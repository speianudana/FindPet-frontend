import React, { Component } from "react";
import SocialShare from "./SocialShare";
import ShareCSS from "./CSS/ShareCSS";

// Refer) https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

class ShareForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Steadylearner Demo Placeholder Image",
            url: "https://avatars0.githubusercontent.com/u/32325099?s=460&v=4",

        };
    }

    render() {
        console.log(this.props);
        let url = "http://findmypet.azurewebsites.net/postDetails/" + this.props.post.data.id;
        let  title  = this.props.post.data.petImage;

        console.log({url})
        console.log({title})
        console.log(url)
        /**
         * You don't have to use handleChange, handleBlur
         * and handleSubmit by using Formik and Field.
         */

        return (
            <section>
                <ShareCSS>
                    <div style={{ border: "1px" }}>
                        <SocialShare title={title} url={url} />
                    </div>
                </ShareCSS>
            </section>
        );
    }
}

export default ShareForm;
