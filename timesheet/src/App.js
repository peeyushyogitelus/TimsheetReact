import './App.css';
import { Route, Switch } from 'react-router-dom';
import AuthProvider from './AuthContext/Authenticate';
import AuthContext from './AuthContext/AuthDetails';


function App() {
  return (
    <div>
      <AuthContext.Provider value="{}" >
        <Switch>
          <Route path="/">
            <AuthProvider />
          </Route>
        </Switch>
      </AuthContext.Provider>


    </div>
  );
}

export default App;
