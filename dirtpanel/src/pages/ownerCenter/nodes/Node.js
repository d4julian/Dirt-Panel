import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';

import Server from './Server';
import axios from 'axios';
import { serversDirty } from '../../../actions/navActions';

class Node extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showServers: false
        };

        this.removeNode = this.removeNode.bind(this);
        this.toggleServers = this.toggleServers.bind(this);
    }

    componentDidMount() {
        var servers = [];

        // TODO Improve Launch Command Trash
        for(var server of this.props.data.servers) {
            servers.push({
                "name": server.name,
                "id": server.id,
                "launchCommand": "FILL ME IN."
            });
        }
    }

    removeNode() {
        swal({
            title: "Confirm Node Deletion",
            text: `Once confirmed, this node will be gone forever! Proceed with caution!\n\nNode: ${this.props.data.name}`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((confirmed) => {
            if(confirmed) {
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}nodes/removeNode`, {
                    token: this.props.token,
                    id: this.props.data.id
                }).then(() => {
                    this.props.getNodes();
                    this.props.markServersDirty();
                    swal({
                        title: "Node Deleted",
                        text: "Node Successfully Deleted!",
                        icon: "success",
                    });
                }).catch(error => {
                    swal({
                        title: "Error",
                        text: error.response.data.error,
                        icon: "error"
                    });
                });
            }
        })
    }

    toggleServers() {
        this.setState({
            showServers: !this.state.showServers
        });
    }

    render() {
        return (
            <Fragment>
                <tbody onClick={this.toggleServers}>
                    <tr>
                        <td className="text-center nav-tab-hand">
                            <i className="fa fa-angle-right text-muted" style={{transition: 'transform .15s ease-out', transform: `rotate(${this.state.showServers ? '90' : '0'}deg)`}}/>
                        </td>
                        <td className="font-w600">
                            <div className="py-1">
                                {this.props.data.name}
                            </div>
                        </td>
                        <td>
                            {this.props.data.ip}
                        </td>
                        <td>
                            {this.props.data.ftpPort}
                        </td>
                        <td align="right">
                            <button type="button" className="btn btn-sm btn-dark mr-1" data-toggle="modal" data-target={`#config-modal-${this.props.data.id}`} onClick={(event) => event.stopPropagation()}>
                                <i className="fa fa-code" /> View Config
                            </button>
                            <button type="button" className="btn btn-sm btn-info mr-1" data-toggle="modal" data-target="#edit-modal" onClick={(event) => { event.stopPropagation(); this.props.setEditNodeId(this.props.data.id)}}>
                                <i className="fa fa-pencil-alt" /> Edit Node
                            </button>
                            <button onClick={(event) => {event.stopPropagation(); this.removeNode();}} type="button" className="btn btn-sm btn-primary">
                                <i className="fa fa-trash" /> Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody className="font-size-sm" style={this.state.showServers ? {} : {display: 'none'}}>
                    {
                        this.props.data.servers.map(server =>
                            <Server key={server.id} data={server} setEditServerId={this.props.setEditServerId} nodeId={this.props.data.id} getNodes={this.props.getNodes}/>
                        )
                    }
                </tbody>
            </Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Node);