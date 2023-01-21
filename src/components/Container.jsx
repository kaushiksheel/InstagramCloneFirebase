import React from 'react';
import {Container as Wrapper} from '@mui/material'

export const Container = ({children}) => {
  return (
  <Wrapper maxWidth='md'>
    {children}
  </Wrapper>
  )
}
