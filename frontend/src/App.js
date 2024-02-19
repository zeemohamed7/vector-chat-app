import './App.css';
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Chats from './components/Chats'

function App() {

  return (
    <div className="App">
      <Route path='/' component= {HomePage} exact />
      <Route path='/chats' component= {Chats}/>
    </div>
  );
}

export default App;
