import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <main id="main-container">
                {/*<div className="content">
                    <div className="row">
                        <div className="col-md-6 col-xl-3">
                            <div className="block block-rounded mb-0">
                                <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                    <div>
                                        <i className="fas fa-2x fa-tachometer-alt"></i>
                                    </div>
                                    <div className="ml-3 text-right">
                                        <p className="font-size-h3 font-w300 mb-0">
                                            56%
                                        </p>
                                        <p className="text-muted mb-0">
                                            CPU Usage
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="block block-rounded mb-0">
                                <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                    <div>
                                        <i className="fas fa-2x fa-users"></i>
                                    </div>
                                    <div className="ml-3 text-right">
                                        <p className="font-size-h3 font-w300 mb-0">
                                            186
                                        </p>
                                        <p className="text-muted mb-0">
                                            Players Online
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="block block-rounded mb-0">
                                <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                    <div>
                                        <i className="fas fa-2x fa-money-bill"></i>
                                    </div>
                                    <div className="ml-3 text-right">
                                        <p className="font-size-h3 font-w300 mb-0">
                                            5
                                        </p>
                                        <p className="text-muted mb-0">
                                            Donations Today
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="block block-rounded mb-0">
                                <div className="block-content block-content-full d-flex align-items-center justify-content-between">
                                    <div>
                                        <i className="fas fa-2x fa-user-plus"></i>
                                    </div>
                                    <div className="ml-3 text-right">
                                        <p className="font-size-h3 font-w300 mb-0">
                                            34
                                        </p>
                                        <p className="text-muted mb-0">
                                            New Players Today
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="block block-rounded block-bordered block-themed">
                        <div className="block-header block-bg-xwork">
                           <h3 className="block-title">Pending Punishment Reports</h3>
                        </div>
                        <div className="block-content p-0">
                           <div className="table-responsive">
                               <table className="table table-hover table-vcenter table-striped mb-0">
                                   <thead>
                                       <tr>
                                           <th>Date</th>
                                           <th>Username</th>
                                           <th>Type</th>
                                           <th>Reason</th>
                                           <th>Server</th>
                                           <th></th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr>
                                           <td>Jan 20, 2020 5:33pm</td>
                                           <td><b>SomeGuy</b><br />UUID</td>
                                           <td><b>Ban</b><br />Pernament</td>
                                           <td>Greifing spawn</td>
                                           <td>StoneBlock 2</td>
                                           <td>
                                                <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#punishment-modal">
                                                    <i className="fa fa-pencil-alt"></i> Report
                                                </button></td>
                                       </tr>
                                   </tbody>
                               </table>
                           </div>
                        </div>
                    </div>
                </div>*/}
                <div className="content">
                    <div className="block block-rounded block-bordered block-themed">
                        <div className="block-header block-bg-xwork">
                           <h3 className="block-title">Dashboard Content Coming Soon!</h3>
                        </div>
                    </div>
                </div>
                {/*
             <div className="modal fade" id="punishment-modal">
                     <div className="modal-dialog modal-lg">
                       <div className="modal-content">
                         <div className="modal-header">
                           <h4 className="modal-title">Punishment Report - AGuyNamedBoris</h4>
                           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                           </button>
                         </div>
                         <div className="modal-body">
                             <div className="row">
                                 <div className="col-6">
                                      <div className="form-group">
                                     <label>Username</label>
                                     <input type="text" className="form-control" value="TrademarkNoob" disabled />
                                 </div>
                                 </div>
                                 <div className="col-6">
                                      <div className="form-group">
                                     <label>Origin Server</label>
                                     <input type="text" className="form-control" value="StoneBlock 2" disabled />
                                 </div>
                             </div>
                             </div>
                             <div className="row">
                                 <div className="col-6">
                                     <div className="form-group">
                                         <label>Type</label>
                                        <input type="text" className="form-control" value="Permament Ban" disabled />
                                    </div>
                                 </div>
                                 <div className="col-6">
                                     <div className="form-group">
                                         <label>Expires</label>
                                        <input type="text" className="form-control" value="Never" disabled />
                                    </div>
                                 </div>

                             </div>
                             <div className="row">
                                 <div className="col-6">
                                     <div className="form-group">
                                        <label>On Behalf Of:</label>
                                        <input type="text" className="form-control" value="Shiny" />
                                       </div>
                                 </div>
                                 <div className="col-6">
                                      <div className="form-group">
                                     <label>Target Server</label>
                                     <select className="form-control">
                                      <option>Hub</option>
                                    </select>
                                 </div>
                             </div>
                             </div>

                                 <div className="form-group">
                                    <label>Reason</label>
                                    <textarea className="form-control">Total noob</textarea>
                                   </div>
                                   <div className="form-group">
                                <label for="customFile">Upload Evidence</label>
                                <div className="custom-file">
                                                <input type="file" className="custom-file-input" data-toggle="custom-file-input" id="example-file-input-multiple-custom" name="example-file-input-multiple-custom" multiple />
                                                <label className="custom-file-label" for="example-file-input-multiple-custom">Choose files</label>
                                            </div>

                              </div><div className='row'>
                            <div className='col-6'>
                                <div className="alert alert-success alert-dismissable" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <p className="mb-0 js-gallery"><a className="alert-link img-lightbox" href="https://i.imgur.com/5yjSRrf.png">2020-01-07_19.27.45.jpg</a></p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="alert alert-success alert-dismissable" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <p className="mb-0 js-gallery"><a className="alert-link img-lightbox" href="https://i.imgur.com/5yjSRrf.png">2020-01-07_19.26.13.jpg</a></p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="alert alert-success alert-dismissable" role="alert">
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <p className="mb-0 js-gallery"><a className="alert-link img-lightbox" href="https://i.imgur.com/5yjSRrf.png">2020-01-07_19.26.13.jpg</a></p>
                                </div>
                            </div>
                         </div></div>
                         <div className="modal-footer justify-content-between">
                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                           <button type="button" className="btn btn-primary">Submit Report</button>
                         </div>
                       </div>
                     </div>
                 </div>
                 */}
                </main>
        )
    }
}
//swal("Pending Punishment Reports", 'You have unfished punishment reports!\nPlease fill them out as soon as possible.', "warning")

export default Dashboard;
