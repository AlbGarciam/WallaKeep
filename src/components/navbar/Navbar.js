import {Link, withRouter} from "react-router-dom";
import React from "react";
import './Navbar.css';
import {currentUser, signedIn, logout} from "../../services/Util";

// ESTE FICHERO NO HAY QUE TOCARLO

const HOME_PATH = "/home/";
const SEARCH_PATH = "/home/search";
const CONTACT_US_PATH = "/home/contact-us";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location.pathname
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (!signedIn()) {
            this.props.history.replace("/");
        }
    }

    logout() {
        logout();
        this.props.history.push("/sign-in")
    }

    isActive(path) {
        return this.props.location.pathname.toLowerCase() === path ? "active" : "";
    }

    render() {
        return (
            <div className="container">
                <span className={`nav-bar-link ${this.isActive(HOME_PATH)}`}><
                    Link to={HOME_PATH}> Home </Link>
                </span>
                <span className={`nav-bar-link ${this.isActive(SEARCH_PATH)}`}>
                    <Link to={SEARCH_PATH}> Search </Link>
                </span>
                <span className={`nav-bar-link ${this.isActive(CONTACT_US_PATH)}`}>
                    <Link to={CONTACT_US_PATH}> Contact us </Link>
                </span>
                <span className={`nav-bar-link float-right`} onClick={this.logout}>
                    {currentUser() && <h5 className={`user-info`}>{currentUser().name} {currentUser().surname}</h5>}
                    <span>Log out</span>
                </span>
            </div>
        );
    }
}

export default withRouter(Navbar);
