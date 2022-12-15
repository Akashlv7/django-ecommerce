import React from 'react'
import { Alert } from 'react-bootstrap'

export default function Message({variant, children, className}) {
  return (
    <Alert variant={variant} className={className}>
      {children}
    </Alert>
  )
}
