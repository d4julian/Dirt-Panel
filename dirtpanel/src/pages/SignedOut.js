import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignedOut extends Component {
    render() {
        return (
            <main id="main-container">
                <div className="content">
                    <div className="row">
                        <div className="col" />
                        <div className="col-6">
                            <div className="block block-rounded block-bordered block-themed">
                                <div className="block-header block-bg-xwork">
                                    <h3 className="block-title">Signed out</h3>
                                </div>
                                <div className="block-content text-center">
                                    <p><b>Successfully Signed Out!</b></p>
                                    <Link to="/redirects/login" className="btn btn-sm btn-info m-2">
                                        Sign In
                                    </Link>
                                    <a href="https://dirtcraft.net/" className="btn btn-sm btn-primary m-2">
                                        Close
                                    </a>
                                    <p />
                                </div>
                            </div>
                        </div>
                        <div className="col" />
                    </div>
                </div>
            </main>
        );
    }
}

export default SignedOut;