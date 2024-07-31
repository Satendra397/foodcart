
import { BrowserRouter,   Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import FoodList from './component/FoodList';
import Register from './component/Register';

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='/foodlist' element={<FoodList/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
</Routes>

</BrowserRouter>
  );
}

export default App;
