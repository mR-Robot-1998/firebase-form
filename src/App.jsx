import Form from './Components/Form/Form';
import User from './Components/User/User';
import {Routes,Route, Link} from 'react-router-dom';
function App() {

  return (
    <>
    <Routes>
      <Route path='/users' element={<User/>} />
      <Route path='/sing' element={<Form/>} />
    </Routes>
    <Link to='/users'>Users</Link>
    <br />
    <Link to='/sing'>SignUp</Link>
    </>
  )
}

export default App
