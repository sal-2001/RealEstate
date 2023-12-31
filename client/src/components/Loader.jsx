import React from 'react'
import BarLoader from 'react-spinners/BarLoader';
import BounceLoader from 'react-spinners/BounceLoader';
export default function Loader() {
  return (
    <div className='flex flex-col justify-center h-full items-center py-60'>
        <BarLoader color="#3f4544"/>
    </div>
    
  )
}
export function BncLoader(){
  return <div className='flex justify-center min-h-screen items-center py-60'>
  <BounceLoader color="#3f4544"/>
</div>
}
