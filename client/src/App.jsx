import {
  Route,
  Routes,
} from 'react-router-dom';

import Dashboard from './Dashboard';

function App() {

  return (

      <Routes>
        <Route index element={<Dashboard/>}/>
      </Routes>
  );
}

export default App;
