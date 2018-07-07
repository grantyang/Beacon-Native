import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
  }

  render () {
    return (<div>
      <h1>Beacon</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));