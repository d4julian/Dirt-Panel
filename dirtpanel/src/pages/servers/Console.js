import React, { Component } from 'react';
import ProtectedContent from '../../components/ProtectedContent';

let h400 = {
    'height': '400px',
    'width': '100%',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    'font-family': 'monospace',
    'bottom': 0
};

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            command: "",
            scrolledToBottom: false
        };

        this.sendCommand = this.sendCommand.bind(this);
        this.commandChanged = this.commandChanged.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom(false);
    }

    componentDidUpdate() {
        this.scrollToBottom(true);
    }

    commandChanged(event) {
        this.setState({
            command: event.target.value
        });
    }

    sendCommand() {
        this.props.socket.emit('consoleIn', this.state.command);
        this.setState({
            command: ""
        });
    }

    keyDown(event) {
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            this.sendCommand();
        }
    }

    onScroll(event) {
        const scrolledToBottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        this.setState({
            scrolledToBottom: scrolledToBottom
        });
    }

    scrollToBottom(checkScrollState) {
        try {
            if (this.state.scrolledToBottom || !checkScrollState) this.consoleEnd.scrollIntoView({ behavior: "smooth" });
        } catch (error) {}
    }

    render() {
        return (
            <ProtectedContent requiredRank="moderator" server={this.props.server} requireCheck={true} redirect={true}>
                <div className="block block-rounded block-bordered block-themed">
                    <div className="block-header block-bg-xwork">
                        <h3 className="block-title">Server Console</h3>
                        {/*
                    <div className="block-options">
                        <button type="button" className="btn-block-option">
                            <i className="fa fa-wrench"></i>
                        </button>
                    </div>
                    */}
                    </div>
                    <ProtectedContent requiredRank="admin" server={this.props.server} requireCheck={true} isConsole={true}>
                        <div className="block-content">
                            <div className="input-group">
                                <input type="text" className="form-control" id="dm-gaming-send-command" name="dm-gaming-send-command" placeholder="..." onKeyDown={e => this.keyDown(e)} onChange={e => this.commandChanged(e)} value={this.state.command} />
                                <div className="input-group-append">
                                    <button onClick={this.sendCommand} className="btn btn-primary">Send Command</button>
                                </div>
                            </div>
                        </div>
                    </ProtectedContent>
                    <div className="block-content block-content-full">
                        <div className="bg-dark rounded p-3 text-body-color-light font-size-sm" style={h400} onScroll={this.onScroll}>
                            {
                                this.props.consoleEntries.map((consoleEntry) => (
                                    <ConsoleLine consoleEntry={consoleEntry} />
                                ))
                            }
                            <div style={{ float: "left", clear: "both" }} ref={el => { this.consoleEnd = el; }} />
                        </div>
                    </div>
                </div>
            </ProtectedContent>
        );
    }
}

function ConsoleLine(props) {
    return <React.Fragment>
        {props.consoleEntry}
        <br />
    </React.Fragment>
}

export default Console;