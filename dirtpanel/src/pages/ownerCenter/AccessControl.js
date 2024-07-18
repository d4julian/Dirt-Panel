import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

import RankBadge from '../../components/badges/RankBadge';
import ProtectedContent from '../../components/ProtectedContent';
import PaginationWrapper from '../../components/PaginationWrapper';

class AccessControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawUsers: [],
            users: [],
            searchString: '',
            edit: {
                discord: '',
                name: '',
                enabled: '',
                console: '',
                ftp: ''
            }
        };

        this.fetchUsers = this.fetchUsers.bind(this);
        this.setEditDiscordId = this.setEditDiscordId.bind(this);
        this.clearEdit = this.clearEdit.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
        /*
        $('.dropdown-menu').on('click.bs.dropdown', function (e) {
            e.stopPropagation();
        });
        */
    }

    fetchUsers() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/getAll`, {
            params: {
                token: this.props.token
            }
        }).then(response => {
            var orderedUsers = response.data.users;
            orderedUsers.sort(function (a, b) {
                var nameA = a.lastLoginUsername.toLowerCase();
                var nameB = b.lastLoginUsername.toLowerCase();
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
            this.setState({
                rawUsers: orderedUsers,
                page: 1
            }, () => { this.updateListings() });
        }).catch(error => { });
    }

    updateListings() {
        var filteredUsers = this.state.rawUsers;
        filteredUsers = filteredUsers.filter((user) => user.lastLoginUsername.toLowerCase().includes(this.state.searchString.toLowerCase()) || user.discord.includes(this.state.searchString.toLowerCase()));
        this.setState({
            users: filteredUsers
        });
    }

    setEditDiscordId(discordId) {
        var user = this.state.rawUsers.find(x => x.discord === discordId);
        this.setState({
            edit: {
                discord: user.discord,
                name: user.lastLoginUsername,
                enabled: user.enabled,
                console: user.console,
                ftp: user.ftp
            }
        });
    }

    editUser() {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/editUser`, {
            token: this.props.token,
            discord: this.state.edit.discord,
            enabled: this.state.edit.enabled,
            console: this.state.edit.console,
            ftp: this.state.edit.ftp
        }).then(() => {
            this.fetchUsers();
            this.clearEdit();
            swal({
                title: "User Updated",
                text: "User Successfully Updated!",
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

    clearEdit() {
        var newState = this.state.edit;
        for (var key in newState) newState[key] = '';
        this.setState({
            edit: newState
        });
    }

    render() {
        return (
            <ProtectedContent requiredRank="owner" requireCheck={true} useHighestRank={true} redirect={true}>
                <main id="main-container">
                    <div className="content content-full">
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Access Controls</h3>
                                <div className="block-options">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <div className="dropdown">
                                                <button className="btn btn-info dropdown-toggle" data-toggle="dropdown" />
                                                <div className="dropdown-menu">
                                                    <div className="dropdown-item custom-control custom-switch custom-control-info mb-1" style={{ marginTop: '5px' }} hidden={true}>
                                                        <input type="checkbox" class="custom-control-input" id="allowUnrankedSwitch" />
                                                        <label className="custom-control-label" for="allowUnrankedSwitch">Include Unranked Users</label>
                                                    </div>
                                                    <div className="dropdown-item">
                                                        <span>More Filters Coming Soon!</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Discord Username or ID..." value={this.state.searchString} onChange={(event) => this.setState({ searchString: event.target.value }, () => this.updateListings())} />
                                    </div>
                                </div>
                            </div>
                            <PaginationWrapper elements={this.state.users} pageLength={8} key={this.state.users}>
                                <UsersTable fetchUsers={this.fetchUsers} setEditDiscordId={this.setEditDiscordId} token={this.props.token} />
                            </PaginationWrapper>
                        </div>
                    </div>
                    <div className="modal fade" id="edit-modal">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit User - {this.state.edit.name}</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.clearEdit}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-2">
                                        <div className="col-md-6 mx-auto">
                                            <div className="custom-control custom-block custom-control-success">
                                                <input type="checkbox" className="custom-control-input" id="accountStatus" checked={this.state.edit.enabled} onClick={() => this.setState({ edit: { ...this.state.edit, enabled: !this.state.edit.enabled } })} />
                                                <label className="custom-control-label" for="accountStatus">
                                                    <span className="d-block text-center">
                                                        <i className="fas fa-user fa-2x mb-2 text-black-50/" />
                                                        <br />
                                                        Account {this.state.edit.enabled ? 'Active' : 'Suspended'}
                                                    </span>
                                                </label>
                                                <span className="custom-block-indicator">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6 mx-auto">
                                            <div className="custom-control custom-block custom-control-success">
                                                <input type="checkbox" className="custom-control-input" id="consoleAccess" checked={this.state.edit.console} onClick={() => this.setState({ edit: { ...this.state.edit, console: !this.state.edit.console } })} />
                                                <label className="custom-control-label" for="consoleAccess">
                                                    <span className="d-block text-center">
                                                        <i className="fas fa-terminal fa-2x mb-2 text-black-50/" />
                                                        <br />
                                                        Console Access
                                                    </span>
                                                </label>
                                                <span className="custom-block-indicator">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6 mx-auto">
                                            <div className="custom-control custom-block custom-control-success">
                                                <input type="checkbox" className="custom-control-input" id="ftpAccess" checked={this.state.edit.ftp} onClick={() => this.setState({ edit: { ...this.state.edit, ftp: !this.state.edit.ftp } })} />
                                                <label className="custom-control-label" for="ftpAccess">
                                                    <span className="d-block text-center">
                                                        <i className="fas fa-folder-open fa-2x mb-2 text-black-50/" />
                                                        <br />
                                                        FTP Access
                                                    </span>
                                                </label>
                                                <span className="custom-block-indicator">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.clearEdit}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editUser}>
                                        <i className="far fa-save" /> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </ProtectedContent>
        );
    }
}

