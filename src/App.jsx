
import './App.css'

import { Header } from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home"
import {About} from "./pages/About"
import {Contact} from "./pages/Contact"
import {MensClothing} from "./pages/MensClothing"
import { WomensClothing } from './pages/WomensClothing';
import {Jewelery} from "./pages/Jewelery"
import { Electronics } from './pages/Electronics';
import { ExchangesReturns } from './pages/ExcgangesReturns';
import { Shipping } from './pages/Shipping';
import { Branches } from './pages/Branches';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {

  const [cart, setCart] = useState(()=>{
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleAddToCart = (product) => {

    const exist = cart.find((item)=> item.id === product.id);

    if(exist){
      //Si ya está, aumentamos la cantidad
      setCart(
        cart.map(item => item.id === product.id ?
            {...item, cantidad: item.cantidad+1}: item )
      );
    }else {
      // Si no está en el carrito, lo agego con cantidad 1
      setCart(
        [...cart, {...product, cantidad:1}]
        
      );
      alert(`Se agrego ${product.title} al carrito`);
    }

    
    

  };

  const handlecleanCart = () => {
    setCart([]);
    
  }

  const handleDeleteProductCart = (product) => {
    let newCart = cart.filter((item) => item.id != product.id);
    setCart(newCart);
    alert(`Se elimino ${product.title} del carrito`)
  };

  const handleIncreanseQuantity = (id) => {
    setCart(
      cart.map( item => item.id===id ? {...item, cantidad: item.cantidad +1}: item)
    )
  }

  const handleDecreanseQuantity = (id) => {
    setCart(
      cart.map(item => item.id === id ? {...item, cantidad: item.cantidad-1}:item).filter(item => item.cantidad > 0)
    )
  }

  useEffect(()=> {
    localStorage.setItem("carrito",JSON.stringify(cart));
  },[cart])



  return (
    <div className="App d-flex flex-column  min-vh-100">

      <Router basename="/Shoply-Franco-Costabile/">
          <Header carrito={cart} handleClean={handlecleanCart} handleDeleteProductCart={handleDeleteProductCart} handleIncreanseQuantity={handleIncreanseQuantity} handleDecreanseQuantity={handleDecreanseQuantity} />
          <Main>
                <Routes>
                    <Route path="/" element={<Home handleAddToCart={handleAddToCart}/>} />
                    
                    <Route path="/about" element={<About />} />

                    <Route path="/mens-clothing" element={<MensClothing  handleAddToCart={handleAddToCart}/>} />

                    <Route path="/womens-clothing" element={<WomensClothing  handleAddToCart={handleAddToCart}/>} />

                    <Route path="/jewelery" element={<Jewelery handleAddToCart={handleAddToCart}/>} />

                    <Route path="/electronics" element={<Electronics handleAddToCart={handleAddToCart}/>} />

                    <Route path='/exchanges-returns' element={<ExchangesReturns />} />

                    <Route path='/shipping' element={<Shipping />} />

                    <Route path='/branches' element={<Branches />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path='/login' element={<Login />} />

                    <Route path='/admin' element={<Admin />} />
                </Routes>
          </Main>
          <Footer />
      </Router>

    </div>
  )
}

export default App
