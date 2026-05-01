import React from 'react'
import Content from './Content'

export default function ProductDetail({ product }: { product: any }) {
  return (
    <div className=' max-w-141 w-full'>
        <Content product={product} />
    </div>
  )
}
