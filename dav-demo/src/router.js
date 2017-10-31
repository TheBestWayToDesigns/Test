import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import login from './routes/login/LoginForm';
import menu from './routes/menu/menu';
import App from './routes/MyApp/app';
import HomeLayout from './routes/menu/HomeLayout';
import LoginPage from './routes/pages/Login';
import HomePage from './routes/pages/Home';
import UserEditPage from './routes/pages/UserEdit';
import UserListPage from './routes/pages/UserList';
import UserAddPage from './routes/pages/UserAdd';
import BookListPage from './routes/pages/BookList';
import BookEditPage from './routes/pages/BookEdit';
import BookAddPage from './routes/pages/BookAdd';
// import menu from './components/Layout/Sider';

function RouterConfig({ history }) {
  console.log('router#history=', history);
  console.log('router#historythis=', this);
  return (
    <Router history={history}>
      {/*<Route path="/" component={IndexPage} />*/}
      {/*<Route path="/login" component={login} />*/}
      {/*<Route path="/menu" component={menu} />*/}
      {/*<Route path="/app" component={App} />*/}
      <Route component={HomeLayout}>
        <Route path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/edit/:uid" component={UserEditPage} />
        <Route path="/book/add" component={BookAddPage} />
        <Route path="/book/list" component={BookListPage} />
        <Route path="/book/edit/:id" component={BookEditPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default RouterConfig;
