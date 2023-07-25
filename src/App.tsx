import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Calendar from './Pages/Calendar/Calendar';
function App() {
  return (
    <div className="App">
      <Router>
              <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="*" element={<div className='NotFound'> 404 NOT FOUND </div>} />
              </Routes>
            </Router>
    </div>
  );
}

export default App;
