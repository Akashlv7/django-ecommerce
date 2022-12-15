import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <h5>
                    <Col className='text-center py-3'>Copyright &copy; Angadi</Col>
                </h5>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
