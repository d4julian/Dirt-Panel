import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from '../../components/tabs/Tabs';

import Overview from './Overview';
import Console from './Console';
import FTPLogin from './FTPLogin';

import StatusBadge from '../../components/badges/StatusBadge';
import ProtectedContent from '../../components/ProtectedContent';

let bgimg = {
    background: 'url(/theme/assets/media/photos/bg_minecraft.png)',
};

class Server extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consoleEntries: [],
            serverStatus: "unknown"
        };
    }

    componentDidMount() {
        this.props.serverSocket.on('fullConsole', (chat) => {
            this.setState({
                consoleEntries: chat.data.reverse()
            });
        });

        this.props.serverSocket.on('consoleOut', (consoleEntry) => {
            this.setState({
                consoleEntries: [...this.state.consoleEntries, consoleEntry]
            });
        });

        this.props.serverSocket.on('serverStatus', (status) => {
            this.setState({
                serverStatus: status
            });
        });
    }

    render() {
        return (
            <ProtectedContent server={this.props.server.code} requireCheck={false} redirect={true}>
                <main id="main-container">
                    <div className="bg-image" style={bgimg}>
                        <div className="bg-black-10">
                            <div className="content content-full">
                                <div className="text-center">
                                    <h1 className="h2 font-w700 mb-2 text-white">
                                        {this.props.server.name}
                                    </h1>
                                    <h2 className="h5 text-white-75 mb-0">
                                        {this.props.server.domainIp}
                                    </h2>
                                    <StatusBadge status={this.state.serverStatus} type="badge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs>
                        <div label="Overview" server={this.props.server.code}>
                            <Overview status={this.state.serverStatus} server={this.props.server.code} launchCommand={this.props.server.launchCommand} serverSocket={this.props.serverSocket} daemonsSocket={this.props.daemonsSocket} nodeSocket={this.props.nodeSocket} />
                        </div>
                        {/*
                        <div label="Chat">
                            <Chat />
                        </div>
                        */}
                        <div label="Console" server={this.props.server.code} requiredRank="moderator" requireCheck={false}>
                            <Console socket={this.props.serverSocket} consoleEntries={this.state.consoleEntries} server={this.props.server.code} />
                        </div>
                        {/*
                        <div label="Staff">
                            <Staff />
                        </div>
                        <div label="Config">
                            Config
                        </div>
                        */}
                        {/*
                        <div label="File Manager">
                            TODO (Browser based FTP)
                        </div>
                        */}
                        <div label="FTP Login" server={this.props.server.code} requiredRank="admin" requireCheck={false} isFTP={true}>
                            <FTPLogin node={this.props.node} server={this.props.server} username={this.props.username} token={this.props.token} />
                        </div>
                    </Tabs>

                    <script src="%PUBLIC_URL%/theme/assets/js/pages/db_gaming.min.js"></script>
                </main>
            </ProtectedContent>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token,
        username: state.auth.userData.username
    };
}

export default connect(mapStateToProps)(Server);