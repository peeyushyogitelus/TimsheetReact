import './App.css';
import './www/css/style_generic.css';
import {Layout} from './Layout/layout'
import {DateChange} from './DateChange/datechange'
import {Users} from './Users/users';
import {Timesheet} from './Timesheet/timesheet'

function App() {
  return (
    <div className="App">
      <Layout />
      <DateChange />
      <Users />
      <Timesheet />
    </div>
  );
}

export default App;
