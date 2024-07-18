import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StatusBadge from '../../components/badges/StatusBadge';
import ServerControlButtons from '../../components/ServerControlButtons';
import ProtectedContent from '../../components/ProtectedContent';
import RankBadge from '../../components/badges/RankBadge';
import MemoryUsageBar from '../../components/serverMetrics/MemoryUsageBar';
import CpuUsageBar from '../../components/serverMetrics/CpuUsageBar';
import SocketInjector from '../../injectors/SocketInjector';
import NodeStatusBadge from '../../components/badges/NodeStatusBadge';

class ServerListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "unknown"
        };
    }

    componentDidMount() {
        this.props.serverSocket.on('serverStatus', (status) => {
            this.setState({
                status: status
            });
            if(status === "offline") this.setState({
                ramUsage: 0
            });
        });
    }

    render() {
        return (
            <ProtectedContent server={this.props.code} requiredRank="helper" requireCheck={false}>
                <tr>
                    <td>
                        <b>
                            <NavLink to={`/server/${this.props.id}/`}>
                                {this.props.name}
                            </NavLink>
                        </b>
                        <br />
                        {this.props.domainIp}
                    </td>
                    <td>
                        <CpuUsageBar nodeSocket={this.props.nodeSocket} serverStatus={this.state.status} />
                    </td>
                    <td>
                        <MemoryUsageBar launchCommand={this.props.launchCommand} serverSocket={this.props.serverSocket} serverStatus={this.state.status} />
                    </td>
                    {/*
                    <td>
                        15
                    </td>
                    */}
                    <td>
                        <StatusBadge status={this.state.status} type="button" />
                    </td>
                    <td>
                        <NodeStatusBadge nodeSocket={this.props.nodeSocket} />
                    </td>
                    <td>
                        <RankBadge type="button" rank={this.props.rank}/>
                    </td>
                    <td align="right">
                        <ProtectedContent server={this.props.code} requiredRank="admin">
                            <SocketInjector createDaemonsSocket={true}>
                                <ServerControlButtons status={this.state.status} server={this.props.code} />
                            </SocketInjector>
                        </ProtectedContent>
                    </td>
                </tr>
            </ProtectedContent>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    var server = ownProps.code;
    var globalRank = state.auth.permissions.find(element => element.server === "global")?.rank;
    var rank = state.auth.permissions.find(element => element.server === server)?.rank ?? globalRank;
    return {
        rank: rank
    };
}

export default connect(mapStateToProps)(ServerListEntry);