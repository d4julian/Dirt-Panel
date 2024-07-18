import React, { Component } from 'react';
let height300 = {
    height: '300px',
};

class Server extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Server Stats</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                        Interactive Area Chart
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <div id="interactive" style={height300}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Server;
