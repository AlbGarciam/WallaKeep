import React from "react";
import './ContactUs.css';
import { getSavedMessages, saveMessages, signedIn } from "../../services/Util";
import ContactUsForm from "../contact-us-form/ContactUsForm";
import MyMessages from "../my-messages/MyMessages";
import MyMessagesContext from "../my-messages/MyMessagesContext";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: getSavedMessages()
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!signedIn()) {
            this.props.history.replace("/");
        }
    }

    onSubmit(message) {
        const { messages } = this.state;

        messages.push(message);

        this.setState({ messages }, () => {
            saveMessages(this.state.messages);
        });
    }

    render() {
        return (
            <div className={`contact-us container`}>
                <div className="row">
                    <div className="col-6">
                        <ContactUsForm onSubmit={this.onSubmit} />
                    </div>
                    <div className="col-6 text-center">
                        <MyMessagesContext.Provider value={this.state.messages}>
                            <MyMessages />
                        </MyMessagesContext.Provider>
                    </div>
                </div>
            </div>
        );
    }
}
