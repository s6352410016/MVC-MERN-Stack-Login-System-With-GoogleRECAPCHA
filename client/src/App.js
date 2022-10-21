import {BrowserRouter , Routes , Route , Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Forgot from './components/Forgot';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/forgot' element={<Forgot />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
