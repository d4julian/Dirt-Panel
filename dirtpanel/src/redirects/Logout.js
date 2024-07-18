import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/authActions';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to='/signedOut' />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);