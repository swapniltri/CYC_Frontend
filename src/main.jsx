import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.js';
import './main.css';
import App from './App.jsx';
import MessageDisplay from './components/messageDisplay/MessageDisplay.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    <MessageDisplay />
  </Provider>
  // </StrictMode>,
)
