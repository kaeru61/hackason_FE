import SideBar from './components/sidebar/sidebar';
import { Route, Switch } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import "./App.css"
import Home from './pages/home';
import Homefollowing from './pages/home_following';
import Profile from './pages/profile';
import ProfileLikes from './pages/profileLikes';


function App() {
  return (
      <BrowserRouter>
          <SideBar/>
          <Switch>
              <Route path='/home'><Home/></Route>
              <Route path='/homefollowing'><Homefollowing/></Route>
              <Route path='/profile'>
                <Profile/>
              </Route>
              <Route path='/profileLikes'>
                <ProfileLikes/>
              </Route>
              <Route path='/postDetail'>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
