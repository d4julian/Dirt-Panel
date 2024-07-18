import React, { Component } from 'react';

class Login extends Component {
    componentDidMount() {
        // TODO Change this maybe?
        var redirectURI = encodeURIComponent(window.location.href.replace('redirects/login', 'redirects/auth'));
        window.location.assign(`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code&scope=identify`)
    }
    render() {
        return (
            <section>Redirecting...</section>
        )
    }
}

export default Login;