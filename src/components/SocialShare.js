import PropTypes from "prop-types";
import React, { Component } from "react";

import {
    Prop, // means Property
    PropPasser, // Pass a single wrapper to each children with prop
    Passers, // Pass the same wrappers to every children components
    //
    share, // share(<P title="prop-passer"/>) instead of manually writing object {title: "prop-passer"}
    P, // The cost of using them is 70 bytes per each.
    //
    copy, // copy, // copy element n times, for placeholders
    repeat, // repeat, // repeat function n times
    key, // alphanumeric with xxxxx form by default, key(n)
    pass, // similar to Passers
} from "prop-passer";

import {
    FacebookShareButton,
    VKShareButton,
    WhatsappShareButton,
    ViberShareButton,
    FacebookIcon,
    VKIcon,
    WhatsappIcon,
    ViberIcon,
    OKShareButton,
    OKIcon,
    TelegramShareButton,
    TelegramIcon
} from "react-share"; // https://github.com/nygardk/react-share/

function wrap(WrappedComponent) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log("old props:", prevProps);
            console.log("new props:", this.props);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return LogProps;
}

const Test = wrap(React.createElement("h1", { title: "what" }, "text"));

export default class SocialShare extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    };

    static defaultProps = {
        title: "",
        url: ""
    };

    render() {
        const { title, url } = this.props;
 console.log(title)
 console.log(url)
        /**
         * What was repeating here?
         *
         * 1. <div className="network">
         * 2. For share buttons shareLink, title and className
         * 3. For Icons size and round attribute
         * 4. For share count url and className
         */

        /**
         * How to reduce code?
         *
         * 1. copy - not repeat same elements or placeholder
         * 2. Pass - When you want to wrtie dynamcially but don't want to wrapper elements.
         *         - key is auto genereated for <li></li> wrapeer elemnts
         * 3. Prop - pass props to children elements without affecting structure.
         * 4. Propasser - Role of Prop and includes parent element.
         * 5. Passers - similar to Pass in this case you include all your code inside return block
         *            - key is auto generated for <li></li> also
         * 6. key - You can make your key with specific length -> key(n)
         *        - You shouldn't use it inside prop part(object) for prop-passer moduels.
         *        - You have to manually pass it to each JSX if you want
         *
         * Note) 1. You have to pass valid React API data for passers
         *       -> https://reactjs.org/docs/react-api.html#createelement
         *       2. You shouldn't use just a string with prop-passer moduels.
         */


        const ShareList = Passers(share(<P
            imageUrl = {title}
            url={url}
            className="network__share-button"
        />))({ className: "network" })("li");


        let original = <h1>will be copied a thousand times</h1>;
        let copyExample = copy(original)(1000);
        let withPass = pass("li")({
        })([
            <span>prop-passer</span>,
            <h1>prop-passer</h1>,
            <h6>prop-passer</h6>,
            <p>prop-passer</p>,
            <p>prop-passer</p>
        ]);
        // console.log(imageUrl)
        return (
            <section className="c-network">
                <ShareList>
                    <FacebookShareButton quote={url} imageUrl={title} >
                        <FacebookIcon
                            size={"2rem"} // You can use rem value instead of numbers
                            round
                        />
                    </FacebookShareButton>


                    <WhatsappShareButton title={title} separator=":: ">
                        <WhatsappIcon size={"2rem"} round />
                    </WhatsappShareButton>

                    <VKShareButton image={`${url}`} windowWidth={660} windowHeight={460}>
                        <VKIcon size={"2rem"} round />
                    </VKShareButton>

                    <OKShareButton quote={url} image={title} >
                        <OKIcon
                            size={"2rem"} // You can use rem value instead of numbers
                            round
                        />
                    </OKShareButton>

                    <TelegramShareButton quote={url} imageUrl={title} >
                        <TelegramIcon
                            size={"2rem"} // You can use rem value instead of numbers
                            round
                        />
                    </TelegramShareButton>
                </ShareList>
            </section>
        );
    }
}
