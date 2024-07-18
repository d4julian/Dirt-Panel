import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import $ from 'jquery';

import EditModal from './EditModal';

// TODO Redo all localhost links here to use process.env
class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                onlyMyPunishments: true,
                player: '',
                staff: '',
                server: 'all',
                punishmentType: 'all'
            },
            rawPendingReports: [],
            filteredPendingReports: [],
            pagination: {
                page: 1,
                numPages: 1,
                pageLength: 8
            },
            servers: [],
            editingId: -1
        };

        this.fetchPendingReports = this.fetchPendingReports.bind(this);
        this.setEditingId = this.setEditingId.bind(this);
    }

    componentDidMount() {
        this.fetchPendingReports();

        // TODO Change URL
        axios.get('http://localhost:5000/servers/getAll', {
            params: {
                token: this.props.token
            }
        }).then(response => {
            this.setState({
                servers: response.data.servers
            });
        }).catch(error => {
        });
    }

    fetchPendingReports() {
        // TODO Change URL
        axios.get('http://localhost:5000/sanctions/getAllPending', {
            params: {
                token: this.props.token
            }
        }).then(response => {
            var orderedPendingReports = response.data.pendingSanctions;
            orderedPendingReports.sort(function(a, b) {
                var nameA = a.username.toLowerCase();
                var nameB = b.username.toLowerCase();
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            });
            this.setState({
                rawPendingReports: orderedPendingReports,
                page: 1
            }, () => this.updateListings());
        }).catch(error => {
        });
    }

    updateListings() {
        var filteredPendingReports = this.state.rawPendingReports;

        filteredPendingReports = this.state.filters.onlyMyPunishments
            ? filteredPendingReports.filter((report) => report.staffUUID == this.props.staffUUID)
            : filteredPendingReports.filter((report) => report.staffUsername.toLowerCase().includes(this.state.filters.staff.toLowerCase()) || report.staffUUID.includes(this.state.filters.staff.toLowerCase().replace(/-/g, '')))

        filteredPendingReports = filteredPendingReports.filter((report) => report.username.toLowerCase().includes(this.state.filters.player.toLowerCase()) || report.uuid.includes(this.state.filters.player.toLowerCase().replace(/-/g, '')));

        if(this.state.filters.server != 'all') filteredPendingReports = filteredPendingReports.filter((report) => report.server == this.state.filters.server);
        if(this.state.filters.punishmentType != 'all') filteredPendingReports = filteredPendingReports.filter((report) => report.type == this.state.filters.punishmentType);


        var numPages = Math.ceil(filteredPendingReports.length / this.state.pagination.pageLength);
        var page = this.state.pagination.page > numPages ? numPages: this.state.pagination.page;
        page = page < 1 ? 1 : page;

        var startIndex = (page - 1) * this.state.pagination.pageLength;
        var pendingReports = [];
        for(var i = 0; i < this.state.pagination.pageLength; i++) {
            var index = startIndex + i;
            if(index >= filteredPendingReports.length) break;
            pendingReports.push(filteredPendingReports[index]);
        }
        this.setState({
            filteredPendingReports: pendingReports,
            pagination: {
                ...this.state.pagination,
                numPages: numPages,
                page: page
            }
        });
    }

    setEditingId(id) {
        this.setState({
            editingId: id
        }, () => console.log('STATE UPDATED'));
    }
    
    render() {
        return (
            <main id="main-container">
                <div className="content content-full">
                    <div className="row">
                        <div className="col-9">
                            <div className="block block-rounded block-bordered block-themed">
                                <div className="block-header block-bg-xwork">
                                    <h3 className="block-title">Pending Reports</h3>
                                    <div className="block-options">
                                        <button className="btn btn-primary" onClick={() => this.fetchPendingReports()}>
                                            <i className="fas fa-sync-alt"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="block-content p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-vcenter table-striped mb-0">
                                            <thead> 
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Username</th>
                                                    <th>Staff</th>
                                                    <th className="text-center">Punishment Type</th>
                                                    <th />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.filteredPendingReports.map(report =>
                                                        <PendingReport key={report.id} id={report.id} date={report.date} username={report.username} staffUsername={report.staffUsername} punishmentType={report.type} token={this.props.token} fetchPendingReports={this.fetchPendingReports} setEditingId={this.setEditingId}/>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="block-content block-content-full bg-body-light rounded-bottom">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <p className="mb-0">Page <b>{this.state.pagination.numPages > 0 ? this.state.pagination.page : '0'}</b> of <b>{this.state.pagination.numPages}</b></p>
                                        </div>
                                        <div className="col" align="right">
                                            <div className="btn-group">
                                                <button className="btn btn-secondary" disabled={this.state.pagination.page == 1} onClick={() => this.setState({pagination: {...this.state.pagination, page: this.state.pagination.page - 1}}, () => this.updateListings())}>
                                                    <i className="fas fa-chevron-left"/>
                                                </button>
                                                <button className="btn btn-secondary" disabled={this.state.pagination.page >= this.state.pagination.numPages} onClick={() => this.setState({pagination: {...this.state.pagination, page: this.state.pagination.page + 1}}, () => this.updateListings())}>
                                                    <i className="fas fa-chevron-right" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="block block-rounded block-bordered block-themed">
                                <div className="block-header block-bg-xwork">
                                    <h3 className="block-title">Filters</h3>
                                </div>
                                <div className="block-content">
                                    <div className="row">
                                        <div className="col col-9">
                                            <label>Only My Punishments</label>
                                        </div>
                                        <div className="col col-3">
                                            <div className="custom-control custom-switch custom-control-info custom-control-lg mb-2" style={{height: '26px', width:'44px'}}>
                                                <input type="checkbox" class="custom-control-input" id="onlyMyPunishmentsCheck" checked={this.state.filters.onlyMyPunishments} onClick={() => this.setState({filters: {...this.state.filters, onlyMyPunishments: !this.state.filters.onlyMyPunishments, staff: ''}}, () => this.updateListings())}/>
                                                <label className="custom-control-label" for="onlyMyPunishmentsCheck" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-content">
                                    <div className="form-group">
                                        <label>Username/UUID</label>
                                        <input type="text" className="form-control" placeholder="Enter Username or UUID..." value={this.state.filters.player} onChange={(event) => this.setState({filters: {...this.state.filters, player: event.target.value}}, () => this.updateListings())}/>
                                    </div>
                                </div>
                                <div className="block-content">
                                    <div className="form-group">
                                        <label>Staff Username/UUID</label>
                                        <input type="text" className="form-control" placeholder="Enter Username or UUID..." disabled={this.state.filters.onlyMyPunishments} value={this.state.filters.staff} onChange={(event) => this.setState({filters: {...this.state.filters, staff: event.target.value}}, () => this.updateListings())}/>
                                    </div>
                                </div>
                                <div className="block-content block-content-full">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Server</label>
                                                <select className="form-control" value={this.state.filters.server} onChange={(event) => this.setState({filters: {...this.state.filters, server: event.target.value}}, () => this.updateListings())}>
                                                    <option value="all">All</option>
                                                    {
                                                        this.state.servers.map(server => (
                                                            <option key={server.id} value={server.name}>{server.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label>Punishment Type</label>
                                                <select className="form-control" value={this.state.filters.punishmentType} onChange={(event) => this.setState({filters: {...this.state.filters, punishmentType: event.target.value}}, () => this.updateListings())}>
                                                    <option value="all">All</option>
                                                    <option value="ban">Ban</option>
                                                    <option value="mute">Mute</option>
                                                    <option value="ipban">IP Ban</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditModal id={this.state.editingId}/>
            </main>  
        );
    }
}

class PendingReport extends Component {
    constructor(props) {
        super(props);

        this.dismissReport = this.dismissReport.bind(this);
    }

    dismissReport() {
        swal({
            title: "Confirm Report Dismissal",
            text: `Are you sure you want to dismiss this report? Dismissal is only permitted for punishments were revoked or are the result of an edit!\n\nUser: ${this.props.username}`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((confirmed) => {
            if(confirmed) {
                // TODO Change URL
                axios.post('http://localhost:5000/sanctions/dismiss', {
                    token: this.props.token,
                    id: this.props.id
                }).then(() => {
                    this.props.fetchPendingReports();
                    swal({
                        title: "Report Dismissed",
                        text: "Report Successfully Dismissed!",
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

    renderTypeBadge() {
        var settings = {}
        switch(this.props.punishmentType) {
            case 'ban':
                settings = {
                    color: '#DC2424',
                    textColor: "#FFFFFF",
                    type: 'Ban'
                };
                break;
            case 'mute':
                settings = {
                    color: '#3B8FB9',
                    textColor: '#FFFFFF',
                    type: 'Mute'
                };
                break;
            case 'ipban':
                settings = {
                    color: '#C165B6',
                    textColor: '#FFFFFF',
                    type: 'IP Ban'
                }
        }
        return (
            <button type="button" className="btn btn-sm" style={{backgroundColor: settings.color, borderColor: settings.color, color: settings.textColor, width: '100%', opacity: '1'}} disabled>{settings.type}</button>
        )
    }

    render() {
        return (
            <tr>
                <td>
                    {moment.unix(this.props.date).format("MMMM Do, YYYY")}
                </td>
                <td>
                    {this.props.username}
                </td>
                <td>
                    {this.props.staffUsername}
                </td>
                <td>
                    {this.renderTypeBadge()}
                </td>
                <td align="right">
                    <button type="button" className="btn btn-sm btn-info mr-1" data-toggle="modal" data-target="#edit-modal" onClick={() => this.props.setEditingId(this.props.id)}>
                        <i className="fa fa-pencil-alt" />  Complete
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.dismissReport}>
                        <i className="fa fa-times" />  Dismiss
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token,
        staffUUID: state.auth.userData.mcuuid
    };
}

export default connect(mapStateToProps)(Submit);