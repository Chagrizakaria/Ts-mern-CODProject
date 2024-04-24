import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>CODProject</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/Cart" className="nav-link">
              Cart
            </a>
            <a href="/Signin" className="nav-link">
              Sign in
            </a>
          </Nav>
        </Navbar>{' '}
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        {' '}
        <div className="text-center"> All right reserved</div>
      </footer>
    </div>
  )
}

export default App
