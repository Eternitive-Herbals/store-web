import React from 'react'
import Content from './Content'

type ProductDetailProps = {
  product: any;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className=' max-w-141 w-full'>
        <Content product={product} />
    </div>
  )
}
