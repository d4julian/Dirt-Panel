import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditModal extends Component {
    /*
    
Type - RW
Duration - RW
On Behalf Of - W
Date - R
Duration - R
Server - RW
In-Game Reason - R
Full Reason - W
Appeal Status - RW
Evidence
    */
    render() {
        return (
            <div className="modal fade" id="edit-modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Punishment Report - {this.props.id}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" value="_Cin0x_" disabled />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Punisher</label>
                                        <input type="text" className="form-control" value="TechDweebGaming" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.authData.token
    };
}

export default connect(mapStateToProps)(EditModal);