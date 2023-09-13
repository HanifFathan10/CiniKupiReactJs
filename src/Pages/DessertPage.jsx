import React from 'react'
import AuthLayouth from '../component/Layouts/AuthLayouth';
import LandingFirst from '../component/Fragment/LandingFirst';
import ListImageDessert from '../component/Elements/ProductItems/ListImages/ListImageDessert';
import DessertSlide from '../component/Elements/ProductSlide/DessertSlide/DessertSlide';

const DessertPage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Dessert">
        <ListImageDessert />
      </LandingFirst>
      <DessertSlide />
    </AuthLayouth>
  )
}

export default DessertPage;