import React from 'react';

/* Components */
import { Calculator } from './components/Calculator'
import { authenticate } from './services/ws-services'
import { Initial } from './components/Initial'

import './App.css';

class  App extends React.Component {

  constructor(props) {
    super(props);

    authenticate();
    const interval = setInterval( authenticate, 25000);
    
    this.state = { interval }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <body>
          <Calculator/>
        </body>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
  
}

export default App;
