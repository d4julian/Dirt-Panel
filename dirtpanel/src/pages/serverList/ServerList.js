import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ServerListEntry from './ServerListEntry';
import SocketInjector from '../../injectors/SocketInjector';

class ServerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}servers/getAll`, {
            params: {
                token: this.props.token
            }
        }).then(response => {
            this.setState({
                servers: response.data.servers
            });
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <main id="main-container">
                <div className="content">
                    <div className="block block-rounded block-bordered block-themed">
                        <div className="block-header block-bg-xwork">
                            <h3 className="block-title">Server List</h3>
                        </div>
                        <div className="block-content p-0">
                            <div className="table-responsive">
                                <table className="table table-hover table-vcenter table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th width="20%">Server</th>
                                            <th>Node CPU Usage</th>
                                            <th>Memory Usage</th>
                                            {/*<th>TPS</th>*/}
                                            <th>Status</th>
                                            <th>Node Status</th>
                                            <th>Rank</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.servers.map(server =>
                                                <SocketInjector server={server.code} node={server.nodeId} >
                                                    <ServerListEntry key={server.id} id={server.id} name={server.name} domainIp={server.domainIp} code={server.code} launchCommand={server.launchCommand} />
                                                </SocketInjector>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token
    };
}

export default connect(mapStateToProps)(ServerList);
