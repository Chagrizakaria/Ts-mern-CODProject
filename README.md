# TypeScript MERN CODProject

## Lessons

1. Introduction
2. Install Tools
3. Create TypeScript React App By Vite
4. Create Git Repository
   1. add README.md
   2. create github account
   3. connect vs code to github
   4. publish repository
5. List Products
   1. create Product type
   2. create products array
   3. add product images
   4. render products
6. Add React Bootstrap
   1. npm install react-bootstrap bootstrap
   2. import bootstrap css
   3. update App.tsx   
7. Add page routing
   1. npm i react-router-dom
   2. create route for home page
   3. create router for product page
   4. add helmet for settting page title   

# Video 08: Create Node Server

1. create backend folder
   cd backend
   npm init

2. config typescript
   npm install --save-dev typescript ts-node-dev
   create tsconfig.json

   ```json
   {
     "compilerOptions": {
       "target": "es2015",
       "outDir": "./build",
       "strict": true,
       "module": "commonjs",
       "esModuleInterop": true
     }
   }
   ```

   add dev and build command to package.json
   `"dev": "ts-node-dev --respawn --transpile-only --files src/index.ts",`

3. config eslint
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   create .eslintrc.js

   ```js
   module.exports = {
     env: {
       es2016: true,
       node: true,
     },
     extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'es2016',
       sourceType: 'module',
     },
     plugins: ['@typescript-eslint'],
   }
   ```

4. create express server
   npm install express
   npm install --save-sev @types/express

5. create src/index.ts
   copy data.ts and Product.ts from frontend to backend

   ```js
   import express, { Request, Response } from 'express'
   import { sampleProducts } from './data'
   const app = express()
   app.get('/api/products', (req: Request, res: Response) => {
     res.json(sampleProducts)
   })
   const PORT = 4000
   app.listen(PORT, () => {
     console.log(`server started at http://localhost:${PORT}`)
   })
   ```

6. npm start



# Video 09: Fetch Products

1. install axios
   npm install axios
   in main.tsx


   ```js
   axios.defaults.baseURL =
     process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'
   ```
npm i --save-dev @types/node
 
2. define types in HomePage

   ```js
   type State = {
     products: Product[],
     loading: boolean
     error: string
   }
   type Action =
     | { type: 'FETCH_REQUEST' }
     | {
         type: 'FETCH_SUCCESS'
         payload: Product[]
       }
     | { type: 'FETCH_FAIL'; payload: string }

   ```

3. define initial state and reducer in HomePage.tsx

   ```js
   const initialState: State = {
     products: [],
     loading: true,
     error: '',
   }
   const reducer = (state: State, action: Action) => {
     switch (action.type) {
       case 'FETCH_REQUEST':
         return { ...state, loading: true }
       case 'FETCH_SUCCESS':
         return { ...state, products: action.payload, loading: false }
       case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload }
       default:
         return state
     }
   }
   ```

4. define get error function
   create types/ApiError.ts

   ```js
    export declare type ApiError = {
    message: string
    response: {
    data: {
    message: string
    }
    }
    }
   ```

   create utils.ts

   ```js
   export const getError = (error: ApiError) => {
     return error.response && error.response.data.message
       ? error.response.data.message
       : error.message
   }
   ```

5. fetch products

   ```js
   const [{ loading, error, products }, dispatch] = useReducer<
     React.Reducer<State, Action>
   >(reducer, initialState)
     useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
      }
    }
    fetchData()
   }, [])
   ```

6. create LoadingBox component
   create /components/LoadingBox.tsx

   ```js
  import Spinner from 'react-bootstrap/Spinner'
  export default function LoadingBox(){
   return(
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
</Spinner>
   )
  }
   ```

7. create MessageBox component
   create /components/MessageBox.tsx

   ```js
   import Alert from 'react-bootstrap/Alert'
   import React from 'react'
   export default function MessageBox({
   variant = 'info',
   children,
   }: {
    variant?: string
    children: React.ReactNode
   }) {
    return <Alert variant={variant || 'info'}>{children}</Alert>
   }
   ```

8. update return statement
   replace sampleProducts with products

   ```js
   return loading ? (
     <LoadingBox />
   ) : error ? (
     <MessageBox variant="danger">{error}</MessageBox>
   ) : (
     <Row>
       {products.map((product) => (
         <Col key={product.slug} sm={6} md={4} lg={3}>
           <Link to={'/product/' + product.slug}>
             <img
               src={product.image}
               alt={product.name}
               className="product-image"
             />
             <h2>{product.name}</h2>
             <p>${product.price}</p>
           </Link>
         </Col>
       ))}
     </Row>
   )
   

   -9 
   open index.ts
   add to index.ts : "
import cors from 'cors'
app.use(
  cors({
    credentials:true,
    origin:['http://localhost:5173']
  })
)

"
   cd backend
   npm i cors
   npm i --save-dev @types/cors





   