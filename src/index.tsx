import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

(async () => {
  try {
    const { endpoints, tableConfig } = await fetch(
      'http://localhost:3002/app/config',
    ).then((r) => r.json());

    ReactDOM.render(
      <StripeProvider apiKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh'>
        <App appConfig={{ endpoints }} tableConfig={tableConfig} />
      </StripeProvider>,
      document.getElementById('root'),
    );
  } catch (e) {
    console.error('Error loading AppConfig', e);
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
