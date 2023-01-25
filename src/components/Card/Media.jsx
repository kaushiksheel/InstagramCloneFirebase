import Image from 'next/image'
import React from 'react'

export const Media = ({img}) => {


  return (
    <Image
    style={{objectFit:'cover'}}
    loading='lazy'
    src={img}
    alt='user dp'
    fill

    />
  )
}
