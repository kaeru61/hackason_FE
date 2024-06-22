import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import "./App.css"
import Home from './pages/home';
import Create from './pages/create';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import './App.css'
import AppHome from './AppHome';
import UserRegister from './pages/userRegister';
import PostDetailPage from './pages/postDetail';
import Profile from "./pages/profile";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/register' element={<UserRegister/>}/>
            <Route path='/app' element={<AppHome />}>
              <Route path='/app/home' element={<Home/>}/>
              <Route path='/app/profile' element={<Profile/>}/>
              <Route path='/app/editProfile'></Route>
              <Route path='/app/postDetail' element={<PostDetailPage/>}/>
              <Route path='/app/create' element={<Create/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
