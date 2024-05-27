import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import {Routes,Route} from 'react-router-dom'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Login from './Components/Login';

function App() {
  return (
    <>
      {/* <Navbar></Navbar> */}
      
      {/* <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/About' element={<Footer></Footer>}></Route>
      </Routes> */}
      {/* <Routes>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes> */}
      <Home></Home>
    </>
    
  );
}

export default App;
