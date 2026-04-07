import React from 'react'
import OrderCard from './OrderCard'

export default function OrderHistory() {
  return (
    <div className='w-full mx-auto space-y-4'>
        

        {Array(5).fill(0).map((_, i) => (
            <OrderCard key={i} />
        ))}


    </div>
  )
}
