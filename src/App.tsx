import { BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import AppRoutes from './Router';

const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter></>

  );
};

export default App;
