import React, { Component } from 'react';
import { getMaxMemoryFromLaunchCommand, getNumberAsCommaString } from '../../utils/utils';
import ProgressBar from './ProgressBar';

class MemoryUsageBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ramUsage: 0,
            maxRamUsage: 1
        };

        this.getRamUsagePercent = this.getRamUsagePercent.bind(this);
    }

    getRamUsagePercent() {
        return this.state.ramUsage / this.state.maxRamUsage * 100;
    }

    componentDidUpdate(prevProps) {
        if(this.props.serverStatus !== "offline") return;
        if(prevProps.serverStatus === "offline") return;

        this.setState({
            ramUsage: 0
        });
    }

    componentDidMount() {
        this.props.serverSocket.on('ramUsage', (usage) => {
            this.setState({
                ramUsage: usage
            });
        });

        this.setState({
            maxRamUsage: getMaxMemoryFromLaunchCommand(this.props.launchCommand)
        });
    }

    render() {
        return(
            <ProgressBar color="warning" percentFilled={this.getRamUsagePercent()}>
                <span className="font-w700">{getNumberAsCommaString(this.state.ramUsage)}MB</span> of <span className="font-w700">{getNumberAsCommaString(this.state.maxRamUsage)}MB</span>
            </ProgressBar>
        );
    }
}

export default MemoryUsageBar;