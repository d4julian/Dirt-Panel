import React, { Component } from 'react';

class NodeStatusBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeStatus: false
        };
    }

    componentDidMount() {
        this.props.nodeSocket.on('nodeStatus', (status) => {
            this.setState({
                nodeStatus: status
            });
        });
    }

    render() {
        return(
            <i className={`fas fa-${this.state.nodeStatus ? "heartbeat" : "heart-broken"} fa-2x`} style={{color: this.state.nodeStatus ? "green" : "red"}}/>
        )
    }
}

export default NodeStatusBadge;