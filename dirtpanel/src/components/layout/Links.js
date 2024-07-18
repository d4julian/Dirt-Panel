import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { subscribe } from 'redux-subscriber';

import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { serversDirty } from '../../actions/navActions';
import ProtectedContent from '../ProtectedContent';


class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            servers: [],
        };

        const unsubscribe = subscribe('nav.serversDirty', state => {
            if(state.nav.serversDirty) {
                this.getServers();
            }
        });

        this.unsubscribe = unsubscribe.bind(this);
    }

    getServers() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}servers/getAll`, {
            params: {
                token: this.props.token
            }
        }).then(response => {
            this.props.markServersClean();
            this.setState({
                servers: response.data.servers
            });
        }).catch(error => {
            if(error.response.status === 401) this.setState({redirect: true})
        });
    }

    componentDidMount() {
        this.getServers();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if(!this.props.authenticated || this.state.redirect) return(<Redirect to='/redirects/login' />);
        return (
            <ul className="nav-main nav-main-hover">
                {/*
                <li className="nav-main-item">
                    <NavLink to="/dashboard/" className="nav-main-link"><i className="nav-main-link-icon fas fa-th"></i>Dashboard</NavLink>
                </li>
                */}
                <li className="nav-main-item">
                    <NavLink to="/servers/list/" className="nav-main-link"><i className="nav-main-link-icon fas fa-list"></i> Server List</NavLink>
                </li>
                <li className="nav-main-item">
                    <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu" aria-expanded="false" href="#/">
                        <i className="nav-main-link-icon fas fa-server"></i> Servers
                    </a>
                    <ul className="nav-main-submenu">
                        <li className="nav-main-item">
                            {
                                this.state.servers.map(server =>
                                    <ServersDropdownElement key={server.id} server={server}/>
                                )
                            }
                        </li>
                    </ul>
                </li>
                {/*
                <li className="nav-main-item">
                    <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu">
                        <i className="nav-main-link-icon fas fa-university"/> Sanctions Center
                    </a>
                    <ul className="nav-main-submenu">
                        <li className="nav-main-item">
                            <NavLink to="/sanctions/submit" className="nav-main-link"><i className="nav-main-link-icon fas fa-edit"/> Submission Desk</NavLink>
                        </li>
                        <li className="nav-main-item">
                            <NavLink to="/sanctions/database" className="nav-main-link"><i className="nav-main-link-icon fas fa-gavel"/> Records Library</NavLink>
                        </li>
                    </ul>
                </li>
                <li className="nav-main-item">
                    <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu" aria-haspopup="true" aria-expanded="false">
                        <i className="nav-main-link-icon fas fa-archive" /> Archives
                    </a>
                    <ul className="nav-main-submenu">
                        <li className="nav-main-item">
                            <NavLink to="/archives/tickets/" className="nav-main-link"><i className="nav-main-link-icon fas fa-ticket-alt"></i> Ticket Archive</NavLink>
                        </li>
                        <li className="nav-main-item">
                            <NavLink to="/archives/appeals" className="nav-main-link"><i className="nav-main-link-icon fas fa-balance-scale-right"></i> Appeal Archive</NavLink>
                        </li>
                    </ul>
                </li>
                <li className="nav-main-item">
                    <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu" aria-haspopup="true" aria-expanded="false">
                        <i className="nav-main-link-icon fas fa-code" /> Developer Center
                    </a>
                    <ul className="nav-main-submenu">
                        <li className="nav-main-item">
                            <a className="nav-main-link"><i className="nav-main-link-icon fas fa-robot"></i> DirtBot</a>
                        </li>
                    </ul>
                </li>
                <li className="nav-main-item">
                    <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu" aria-haspopup="true" aria-expanded="false">
                        <i className="nav-main-link-icon fab fa-superpowers" /> Manager Center
                    </a>
                    <ul className="nav-main-submenu">
                        
                    </ul>
                </li>
                */}
                <ProtectedContent requiredRank="owner" useHighestRank={true} requireCheck={false}>
                    <li className="nav-main-item">
                        <a className="nav-main-link nav-main-link-submenu nav-tab-hand unselectable" data-toggle="submenu" aria-expanded="false" href="#/">
                            <i className="nav-main-link-icon fas fa-crown" /> Owner Center
                        </a>
                        <ul className="nav-main-submenu">
                            <li className="nav-main-item">
                                <NavLink to="/ownerCenter/nodes/" className="nav-main-link"><i className="nav-main-link-icon fas fa-project-diagram" /> Nodes</NavLink>
                            </li>
                            <li className="nav-main-item">
                                <NavLink to="/ownerCenter/accessControl/" className="nav-main-link"><i className="nav-main-link-icon fas fa-user-lock" /> Access Control</NavLink>
                            </li>
                            <li className="nav-main-item">
                                <NavLink to="/ownerCenter/ftpBlacklist/" className="nav-main-link"><i className="nav-main-link-icon fas fa-clipboard-list" /> FTP Blacklist</NavLink>
                            </li>
                        </ul>
                    </li>
                </ProtectedContent>
            </ul>
        )
    }
}

class ServersDropdownElement extends Component {
    render() {
        return(
            <ProtectedContent server={this.props.server.code} requiredRank="helper" requireCheck={false}>
                <NavLink to={`/server/${this.props.server.id}/`} className="nav-main-link">{this.props.server.name}</NavLink>
            </ProtectedContent>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        token: state.auth.authData.token,
        serversDirty: state.nav.serversDirty
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        markServersClean: () => dispatch(serversDirty(false))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Links);