class UsersTable extends Component {
    render() {
        return (
            <div className="block-content p-0">
                <div className="table-responsive">
                    <table className="table table-hover table-vcenter table-striped mb-0">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th style={{ textAlign: 'left' }}>Discord Username</th>
                                <th>Highest Rank</th>
                                <th>Account Status</th>
                                <th>Console Access</th>
                                <th>FTP Access</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.pageElements.map(user =>
                                    <User key={user.discord} discord={user.discord} name={user.lastLoginUsername} highestRank={user.highestRank} suspended={!user.enabled} console={user.console} ftp={user.ftp} fetchUsers={this.props.fetchUsers} setEditDiscordId={this.props.setEditDiscordId} token={this.props.token} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class User extends Component {
    constructor(props) {
        super(props);

        this.removeUser = this.removeUser.bind(this);
    }

    removeUser() {
        swal({
            title: "Confirm User Deletion",
            text: `Once confirmed, this user will be deleted forever! If they still have staff permissions and log in again, their account will be active. Proceed with caution!\n\nUser: ${this.props.name}`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((confirmed) => {
            if (confirmed) {
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}users/removeUser`, {
                    token: this.props.token,
                    discord: this.props.discord
                }).then(() => {
                    this.props.fetchUsers();
                    swal({
                        title: "User Deleted",
                        text: "User Successfully Deleted!",
                        icon: "success"
                    });
                }).catch(error => {
                    swal({
                        title: "Error",
                        text: error.response.data.error,
                        icon: "error"
                    });
                })
            }
        })
    }

    render() {
        return (
            <tr>
                <td>
                    <b>
                        {this.props.name}
                    </b>
                </td>
                <td>
                    <RankBadge type="button" rank={this.props.highestRank} addStyle={{ width: '100%' }} />
                </td>
                <td>
                    <button type="button" className='btn btn-sm' style={{ width: '100%', textAlign: 'left', opacity: '1', backgroundColor: this.props.suspended ? 'red' : 'green', borderColor: this.props.suspended ? 'red' : 'green', color: 'white' }} disabled>
                        <div className="row">
                            <div className="col-sm-auto" style={{ paddingRight: '0px' }}>
                                <i className={`fas ${this.props.suspended ? 'fa-lock' : 'fa-lock-open'}`} style={{ color: 'white' }} />
                            </div>
                            <div className="col" style={{ textAlign: 'center', paddingLeft: '0px' }}>
                                {this.props.suspended ? 'Suspended' : 'Active'}
                            </div>
                        </div>
                    </button>
                </td>
                <td align="center">
                    <i className={`fas ${this.props.console ? 'fa-check' : 'fa-times'}`} style={{ color: this.props.console ? 'green' : 'red' }} />
                </td>
                <td align="center">
                    <i className={`fas ${this.props.ftp ? 'fa-check' : 'fa-times'}`} style={{ color: this.props.ftp ? 'green' : 'red' }} />
                </td>
                <td align="right">
                    <button type="button" className="btn btn-sm btn-info mr-1" data-toggle="modal" data-target="#edit-modal" onClick={() => this.props.setEditDiscordId(this.props.discord)}>
                        <i className="fa fa-pencil-alt" /> Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.removeUser}>
                        <i className="fa fa-trash" /> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token
    };
}

export default connect(mapStateToProps)(AccessControl);