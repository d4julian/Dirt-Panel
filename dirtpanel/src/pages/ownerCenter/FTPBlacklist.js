import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import ProtectedContent from '../../components/ProtectedContent';
import PaginationWrapper from '../../components/PaginationWrapper';

class FTPBlacklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blacklistEntries: [],
            newBlacklistFileEntry: "",
            newBlacklistDirectoryEntry: ""
        };

        this.fetchBlacklistEntries = this.fetchBlacklistEntries.bind(this);
        this.addBlacklistEntry = this.addBlacklistEntry.bind(this);
    }

    componentDidMount() {
        this.fetchBlacklistEntries();
    }

    fetchBlacklistEntries() {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}ftpBlacklist/getAll`)
            .then(response => {
                if (!response.data.success) return;
                this.setState({
                    blacklistEntries: response.data.blacklistEntries
                });
            }).catch(error => { });
    }

    addBlacklistEntry(isDirectory) {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}ftpBlacklist/add`, {
            token: this.props.token,
            path: isDirectory ? this.state.newBlacklistDirectoryEntry : this.state.newBlacklistFileEntry,
            isDirectory: isDirectory
        }).then(() => {
            this.fetchBlacklistEntries();
            swal({
                title: "Blacklist Entry Added",
                text: "Blacklist Entry Successfully Added!",
                icon: "success"
            });
        }).catch(() => {
            swal({
                title: "Error",
                text: "Entry already exists!",
                icon: "error"
            });
        }).finally(() => {
            if (isDirectory) this.setState({ newBlacklistDirectoryEntry: "" });
            else this.setState({ newBlacklistFileEntry: "" });
        });
    }

    render() {
        return (
            <ProtectedContent requiredRank="owner" requireCheck={true} useHighestRank={true} redirect={true}>
                <main id="main-container">
                    <div className="content content-full">
                        <div className="row">
                            <div className="col-6">
                                <div className="block block-rounded block-bordered block-themed">
                                    <div className="block-header block-bg-xwork">
                                        <h3 className="block-title">FTP Blacklist</h3>
                                        <div className="block-options">
                                            <button className="btn btn-info" onClick={this.fetchBlacklistEntries}>
                                                <i className="fas fa-sync-alt" />
                                            </button>
                                        </div>
                                    </div>
                                    <PaginationWrapper elements={this.state.blacklistEntries} pageLength={8} key={this.state.blacklistEntries}>
                                        <FTPBlacklistTable fetchBlacklistEntries={this.fetchBlacklistEntries} token={this.props.token} />
                                    </PaginationWrapper>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="block block-rounded block-bordered block-themed">
                                    <div className="block-header block-bg-xwork">
                                        <h3 className="block-title">Add Blacklist Entry</h3>
                                    </div>
                                    <div className="block-content block-content-full">
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Blacklist File</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">~ServerHome/</span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="..." maxLength="512" onChange={e => this.setState({ newBlacklistFileEntry: e.target.value })} value={this.state.newBlacklistFileEntry} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-success" onClick={() => this.addBlacklistEntry(false)}>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label>Blacklist Directory</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">~ServerHome/</span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="..." maxLength="512" onChange={e => this.setState({ newBlacklistDirectoryEntry: e.target.value })} value={this.state.newBlacklistDirectoryEntry} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text">/*</span>
                                                            <button className="btn btn-success" onClick={() => this.addBlacklistEntry(true)}>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </ProtectedContent>
        );
    }
}

class FTPBlacklistTable extends Component {
    render() {
        return (
            <div className="block-content p-0">
                <div className="table-responsive">
                    <table className="table table-hover table-vcenter table-striped mb-0">
                        <thead>
                            <tr>
                                <th>File/Directory Path</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.pageElements.map(entry =>
                                    <FTPBlacklistEntry key={entry.id} id={entry.id} path={entry.path} isDirectory={entry.isDirectory} fetchBlacklistEntries={this.props.fetchBlacklistEntries} token={this.props.token} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class FTPBlacklistEntry extends Component {
    constructor(props) {
        super(props);

        this.removeBlacklistEntry = this.removeBlacklistEntry.bind(this);
    }

    removeBlacklistEntry() {
        swal({
            title: "Confirm Blacklist Entry Deletion",
            text: `Once confirmed, this entry will be deleted forever! You will need to recreate this blacklist entry if you wish to revert this change. Proceed with caution!\n
            Path: ~ServerHome/${this.props.path}${this.props.isDirectory ? "/*" : ""}
            Type: ${this.props.isDirectory ? "Directory" : "File"}`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((confirmed) => {
            if(!confirmed) return;

            axios.post(`${process.env.REACT_APP_API_ENDPOINT}ftpBlacklist/remove`, {
                token: this.props.token,
                id: this.props.id
            }).then(() => {
                this.props.fetchBlacklistEntries();
                swal({
                    title: "Blacklist Entry Deleted",
                    text: "Blacklist Entry Successfully Deleted!",
                    icon: "success"
                });
            }).catch(error => {
                console.log(error.response.data.error);
                swal({
                    title: "Error",
                    test: error.response.data.error,
                    icon: "error"
                });
            });
        })
    }

    render() {
        return (
            <tr>
                <td>
                    <i className={`fas ${this.props.isDirectory ? 'fa-folder' : 'fa-file'}`} />
                    &nbsp;&nbsp;~ServerHome/<span style={{ fontWeight: "bold" }}>{this.props.path}</span>{this.props.isDirectory ? "/*" : ""}
                </td>
                <td align="right">
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.removeBlacklistEntry}>
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

export default connect(mapStateToProps)(FTPBlacklist);