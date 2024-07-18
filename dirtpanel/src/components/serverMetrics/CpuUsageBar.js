import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

class CpuUsageBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpuUsage: 0
        };
    }

    componentDidMount() {
        this.props.nodeSocket.on('cpuUsage', (usage) => {
            this.setState({
                cpuUsage: usage
            });
        });
    }

    render() {
        return(
            <ProgressBar color="info" percentFilled={this.state.cpuUsage}>
                <span className="font-w700">{this.state.cpuUsage}%</span>
            </ProgressBar>
        );
    }
}

export default CpuUsageBar;