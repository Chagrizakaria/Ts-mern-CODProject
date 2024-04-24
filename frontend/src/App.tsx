import { sampleProducts } from './data'
import {  Navbar,Container,Nav, Row, Col} from "react-bootstrap"
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>  
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            CODProject
          </Navbar.Brand>
        </Container>
        <Nav>
<a href="/Cart" className='nav-link'>Cart</a>
<a href="/Signin" className='nav-link'>Sign in</a>
        </Nav>
        </Navbar> </header>
      <main>
        <Container className='mt-3'>
        <Row>
          {sampleProducts.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>{product.price} DH</p>
            </Col>
          ))}
        </Row>
        </Container>
        
      </main>
      <footer> <div className='text-center'> All right reserved
        </div></footer>
    </div>
  )
}

export default App
