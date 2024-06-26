import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
