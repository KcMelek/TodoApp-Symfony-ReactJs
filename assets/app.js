import React from 'react';
import ReactDOM  from 'react-dom';
import TodoTable from './components/ToDoTable';
import TodoContextProvider from './contexts/ToDoContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
  render() {
      return (
          <TodoContextProvider>
            <CssBaseline>
                <TodoTable/>
            </CssBaseline>
            <ToastContainer/>
          </TodoContextProvider>
          
      );
  }
}

ReactDOM.render(
        <App/> , document.getElementById('root'));
