import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

  )
 
}

export default App;
