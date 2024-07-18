import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../actions/authActions';

class Authenticate extends Component {
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        this.props.authenticate(values.code);
    }

    render() {
        return (
            <Redirect to='/authError' />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        authError: state.auth.authError || "",
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (code) => dispatch(authenticate(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);