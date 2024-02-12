import {lazy} from "react";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const Home = lazy(() => import("./pages/home"))
const Search = lazy(() => import('./pages/search'))
const Cart = lazy(() => import('./pages/search'))

const App = () => {
  return (
    <Router>
      {/* header */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>

      </Routes>
    </Router>
  )
}

export default App