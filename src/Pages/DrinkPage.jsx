import React from 'react'
import AuthLayouth from '../component/Layouts/AuthLayouth'
import LandingFirst from '../component/Fragment/LandingFirst'
import ListImages from '../component/Elements/ProductItems/ListImages/ListImages'
import ProdakSlide from '../component/Elements/ProductSlide/ProdakSlide'

const DrinkPage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Drink">
        <ListImages type="drink" />
      </LandingFirst>
      <ProdakSlide type="drink" />
    </AuthLayouth>
  )
}

export default DrinkPage