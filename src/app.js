import ReactDOM from 'react-dom'
import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'

// components
import App from './pages/App'
import Login from 'bundle-loader?lazy&name=app-[name]!./pages/Login'

// stores

// combine stores
const stores = {}

window._____APP_STATE_____ = stores

useStrict(true)

const Root = () =>
  <Provider {...stores}>
    <Router>
      {/* <Route path="/" exact component={App}></Route> */}
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <div>
          <Route path="/" exact component={App}></Route>
          <Route path="/login" exact component={Login}></Route>
        </div>
      </div>
      {/* <Route path="/" component={Login}></Route> */}
      {/* <IndexRoute component={ListBooks} />
             <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <Route path="editor" component={Editor} />
            <Route path="editor/:slug" component={Editor} />
            <Route path="article/:id" component={Article} />
            <Route path="settings" component={Settings} />
            <Route path="@:username" component={Profile} />
            <Route path="@:username/favorites" component={Profile} /> */}
    </Router>
  </Provider>

ReactDOM.render(<Root />, document.getElementById('root'))
