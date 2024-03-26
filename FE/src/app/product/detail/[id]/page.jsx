import ProductDetail from '@/components/pages/product/ProductDetail'
import React from 'react'

export default function page({id}) {
  return (
    <div>
        <ProductDetail id={id}/>
    </div>
  )
}
