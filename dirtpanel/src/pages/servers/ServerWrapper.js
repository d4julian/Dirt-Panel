import React, { Component, Fragment } from 'react';
import SocketInjector from '../../injectors/SocketInjector';
import Server from './Server';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class ServerWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            redirect: false
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}servers/get`, {
            params: {
                token: this.props.token,
                id: this.props.id
            }
        }).then(response => {
            this.setState({
                server: response.data.server
            });

            axios.get(`${process.env.REACT_APP_API_ENDPOINT}nodes/get`, {
                params: {
                    token: this.props.token,
                    id: response.data.server.nodeId
                }
            }).then(nodeResponse => {
                this.setState({
                    node: nodeResponse.data.node
                });
                this.setState({
                    ready: true
                });
            }).catch(error => {
                if (error.response.status === 404) this.setState({ redirect: true })
            });
        }).catch(error => {
            if (error.response.status === 404) this.setState({ redirect: true })
        });
    }

    render() {
        if (this.state.redirect) return (<Redirect to='/' />);
        else if(!this.state.ready) return <Fragment />
        return(
            <SocketInjector server={this.state.server.code} node={this.state.server.nodeId} createDaemonsSocket={true}>
                <Server server={this.state.server} node={this.state.node} />
            </SocketInjector>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token
    };
}

export default withRouter(connect(mapStateToProps)(ServerWrapper));