import React, { Component } from 'react';
import NodeStatusBadge from '../../components/badges/NodeStatusBadge';

import StatusBadge from '../../components/badges/StatusBadge';
import ProtectedContent from '../../components/ProtectedContent';
import ServerControlButtons from '../../components/ServerControlButtons';
import CpuUsageBar from '../../components/serverMetrics/CpuUsageBar';
import MemoryUsageBar from '../../components/serverMetrics/MemoryUsageBar';
import PlayerCountBar from '../../components/serverMetrics/PlayerCountBar';


class Overview extends Component {
    componentDidMount() {
        this.props.serverSocket.emit('getPlayerCount');
        this.props.nodeSocket.emit('getNodeStatus');
    }

    render() {
        return (
            <div className="row">
                <div className="col-9">
                    <div className="block block-rounded block-bordered block-themed">
                        <div className="block-header block-bg-xwork">
                            <h3 className="block-title">General Information</h3>
                        </div>
                        <div className="block-content">
                            <label>
                                <i className="fas fa-user"/> Players
                            </label>
                            <PlayerCountBar serverSocket={this.props.serverSocket} serverStatus={this.props.status} />
                        </div>
                        <div className="block-content block-content">
                            <label>
                                <i className="fas fa-microchip"/> Node CPU Usage
                            </label>
                            <CpuUsageBar nodeSocket={this.props.nodeSocket} serverStatus={this.props.status} />
                        </div>
                        <div className="block-content block-content-full">
                            <label>
                                <i className="fas fa-memory"/> Memory Usage
                            </label>
                            <MemoryUsageBar launchCommand={this.props.launchCommand} serverSocket={this.props.serverSocket} serverStatus={this.props.status} />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="block block-rounded block-bordered block-themed">
                        <div className="block-header block-bg-xwork">
                            <h3 className="block-title">Status</h3>
                        </div>
                        <ProtectedContent server={this.props.server} requiredRank="admin">
                            <div className="block-content text-center">
                                <ServerControlButtons status={this.props.status} server={this.props.server} daemonsSocket={this.props.daemonsSocket} />
                            </div>
                        </ProtectedContent>
                        <div className="block-content block-content">
                            <div className="row">
                                <div className="col text-right">
                                    <label>Server Status:</label>
                                </div>
                                <div className="col text-left">
                                    <StatusBadge type="button" status={this.props.status} />
                                </div>
                            </div>
                        </div>
                        <div class="block-content block-content-full text-center">
                            <div className="row">
                                <div className="col text-right">
                                    <label>Node Status:</label>
                                </div>
                                <div className="col text-left">
                                    <NodeStatusBadge nodeSocket={this.props.nodeSocket} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview;
