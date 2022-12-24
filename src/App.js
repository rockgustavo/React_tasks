
import { BrowserRouter } from 'react-router-dom';

import RoutesApp from './routes';

import Header from './components/Header';
import NavBar from './components/NavBar';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  console.log()

  return (
    <>
      {
        <BrowserRouter>
          <ToastContainer autoClose={2500} theme="colored"/>
          <RoutesApp />
        </BrowserRouter>
      }
    </>
  );
}

export default App;
