import SideBar from './components/sidebar/sidebar';
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import "./App.css"
import Home from './pages/home';
import Homefollowing from './pages/home_following';
import ProfileMine from './pages/profile';
import ProfileMineLikes from './pages/profileLikes';
import Create from './pages/create';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import './App.css'
import AppHome from './AppHome';
import UserRegister from './pages/userRegister';
import PostDetailPage from './pages/postDetail';


function App() {
  return (
      <BrowserRouter>
        <div className='appHome'>
          <Routes>
            <Route path='/main' element={<Main/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/register' element={<UserRegister/>}/>
            <Route path='/' element={<AppHome />}>
              <Route path='home' element={<Home/>}/>
              <Route path='homefollowing' element={<Homefollowing/>}/>
              <Route path='profile' element={<ProfileMine/>}/>
              <Route path='profileLikes' element={<ProfileMineLikes/>}/>
              <Route path='editProfile'></Route>
              <Route path='postDetail' element={<PostDetailPage/>}/>
              <Route path='create' element={<Create/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
