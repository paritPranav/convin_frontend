import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Switch,Link, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import AllCards from './components/AllCards';
import AllBucket from './components/AllBuckets';
import CreateCard from './components/CreateCard';
import CreateBucket from './components/CreateBucket';
function App() {
  return (
  <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/buckets' element={<AllBucket/>}  ></Route>
          <Route path='/:bucket/cards' element={<AllCards/>}></Route>
          <Route path='/:bucket/createCard' element={<CreateCard/>}></Route>
          <Route path='/createBucket' element={<CreateBucket/>}></Route>
        </Routes>
        
      </Router>
  </>
  );
}

export default App;
