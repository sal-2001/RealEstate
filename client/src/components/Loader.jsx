import React from 'react'
import BarLoader from 'react-spinners/BarLoader';
export default function Loader() {
  return (
    <div className='flex flex-col justify-center h-full items-center py-60'>
        <BarLoader color="#3f4544"/>
    </div>
    
  )
}
