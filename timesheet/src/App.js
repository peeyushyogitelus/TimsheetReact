import './App.css';
import { Route, Switch } from 'react-router-dom';
import AuthProvider from './AuthContext/Authenticate';


function App() {
  return (
    <div>
     
        <Switch>
          <Route path="/" component={AuthProvider} />
        </Switch>
     


    </div>
  );
}

export default App;
