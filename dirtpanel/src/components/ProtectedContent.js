import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class ProtectedContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            redirect: false
        };
    }

    componentDidMount() {
        // TODO Don't call API for things that can simply use the unencrypted permissions array we already have on the client.
        if(!this.props.authenticated) return;

        axios.get(`${process.env.REACT_APP_API_ENDPOINT}auth/verifyPerms`, {
            params: {
                token: this.props.token,
                server: this.props.server ?? "global",
                requiredRank: this.props.requiredRank ?? "helper",
                requireCheck: this.props.requireCheck ?? true,
                useHighestRank: this.props.useHighestRank ?? false,
                isConsole : this.props.isConsole ?? false,
                isFTP: this.props.isFTP ?? false
            }
        }).then(response => {
            this.setState({render: true});
        }).catch(error => {
            this.setState({redirect: true});
        });

    }

    render() {
        if(this.state.render) {
            return(
                <Fragment>
                    {this.props.children}
                </Fragment>
            );
        } else {
            if(this.props.redirect && this.state.redirect) {
                var redirectLink = this.props.redirectLink ?? "";
                return <Redirect to={redirectLink} />
            }
            if(this.props.alt) return(
                <Fragment>
                    {this.props.alt(this.state)}
                </Fragment>
            )
            else return <Fragment />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        token: state.auth.authData.token
    };
}

export default connect(mapStateToProps)(ProtectedContent);