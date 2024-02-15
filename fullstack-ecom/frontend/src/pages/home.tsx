import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product-card'

const Home = () => {
  const addtoCartHandler = () => {
  }

  return (
    <div className='home'>
      <section></section>

      <h1>Latest Products
        <Link to='/search' className='findmore'>More</Link>
      </h1>

      <main>
        <ProductCard productId='akd' name='Macbook' price={100232} stock={232} photoUrl='https://m.media-amazon.com/images/I/71vFKBpKakL._SX679_.jpg' handler = {addtoCartHandler}/>
      </main>

    </div>
  )
}

export default Home