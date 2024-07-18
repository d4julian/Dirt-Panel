import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Redirect } from 'react-router-dom';
import Node from './Node';
import ProtectedContent from '../../../components/ProtectedContent';
import swal from 'sweetalert';
import { serversDirty } from '../../../actions/navActions';

class Nodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            nodes: [],
            addNode: {
                name: '',
                ip: '',
                ftpPort: ''
            },
            editNode: {
                id: '',
                name: '',
                ip: '',
                ftpPort: ''
            },
            addServer: {
                name: '',
                port: '',
                code: '',
                domainIp: '',
                launchCommand: '',
                nodeId: ''
            },
            editServer: {
                id: '',
                name: '',
                port: '',
                code: '',
                domainIp: '',
                launchCommand: '',
                nodeId: ''
            }
        };

        this.copiedToClipboardPopup = this.copiedToClipboardPopup.bind(this);
        this.getNodes = this.getNodes.bind(this);
        this.fieldChanged = this.fieldChanged.bind(this);
        this.clearFieldSection = this.clearFieldSection.bind(this);
        this.addNode = this.addNode.bind(this);
        this.setEditNodeId = this.setEditNodeId.bind(this);
        this.editNode = this.editNode.bind(this);
        this.addServer = this.addServer.bind(this);
        this.setEditServerId = this.setEditServerId.bind(this);
        this.editServer = this.editServer.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.downloadConfig = this.downloadConfig.bind(this);
    }

    componentDidMount() {
        this.getNodes();
    }

    copiedToClipboardPopup() {
        swal({
            title: "Copied to Clipboard!",
            text: " ",
            icon: "success",
            closeOnClickOutside: true,
            closeOnEsc: true,
            timer: 1000,
            buttons: false
        });
    }

    getNodes() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}nodes/getAll`, {
            params: {
                token: this.props.token
            }
        }).then(response => {
            this.setState({ nodes: response.data.nodes });
        }).catch(error => {
            if (error.response.status === 401) this.setState({ redirect: true });
        });
    }

    fieldChanged(event, sectionKey, key) {
        var newState = this.state[sectionKey];
        newState[key] = event.target.value;
        this.setState({
            [sectionKey]: newState
        });
    }

    clearFieldSection(sectionKey) {
        var newState = this.state[sectionKey];
        for (var key in newState) {
            newState[key] = '';
        }
        this.setState({
            [sectionKey]: newState
        });
    }

    addNode() {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}nodes/addNode`, {
            token: this.props.token,
            name: this.state.addNode.name,
            ip: this.state.addNode.ip,
            ftpPort: this.state.addNode.ftpPort
        }).then(() => {
            this.getNodes();
            this.clearFieldSection('addNode')
            swal({
                title: "Node Added",
                text: "Node Successfully Added!",
                icon: "success"
            });
        }).catch(error => {
            swal({
                title: "Error",
                text: error.response.data.error,
                icon: "error"
            });
        });
    }

    setEditNodeId(id) {
        var node = this.state.nodes.find(x => x.id === id);
        this.setState({
            editNode: {
                id: id,
                name: node.name,
                ip: node.ip,
                ftpPort: node.ftpPort
            }
        });
    }

    editNode() {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}nodes/editNode`, {
            token: this.props.token,
            id: this.state.editNode.id,
            name: this.state.editNode.name,
            ip: this.state.editNode.ip,
            ftpPort: this.state.editNode.ftpPort
        }).then(() => {
            this.getNodes();
            this.clearFieldSection('editNode')
            swal({
                title: "Node Updated",
                text: "Node Successfully Updated!",
                icon: "success"
            });
        }).catch(error => {
            swal({
                title: "Error",
                text: error.response.data.error,
                icon: "error"
            });
        });
    }

    addServer() {
        if (this.state.addServer.nodeId === '') {
            swal({
                title: "Error",
                text: "No Node Selected!",
                icon: "error"
            });
            return;
        }

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}servers/addServer`, {
            token: this.props.token,
            name: this.state.addServer.name,
            port: this.state.addServer.port,
            code: this.state.addServer.code,
            domainIp: this.state.addServer.domainIp,
            launchCommand: this.state.addServer.launchCommand,
            nodeId: this.state.addServer.nodeId
        }).then(() => {
            this.getNodes();
            this.props.markServersDirty();
            this.clearFieldSection('addServer')
            swal({
                title: "Server Added",
                text: "Server Successfully Added!",
                icon: "success"
            });
        }).catch(error => {
            swal({
                title: "Error",
                text: error.response.data.error,
                icon: "error"
            });
        });
    }

    setEditServerId(nodeId, serverId) {
        var node = this.state.nodes.find(x => x.id === nodeId);
        var server = node.servers.find(x => x.id === serverId);
        this.setState({
            editServer: {
                id: serverId,
                name: server.name,
                port: server.port,
                code: server.code,
                domainIp: server.domainIp,
                launchCommand: server.launchCommand,
                nodeId: node.id
            }
        });
    }

    editServer() {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}servers/editServer`, {
            token: this.props.token,
            id: this.state.editServer.id,
            name: this.state.editServer.name,
            port: this.state.editServer.port,
            code: this.state.editServer.code,
            domainIp: this.state.editServer.domainIp,
            launchCommand: this.state.editServer.launchCommand,
            nodeId: this.state.editServer.nodeId
        }).then(() => {
            this.getNodes();
            this.props.markServersDirty();
            this.clearFieldSection('editServer')
            swal({
                title: "Server Updated",
                text: "Server Successfully Updated!",
                icon: "success"
            });
        }).catch(error => {
            swal({
                title: "Error",
                text: error.response.data.error,
                icon: "error"
            });
        });
    }

    getConfig(node) {
        var servers = [];

        // TODO Improve Launch Command Trash
        // TODO FIX CODE
        for (var server of node.servers) {
            servers.push({
                "name": server.name,
                "code": server.code,
                "launchCommand": server.launchCommand
            });
        }

        return {
            "name": node.name,
            "id": node.id,
            "socketAddress": process.env.REACT_APP_SOCKET_ENDPOINT,
            "panelServerEndpoint": process.env.REACT_APP_API_ENDPOINT,
            "ftpPort": node.ftpPort,
            "maxConcurrentFtpConnectionsPerAccount": node.concurrentFtpCons,
            "refreshRate": 1000,
            "servers": servers
        };
    }

    downloadConfig(node) {
        const config = this.getConfig(node);
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(config, null, "\t")], {type: 'text/json'})
        element.href = URL.createObjectURL(file);
        element.download = 'config.json';
        document.body.appendChild(element);
        element.click();
    }

    render() {
        if (this.state.redirect) return (<Redirect to='/redirects/login' />);
        return (
            <ProtectedContent requiredRank="owner" requireCheck={true} useHighestRank={true} redirect={true}>
                <main id="main-container">
                    <div className="content">
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Nodes</h3>
                                <div className="block-options">
                                    <button type="button" className="btn-block-option" data-toggle="modal" data-target="#add-modal">
                                        <i className="fa fa-plus"></i> Add Node
                                    </button>
                                    <button type="button" className="btn-block-option" data-toggle="modal" data-target="#add-server-modal">
                                        <i className="fa fa-plus"></i> Add Server
                           </button>
                                </div>
                            </div>
                            <div className="block-content p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover table-vcenter table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th width="30px"></th>
                                                <th width="20%">Name</th>
                                                <th>IP</th>
                                                <th>Port</th>
                                            </tr>
                                        </thead>
                                        {
                                            this.state.nodes.map(node =>
                                                <Node key={node.name + "|" + node.ip} data={node} getNodes={this.getNodes} setEditNodeId={this.setEditNodeId} setEditServerId={this.setEditServerId} />
                                            )
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.nodes.map(node =>
                            <div key={node.id} className="modal fade" id={`config-modal-${node.id}`}>
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">View Config</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="bg-dark rounded p-3">
                                                        <pre className="mb-0" style={{
                                                            'overflow-x': 'hidden'
                                                        }}>
                                                            <code className="text-body-color-light font-size-sm" >
                                                                {JSON.stringify(this.getConfig(node), null, "\t")}
                                                            </code>
                                                        </pre>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer justify-content-start">
                                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                                            <CopyToClipboard onCopy={this.copiedToClipboardPopup} text={JSON.stringify(this.getConfig(node), null, "\t")}>
                                                <button className="btn btn-info">Copy</button>
                                            </CopyToClipboard>
                                            <button type="button" className="btn btn-secondary" onClick={() => this.downloadConfig(node)}>Download</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="modal fade" id="edit-modal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Node</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.clearFieldSection('editNode')}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" maxLength="32" onChange={e => this.fieldChanged(e, 'editNode', 'name')} value={this.state.editNode.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>IP</label>
                                                <input type="text" className="form-control" maxLength="15" onChange={e => this.fieldChanged(e, 'editNode', 'ip')} value={this.state.editNode.ip} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>FTP Port</label>
                                                <input type="text" className="form-control" maxLength="5" onChange={e => this.fieldChanged(e, 'editNode', "ftpPort")} value={this.state.editNode.ftpPort} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.clearFieldSection('editNode')}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editNode}>Edit Node</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="edit-server-modal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Server</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.clearFieldSection('editServer')}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" maxLength="32" onChange={e => this.fieldChanged(e, 'editServer', 'name')} value={this.state.editServer.name} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Port</label>
                                                <input type="text" className="form-control" maxLength="5" onChange={e => this.fieldChanged(e, 'editServer', 'port')} value={this.state.editServer.port} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Code</label>
                                                <input type="text" className="form-control" maxLength="32" onChange={e => this.fieldChanged(e, 'editServer', 'code')} value={this.state.editServer.code} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Domain IP</label>
                                                <input type="text" className="form-control" maxLength="64" onChange={e => this.fieldChanged(e, 'editServer', 'domainIp')} value={this.state.editServer.domainIp} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Node</label>
                                                <select className="form-control" onChange={e => this.fieldChanged(e, 'editServer', 'nodeId')} value={this.state.editServer.nodeId}>
                                                    {
                                                        this.state.nodes.map(node =>
                                                            <option key={node.id} value={node.id}>{node.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6" />
                                    </div>
                                    <div className="row">
                                        <div className="col-1" />
                                        <div className="col-10">
                                            <div className="form-group">
                                                <label>Launch Command</label>
                                                <input type="text" className="form-control" maxLength="512" onChange={e => this.fieldChanged(e, 'editServer', 'launchCommand')} value={this.state.editServer.launchCommand} />
                                            </div>
                                        </div>
                                        <div className="col-1" />
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.clearFieldSection('editServer')}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editServer}>Edit Server</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="add-modal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Node</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.clearFieldSection('addNode')}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" placeholder="Enter Node Name..." maxLength="32" onChange={e => this.fieldChanged(e, 'addNode', 'name')} value={this.state.addNode.name} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>IP</label>
                                                <input type="text" className="form-control" placeholder="Enter Node IP..." maxLength="15" onChange={e => this.fieldChanged(e, 'addNode', 'ip')} value={this.state.addNode.ip} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>FTP Port</label>
                                                <input type="text" className="form-control" placeholder="Enter Node FTP Port..." maxLength="5" onChange={e => this.fieldChanged(e, 'addNode', 'ftpPort')} value={this.state.addNode.ftpPort} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.clearFieldSection('addNode')}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNode}>Add Node</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="add-server-modal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Server</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.clearFieldSection('addServer')}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control" placeholder="Enter Server Name..." maxLength="32" onChange={e => this.fieldChanged(e, 'addServer', 'name')} value={this.state.addServer.name} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Port</label>
                                                <input type="text" className="form-control" placeholder="Enter Port..." maxLength="5" onChange={e => this.fieldChanged(e, 'addServer', 'port')} value={this.state.addServer.port} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Code</label>
                                                <input type="text" className="form-control" placeholder="Enter Server Code..." maxLength="32" onChange={e => this.fieldChanged(e, 'addServer', 'code')} value={this.state.addServer.code} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Domain IP</label>
                                                <input type="text" className="form-control" placeholder="Enter Domain IP..." maxLength="64" onChange={e => this.fieldChanged(e, 'addServer', 'domainIp')} value={this.state.addServer.domainIp} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label>Node</label>
                                                <select className="form-control" onChange={e => this.fieldChanged(e, 'addServer', 'nodeId')} value={this.state.addServer.nodeId === '' ? '-1' : this.state.addServer.nodeId}>
                                                    <option value="-1" disabled>Select a Node...</option>
                                                    {
                                                        this.state.nodes.map(node =>
                                                            <option key={node.id} value={node.id}>{node.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6" />
                                    </div>
                                    <div className="row">
                                        <div className="col-1" />
                                        <div className="col-10">
                                            <div className="form-group">
                                                <label>Launch Command</label>
                                                <input type="text" className="form-control" placeholder="java -Xms____M -Xmx____m -jar..." maxLength="512" onChange={e => this.fieldChanged(e, 'addServer', 'launchCommand')} value={this.state.addServer.launchCommand} />
                                            </div>
                                        </div>
                                        <div className="col-1" />
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.clearFieldSection('addServer')}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addServer}>Add Server</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </ProtectedContent>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        markServersDirty: () => dispatch(serversDirty(true))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
