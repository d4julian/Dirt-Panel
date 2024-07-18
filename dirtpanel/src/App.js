import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Logout from './redirects/Logout';
import Footer from './components/layout/Footer';
import ServerWrapper from './pages/servers/ServerWrapper';
import ServerList from './pages/serverList/ServerList';
import Login from './redirects/Login';
import Auth from './redirects/Auth';
import Nodes from './pages/ownerCenter/nodes/Nodes';
import AccessControl from './pages/ownerCenter/AccessControl';
import AuthenticationError from './pages/AuthenticationError';
import SignedOut from './pages/SignedOut';
import FTPBlacklist from './pages/ownerCenter/FTPBlacklist';

class App extends Component {
  render() {
    if(this.props.authenticated) {
      return (
        <BrowserRouter>
            <Helmet>
            </Helmet>
            <Header />
            <UniversalRoutes>
              <Redirect from="/" exact to="/dashboard" />
              {/*<Route exact path="/dashboard" component={Dashboard} />*/}
              <Redirect from="/dashboard" exact to="/servers/list" />
              <Route exact path="/servers/list" component={ServerList} />
              <Route path="/server/:id" render={(props) => <ServerWrapper key={props.match.params.id} id={props.match.params.id}/>}/>
              {/*<Route exact path="/archives/tickets/" component={TicketArchive} />*/}
              {/*<Route exact path="/archives/appeals/" component={AppealArchive} />*/}
              <Route exact path="/ownerCenter/nodes" component={Nodes} />
              <Route exact path="/ownerCenter/accessControl" component={AccessControl} />
              <Route exact path="/ownerCenter/ftpBlacklist" component={FTPBlacklist} />
              {/*<Route exact path="/sanctions/submit" component={Submit} />*/}
              <Redirect to="/dashboard" />
            </UniversalRoutes>
            <Footer />
        </BrowserRouter>
      );
    } else {
      return(
        <BrowserRouter>
        <Header />
        <UniversalRoutes>
          <Route exact path='/authError' component={AuthenticationError} />
          <Route exact path='/signedOut' component={SignedOut} />
          <Redirect to="/redirects/login" />
        </UniversalRoutes>
        <Footer />
        </BrowserRouter>
      );
    }
  }
}

function UniversalRoutes(props) {
  return(
    <Switch>
      <Route exact path="/redirects/logout" component={Logout} />
      <Route exact path="/redirects/login" component={Login}/>
      <Route exact path='/redirects/auth' component={Auth}/>
      {props.children}
    </Switch>
  );
}

const mapStateToProps = (state) => {
  return {
      authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(App);
