import React from 'react'
import AuthLayouth from '../component/Layouts/AuthLayouth'
import LandingFirst from '../component/Fragment/LandingFirst'
import ListImages from '../component/Elements/ProductItems/ListImages/ListImages'
import ProdakSlide from '../component/Elements/ProductSlide/ProdakSlide'

const CoffePage = () => {
  return (
    <AuthLayouth>
      <LandingFirst title="Coffe">
        <ListImages type="coffe"/>
      </LandingFirst>
      <ProdakSlide type="coffe"/>
    </AuthLayouth>
  )
}

export default CoffePage