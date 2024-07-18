import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class SocketInjector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverSocketReady: false,
            daemonsSocketReady: false
        };
    }

    componentDidMount() {
        if(this.props.server) {
            this.serverSocket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}servers/${this.props.server}`, {
                query: 'token=' + this.props.token
            });

            this.setState({
                serverSocket: this.serverSocket 
            }, () => {
                this.setState({
                    serverSocketReady: true
                });
                this.serverSocket.open();
            });
        } else this.setState({
            serverSocketReady: true
        });

        if(this.props.createDaemonsSocket) {
            this.daemonsSocket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}daemons`, {
                query: 'token=' + this.props.token
            });

            this.setState({
                daemonsSocket: this.daemonsSocket 
            }, () => {
                this.setState({
                    daemonsSocketReady: true
                });
                this.daemonsSocket.open();
            });
        } else this.setState({
            daemonsSocketReady: true
        });

        if(this.props.node) {
            this.nodeSocket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}nodes/${this.props.node}`, {
                query: 'token=' + this.props.token
            });

            this.setState({
                nodeSocket: this.nodeSocket 
            }, () => {
                this.setState({
                    nodeSocketReady: true
                });
                this.nodeSocket.open();
            });
        } else this.setState({
            nodeSocketReady: true
        });
    }

    componentWillUnmount() {
        if(this.props.server) this.serverSocket.close();
        if(this.props.createDaemonsSocket) this.daemonsSocket.close();
        if(this.props.node) this.nodeSocket.close();
    }

    render() {
        if(!this.state.serverSocketReady || !this.state.daemonsSocketReady || !this.state.nodeSocketReady) return <Fragment />
        var childProps = {};
        if(this.props.server) childProps = {
            ...childProps,
            serverSocket: this.state.serverSocket
        };
        if(this.props.createDaemonsSocket) childProps = {
            ...childProps,
            daemonsSocket: this.state.daemonsSocket
        };
        if(this.props.node) childProps = {
            ...childProps,
            nodeSocket: this.state.nodeSocket
        };
        return(
            <Fragment>
                {
                    React.Children.map(this.props.children, child => React.cloneElement(child, {...childProps, ...child.props}))
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token,
    };
}

export default connect(mapStateToProps)(SocketInjector);