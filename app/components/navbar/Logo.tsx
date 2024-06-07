import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className=" m-2 py-1 h-14 cursor-pointer flex items-center space-x-2">
      
        <Image src="/omegleLogo.png" alt="Logo" width={200} height={200} />
     
     
        <Image src="/logo2.png" alt="Logo" width={200} height={200} />
      
</div>

  )
}

export default Logo