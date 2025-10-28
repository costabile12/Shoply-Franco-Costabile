
import './App.css'

import { Header } from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Routes, Route } from "react-router-dom";
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
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { RutaProtegida } from './components/RutaProtegida';
import { DetalleProducto } from './pages/DetalleProducto';
import { SearchResults } from './pages/SearchResults';

function App() {



  return (
    <div className="App d-flex flex-column  min-vh-100">

      
          <Header />
          <Main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/about" element={<About />} />

                    <Route path="/mens-clothing" element={<MensClothing />} />

                    <Route path="/womens-clothing" element={<WomensClothing />} />

                    <Route path="/jewelery" element={<Jewelery />} />

                    <Route path="/electronics" element={<Electronics />} />

                    <Route path='/exchanges-returns' element={<ExchangesReturns />} />

                    <Route path='/shipping' element={<Shipping />} />

                    <Route path='/branches' element={<Branches />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path='/login' element={<Login />} />

                    <Route path='/producto/:id' element={<DetalleProducto />}/>
                    
                    <Route path='/admin' element={
                      <RutaProtegida>
                        <Admin />
                      </RutaProtegida>  
                    } />

                    <Route path="/buscar" element={<SearchResults />} />
                </Routes>
          </Main>
          <Footer />
      

    </div>
  )
}

export default App
