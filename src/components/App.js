import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import history from '../history'
import NotFound from './user/NotFound'
import UserLogin from './user/UserLogin'
import UserRegister from './user/UserRegister'
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
              <Route path='/' exact component={UserLogin} />
              <Route path='/user/register' exact component={UserRegister} />
              
              <Route path='/post/create' exact component={PostCreate} />
              <Route path='/post/delete/:id' exact component={PostDelete} />
              <Route path='/post/update/:id' exact component={PostUpdate} />
              <Route path='/post/list/:id' exact component={PostList} />
              <Route path='/post/view/:id' exact component={PostView} />

              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.routerList()}
      </div>
    )
  }
}

export default App
