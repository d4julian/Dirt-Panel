import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

class PlayerCountBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerCount: 0
        };

        this.getPlayerCountPercent = this.getPlayerCountPercent.bind(this);
    }

    getPlayerCountPercent() {
        if(this.state.playerCount >= 25) return 100;
        // x * 4 is the same as x / 25 * 100, where 25 is the number of players required for a "full" bar
        return this.state.playerCount * 4;
    }

    componentDidUpdate(prevProps) {
        if(!(this.props.serverStatus !== "running" && prevProps.serverStatus === "running")) return;

        this.setState({
            playerCount: 0
        });
    }

    componentDidMount() {
        this.props.serverSocket.on('playerCount', (count) => {
            if(this.props.serverStatus !== "running") return;
            this.setState({
                playerCount: count
            });
        });
    }

    render() {
        return(
            <ProgressBar color="success" percentFilled={this.getPlayerCountPercent()}>
                <span className="font-w700">{this.state.playerCount}</span>
            </ProgressBar>
        );
    }
}

export default PlayerCountBar;