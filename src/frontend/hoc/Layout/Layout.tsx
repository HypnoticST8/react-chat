import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './Layout.css'

import Chat from '../../containers/Chat/Chat'

const layout = (props: object) => {
  return (
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  )
}

export default layout