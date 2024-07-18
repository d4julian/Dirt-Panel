import React, { Component } from 'react';

class Staff extends Component {
    render() {
        return (
            <div className="block block-rounded block-bordered block-themed">
                <div className="block-header block-bg-xwork">
                    <h3 className="block-title">Staff List</h3>
                </div>
                <div className="block-content p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-vcenter table-striped mb-0">
                            <thead>
                                <tr>
                                    <th width="20%">Username</th>
                                    <th width="20%">Discord</th>
                                    <th>Rank</th>
                                    <th>Joined</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DontCarrotAll</td>
                                    <td>Lotus#9702</td>
                                    <td>Head Admin</td>
                                    <td>06/18/2019</td>
                                    <td align="right">
                                        <button type="button" className="btn btn-sm btn-primary mr-1" data-toggle="modal" data-target="#punishment-modal">
                                            <i className="fa fa-volume-mute"></i> Promote
                                                </button>
                                        <button type="button" className="btn btn-sm btn-primary mr-1" data-toggle="modal" data-target="#punishment-modal">
                                            <i className="fa fa-exclamation-triangle"></i> Demote
                                                </button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Staff;