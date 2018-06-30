import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  Prompt,
} from 'react-router-dom';

import './App.css';

const loggedIn = false;

const isActiveFunc = (match, location) => {
  console.log(match, location);
  return match;
};

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Header = ({ match }) => (
  <div className="header">
    <Route path="/multi/:param" render={() => <h1>Header</h1>} />
  </div>
);

const Body = ({ match }) => (
  <div className="body">
    <Route path="/multi/:param" render={() => <h1>Body</h1>} />
  </div>
);

class Form extends Component {
  state = { dirty: false };

  setDirty = () => { this.setState({ dirty: true }) }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <input onInput={this.setDirty} />
        <Prompt
          when={this.state.dirty}
          message="Data will be lost!"
        />
      </div>
    );
  }
}

const Menu = () => (
  <div>
    <h1>Menu</h1>
    <Link to="/menu/sub1">Sub 1</Link>
    <Link to="/menu/sub2">Sub 2</Link>
    <Link to="/menu/sub3">Sub 3</Link>
    <Route path="/menu/:subitem" render={({ match }) => {
      return <h2>{match.params.subitem}</h2>
    }} />
  </div>
);

const NavLinks = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeStyle={{ color: 'green' }} to={{ pathname: '/about' }}>About</NavLink>
    <NavLink 
      isActive={isActiveFunc} 
      activeClassName="active"
      to={{ pathname: '/about/sub' }}
    >
      About Sub
    </NavLink>
    <NavLink to="/query/?id=123">Query</NavLink>
    <NavLink to={{ pathname: '/query',  search: '?id=456' }}>Pathname</NavLink>
    <NavLink to="/notfound">Not found</NavLink>
    <NavLink to="/multi/example">Multiple</NavLink>
    <NavLink to="/menu">Menu</NavLink>
    <Link to="/old/123">Old</Link>
    <Link to="/new/456">New</Link>
    <Link to="/protected">Protected</Link>
    <Link to="/prompt">Prompt</Link>
  </nav>
);

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to={{ pathname: '/about' }}>About</Link>
    <Link to="/contact/">Contact</Link>
    <Link replace to="/info">Info</Link>
  </nav>
);

const App = () => (
  <Router>
    <div>
      <NavLinks />
      <Switch>
        <Route exact path="/" component={Home} /> 
        <Route path="/about" component={About} /> 
        <Route strict path="/contact/" render={() => <h1>Contact</h1>} /> 
        <Route path="/info" children={({ match }) => match && <h1>Info</h1>} />
        <Route path="/page/:page?/:subpage?" render={({ match }) => (
          <h1>
            PAGE: {match.params.page || 'home'}<br />
            SUBPAGE: {match.params.subpage}
          </h1>
        )} /> 
        <Route path="/page2/:page?-:subpage?" render={({ match }) => (
          <h1>
            PAGE: {match.params.page || 'home'}<br />
            SUBPAGE: {match.params.subpage}
          </h1>
        )} />
        <Route path="/:a(\d+)/:b" render={({ match }) => (
          <h1>
            Param A: {match.params.a}<br />
            Param B: {match.params.b}
          </h1>
        )} />
        <Route path="/:a(\d{2}-\d{2}-\d{4})/:b" render={({ match }) => (
          <h1>
            Param A: {match.params.a}<br />
            Param B: {match.params.b}
          </h1>
        )} />
        <Route path="/:a(\d{2}-\d{2}-\d{4}):b(\.[a-z]+)?" render={({ match }) => (
          <h1>
            Param A: {match.params.a}<br />
            Param B: {match.params.b}
          </h1>
        )} />
        <Route path="/query" render={({ match, location }) => (
          <div>
            <p>root</p>
            <p>{JSON.stringify(match)}</p>
            <p>{JSON.stringify(location)}</p>
            <p>{new URLSearchParams(location.search).get('id')}</p>
          </div>
        )} />
        <Route path="/menu" component={Menu} />
        <Route path="/new/:str" render={({ match }) => <h1>New: {match.params.str}</h1>} />
        <Route path="/old/:str" render={({ match }) => <Redirect to={`/new/${match.params.str}`} />} />
        <Route path="/protected" render={() => (
          loggedIn ?
          <h1>Welcome to the protected page</h1> :
          <Redirect to="/new/login" />
        )} />
        {/* <Redirect from="/old" to="/new" /> */}
        <Route path="/prompt" component={Form} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      <Header />
      <Body />
    </div>
  </Router>
);

export default App;
