import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import history from '../history'
import UserLogin from './user/UserLogin'
import UserRegister from './user/UserRegister'
import UserProfileUpdate from './user/UserProfileUpdate'
//import UserLogout from './user/UserLogout';
import PostCreate from './post/PostCreate';
import PostDelete from './post/PostDelete';
import PostUpdate from './post/PostUpdate';
import PostList from './post/PostList';
import PostView from './post/PostView';

class App extends React.Component {
  routerList () {
    return (
      <div className='ui container'>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path='/user/login' exact component={UserLogin} />
              <Route path='/user/register' exact component={UserRegister} />
              <Route path='/user/profileUpdate/:id' exact component={UserProfileUpdate} />
              {/* <Route path='/user/logout' exact component={UserLogout} /> */}

              <Route path='/post/create' exact component={PostCreate} />
              <Route path='/post/delete/:id' exact component={PostDelete} />
              <Route path='/post/update/:id' exact component={PostUpdate} />
              <Route path='/' exact component={PostList} />
              <Route path='/post/view/:id' exact component={PostView} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }

  render () {
    return <div>
             {this.routerList()}
           </div>
  }
}

export default App
