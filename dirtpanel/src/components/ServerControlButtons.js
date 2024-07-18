import React, { Component, Fragment } from 'react';

class ServerControlButtons extends Component {
    constructor(props) {
        super(props);

        this.emitSocketEvent = this.emitSocketEvent.bind(this);
    }

    emitSocketEvent(event) {
        this.props.daemonsSocket.emit(event, this.props.server);
    }

    render() {
        return (
            <Fragment>
                <ServerControlButtonWrapper status={this.props.status} acceptedServerStatuses={["offline"]}>
                    <button type="button" className="btn btn-sm btn-success mr-1" onClick={() => this.emitSocketEvent('startServer')}>
                        <i className="fa fa-rocket" /> Start
                    </button>
                </ServerControlButtonWrapper>
                <ServerControlButtonWrapper status={this.props.status} acceptedServerStatuses={["running"]}>
                    <button type="button" className="btn btn-sm btn-info mr-1" onClick={() => this.emitSocketEvent('stopServer')}>
                        <i className="fa fa-power-off" /> Shutdown
                    </button>
                </ServerControlButtonWrapper>
                <ServerControlButtonWrapper status={this.props.status} acceptedServerStatuses={["starting", "running", "stopping"]}>
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => this.emitSocketEvent('killServer')}>
                        <i className="fa fa-skull" /> Kill
                    </button>
                </ServerControlButtonWrapper>
            </Fragment>
        );
    }
}

class ServerControlButtonWrapper extends Component {
    render() {
        if(this.props.acceptedServerStatuses.includes(this.props.status)) return (
            <Fragment>
                {this.props.children}
            </Fragment>
        );
        return(<Fragment />);
    }
}

export default ServerControlButtons;