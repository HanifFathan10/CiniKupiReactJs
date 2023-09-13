import React from 'react'
import ListImageDrink from '../component/Elements/ProductItems/ListImages/ListImageDrink'
import AuthLayouth from '../component/Layouts/AuthLayouth'
import LandingFirst from '../component/Fragment/LandingFirst'
import DrinkSlide from '../component/Elements/ProductSlide/DrinkSlide/DrinkSlide'

const DrinkPage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Drink">
        <ListImageDrink />
      </LandingFirst>
      <DrinkSlide />
    </AuthLayouth>
  )
}

export default DrinkPage