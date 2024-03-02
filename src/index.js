import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    TreeItem: {
      defaultProps: {
        // The default props to change
        nodeId: {Type: Number}, // No more ripple, on the whole application 💣!
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
