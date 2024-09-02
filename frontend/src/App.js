
import { BrowserRouter,   Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import FoodList from './component/FoodList';
import Register from './component/Register';
import FoodDetails from './component/FoodDetails';
import Cart from './component/Cart';
import { CartProvider } from './component/CartContext';

function App() {
  const userId = 1; // Assuming you have a way to get the logged-in user ID
  return (
<BrowserRouter>
<CartProvider userId={userId}>
<Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='/foodlist' element={<FoodList/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route path='/fooddetails/:id' element={<FoodDetails/>}></Route>
  <Route path='/cart' element={<Cart  />}></Route>

</Routes>
</CartProvider>
</BrowserRouter>
  );
}

export default App;
