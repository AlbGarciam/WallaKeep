import React from "react";
import './Home.css';
import Navbar from "../navbar/Navbar";
import SaleSearch from "../sale-search/SaleSearch";
import ContactUs from "../contact-us/ContactUs";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import SaleItemFullScreen from "../sale-item-full-screen/SaleItemFullScreen";
import {signedIn} from "../../services/Util";
import { Route } from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        if (!signedIn()) {
            this.props.history.replace("/");
        }
    }

    render() {
        return <div>
            <div className="App">
                <header className="App-header">
                    <div className="container">
                        <div className="row mt-3">
                            <div className="col-5 logo-text">
                                <h1>Welcome to <b>WallaKeep</b></h1>
                                <h6><i>The place where you can keep everything.</i></h6>
                            </div>
                            <div className="col-5 pr-5">
                                <div className="row">
                                    <div className="container-logo col-8">
                                        <div className="logo-bgr">
                                            <h1><b>WK</b></h1>
                                        </div>
                                    </div>
                                    <div className="logo-end-cover col-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <Navbar />
                <ErrorBoundary>
                    <Route exact path="/home/" component={() => (<div className="container home">
                        <i>What are you looking for? A car? A bicycle? then...</i>
                        <h2>This is your place!</h2>
                    </div>)} />
                    <Route exact path={`${this.props.match.path}/search`} component={SaleSearch} />
                    <Route exact path={`${this.props.match.path}/sale/:id`} component={SaleItemFullScreen}/>
                    <Route exact path={`${this.props.match.path}/contact-us`} component={ContactUs} />
                </ErrorBoundary>
            </div>
        </div>
    }
}
