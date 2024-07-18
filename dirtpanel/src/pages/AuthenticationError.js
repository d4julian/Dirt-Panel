import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AuthenticationError extends Component {
    render() {
        var authError;
        switch (this.props.authError) {
            case "MISSING_CODE":
                authError = "Missing Discord OAuth2 code.";
                break;
            case "AUTHENTICATION_FAILED":
                authError = "Discord authentication failed.";
                break;
            case "USER_DISABLED":
                authError = "Account suspended.";
                break;
            case "USER_NOT_VERIFIED":
                authError = "Discord account not verified.";
                break;
            case "USER_NOT_STAFF":
                authError = "No staff rank found.";
                break;
            default:
                authError = "Error unknown.";
                break;
        }

        return (
            <main id="main-container">
                <div className="content">
                    <div className="row">
                        <div className="col" />
                        <div className="col-6">
                            <div className="block block-rounded block-bordered block-themed">
                                <div className="block-header block-bg-xwork">
                                    <h3 className="block-title">Authentication Error</h3>
                                </div>
                                <div className="block-content text-center">
                                    <p><b>Error: {authError}</b></p>
                                    <p>
                                        If you believe this to be an error, please reach out to a manager immediately.
                                        For those of you who are members of staff, appropriate access to this dashboard is crucial.
                                        For those of you who are not, this is DirtCraft's staff control panel. You have no reason to be here.
                                    </p>
                                    <p>If you are a member of staff, you may attempt to reauthenticate using the button below. Otherwise, the close button will take you back to our public website.</p>
                                    <Link to="/redirects/login" className="btn btn-sm btn-info m-2">
                                        Reauthenticate
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

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError || "",
    }
}

export default connect(mapStateToProps)(AuthenticationError);