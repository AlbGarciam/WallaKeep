import React from "react";
import './SaleSearch.css'
import SaleService from "../../services/SaleService";
import SaleItem from "../sale-item/SaleItem";
import { signedIn, currentUser } from "../../services/Util";
import { thisExpression } from "@babel/types";

const service = new SaleService();

export default class SaleSearch extends React.Component {
    constructor(props) {
        super(props);

        const user = currentUser();

        const initialSearch  = user.tag ? {tag: user.tag} : {};
        this.state = {
            search: initialSearch
        };

        this.search();

        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);

        // Retrieve the tags needed to filter sales
        // 1. Este servicio como el <select> que hay en el render se pueden sustituir por el componente <Tags>
        // 1. Para más información de como se usa ver el componente SignIn
        service.getTags().then((res) => {
            if (res.ok) {
                this.setState({
                    tags: res.allowedTags
                })
            }
        });
    }

    componentDidMount() {
        if (!signedIn()) {
            this.props.history.replace("/");
        }
    }

    search() {
        service.getSales(this.state.search).then(res => {
            if (res.adverts) {
                this.setState({
                    sales: res.adverts
                });
            }
        });
    }

    handleSearch(event) {
        const {name, value} = event.target;
        var newSearch = this.state.search;
        newSearch[name] = value.trim().length ? value.trim() : null;
        this.setState({
            search: newSearch
        }, () => {
            this.search();
        });

    }

    render() {
        return (
            <div className={`sale-search container`}>
                <div className="row mb-3">
                    <input name="name" onChange={this.handleSearch} className={`form-control col-2 ml-4`} placeholder={`Filter by name`}/>
                    <input name="price" type="number" onChange={this.handleSearch} className={`form-control col-1 ml-4`} placeholder={`Price`}/>
                    {
                        this.state.tags
                        &&
                        <select name="tag" value={this.state.search.tag} onChange={this.handleSearch} className={`form-control col-2 ml-4`}>
                            <option value="">Filter by tag</option>
                            {this.state.tags.map((tag, index) => <option key={`${tag}-${index}`} value={tag}>{tag}</option>)}
                        </select>
                    }
                </div>

                {
                    ((this.state.sales && !this.state.sales.length) || !this.state.sales)
                    &&
                    <div className="text-center">
                        <h2>No se han encontrado elementos</h2>
                    </div>
                }
                {
                    this.state.sales
                    &&
                    (
                        <div className="row">
                            {
                                this.state.sales.map((sale, index) => {
                                    return (
                                        <div key={sale.cuid} className="col-4" onClick={() => this.props.history.push(`/home/sale/${sale.cuid}`)}>
                                            <SaleItem item={sale}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}
