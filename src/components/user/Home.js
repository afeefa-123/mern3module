import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap';
import Sidebar from '../Sidebar';

function Home() {
  return (
    <div>
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Sidebar/>
      <h1>hello user</h1>
    </div>
  )
}

export default Home
