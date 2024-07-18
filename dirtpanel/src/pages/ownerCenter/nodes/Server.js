import React, {Component} from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import { serversDirty } from '../../../actions/navActions';

class Server extends Component {
    constructor(props) {
        super(props);

        this.removeServer = this.removeServer.bind(this);
    }

    removeServer() {
        swal({
            title: "Confirm Server Deletion",
            text: `Once confirmed, this server will be gone forever! Proceed with caution!\n\nServer: ${this.props.data.name}`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((confirmed) => {
            if(confirmed) {
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}servers/removeServer`, {
                    token: this.props.token,
                    id: this.props.data.id
                }).then(() => {
                    this.props.getNodes();
                    this.props.markServersDirty();
                    swal({
                        title: "Server Deleted",
                        text: "Server Successfully Deleted!",
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
        })
    }

    render() {
        return (
            <tr>
                <td className="text-center" />
                <td className="font-w600">{this.props.data.name}</td>
                <td>
                    {this.props.data.domainIp}
                </td>
                <td>
                    {this.props.data.port}
                </td>
                <td align="right">
                    <button type="button" className="btn btn-sm btn-info mr-1" data-toggle="modal" data-target="#edit-server-modal" onClick={() => this.props.setEditServerId(this.props.nodeId, this.props.data.id)}>
                        <i className="fa fa-pencil-alt" /> Edit Server
                    </button>
                    <button onClick={this.removeServer} type="button" className="btn btn-sm btn-primary">
                        <i className="fa fa-trash" /> Delete
                    </button>
                </td>
            </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(Server);