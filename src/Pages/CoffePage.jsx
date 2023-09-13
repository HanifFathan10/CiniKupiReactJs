import React from 'react'
import ListImageCoffe from '../component/Elements/ProductItems/ListImages/ListImageCoffe'
import AuthLayouth from '../component/Layouts/AuthLayouth'
import LandingFirst from '../component/Fragment/LandingFirst'
import CoffeSlide from '../component/Elements/ProductSlide/CoffeSlide/CoffeSlide'

const CoffePage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Coffe">
        <ListImageCoffe/>
      </LandingFirst>
      <CoffeSlide></CoffeSlide>
    </AuthLayouth>
  )
}

export default CoffePage