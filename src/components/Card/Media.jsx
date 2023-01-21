import Image from 'next/image'
import React from 'react'

export const Media = ({img}) => {


  return (
    <Image
    style={{width:'100%',objectFit:'cover'}}
    width={500}
    height={450}
    loading='lazy'
    src={img}
    alt='user dp'
    />
  )
}
