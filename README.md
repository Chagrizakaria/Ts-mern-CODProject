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


# Video-10-Create-Rating-ProductItem-Component

1. Rating.js

   ```js
      function Rating(props: {
      rating: number
      numReviews?: number
      caption?: string
    }) {
      const { rating, numReviews, caption } = props
      return (
        <div className="rating">
          <span>
            <i
              className={
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          {caption ? (
            <span>{caption}</span>
          ) : numReviews != 0 ? (
            <span>{' ' + numReviews + ' reviews'}</span>
          ) : (
            ''
          )}
        </div>
      )
    }
    export default Rating

   ```

2. ProductItem.js

   ```js
   function ProductItem({ product }: { product: Product }) {
     return (
       <Card>
         <Link to={`/product/${product.slug}`}>
           <img
             src={product.image}
             className="card-img-top"
             alt={product.name}
           />
         </Link>
         <Card.Body>
           <Link to={`/product/${product.slug}`}>
             <Card.Title>{product.name}</Card.Title>
           </Link>
           <Rating rating={product.rating} numReviews={product.numReviews} />
           <Card.Text>${product.price}</Card.Text>
           {product.countInStock === 0 ? (
             <Button variant="light" disabled>
               Out of stock
             </Button>
           ) : (
             <Button>Add to cart</Button>
           )}
         </Card.Body>
       </Card>
     )
   }
   export default ProductItem
   ```

3. HomePage.js

   ```js
   <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
     <ProductItem product={product}></ProductItem>
   </Col>
   ```

# Video-11-Set-Page-Title

1. npm i react-helmet-async
2. main.tsx

   ```js
   import { HelmetProvider } from 'react-helmet-async'

   ...
   <HelmetProvider>
     <RouterProvider router={router} />
   </HelmetProvider>
   ```

3. HomePage.tsx

   ```js
   import { Helmet } from 'react-helmet-async'
   ...
   <Helmet>
        <title>Amazona</title>
   </Helmet>
 # Video-12-Load-Products-By-React-Query

1. npm i @tanstack/react-query @tanstack/react-query-devtools
2. main.tsx

   ```js
   // remove lines
   import axios from 'axios'
   axios.defaults.baseURL =
     process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'
   //add  lines 
     ...
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

   ```

3. apiClient.ts

   ```js
   import axios from 'axios'
   const apiClient = axios.create({
     baseURL:
       process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '/',
     headers: {
       'Content-type': 'application/json',
     },
   })

   export default apiClient
   ```

4. hooks/productHook.ts

   ```js
   export const useGetProductsQuery = () =>
   useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      (
        await apiClient.get<Product[]>(`api/products`)
      ).data,
   })
   ```

5. HomePage.tsx

   ```js
   const { data: products, isLoading, error } = useGetProductsQuery()
   ...
    {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
    <Row>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
    )}

   ```
   # Video-13-Create-Product-Page

1. index.ts

   ```js
   app.get('/api/products/:slug', (req: Request, res: Response) => {
     res.json(sampleProducts.find((x) => x.slug === req.params.slug))
   })
   ```

2. productHooks.ts

   ```js
   export const useGetProductDetailsBySlugQuery = (slug: string) =>
     useQuery({
       queryKey: ['products', slug],
       queryFn: async () =>
         ((await apiClient.get) < Product > `api/products/slug/${slug}`).data,
     })
   ```

3. ProductPage.tsx

   ```js

      function ProductPage() {
           const params = useParams()
        const { slug } = params

        const {
          data: product,
          refetch,
          isLoading,
          error,
        } = useGetProductDetailsBySlugQuery(slug!)
        return isLoading ? (
          <LoadingBox />
        ) : error   ? (
          <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
        ) : !product ? (
          <MessageBox variant="danger">Product Not Found</MessageBox>
        ): (
          <div>
            <Row>
              <Col md={6}>
                <img
                  className="large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <Badge bg="success">In Stock</Badge>
                            ) : (
                              <Badge bg="danger">Unavailable</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button variant="primary">
                              Add to Cart
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            </div>
          </div>
        )
      }
      export default ProductPage

      '''
# Video-14-Create-React-Context

1. Store.ts

   ```js

      type AppState = {
        mode: string
      }

      const initialState: AppState = {
        mode: localStorage.getItem('mode')
          ? localStorage.getItem('mode')!
          : window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',

       }
      type Action =  { type: 'SWITCH_MODE' }


      function reducer(state: AppState, action: Action): AppState {
        switch (action.type) {
          case 'SWITCH_MODE':
            return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

          default:
            return state
        }
      }

      const defaultDispatch: React.Dispatch<Action> = () => initialState

      const Store = React.createContext({
        state: initialState,
        dispatch: defaultDispatch,
      })
      function StoreProvider(props: React.PropsWithChildren<{}>) {
        const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
          reducer,
          initialState
        )
        return <Store.Provider value={{ state, dispatch }} {...props} />
      }

      export { Store, StoreProvider }

   ```

2. main.ts

   ```js
   <StoreProvider>
     <RouterProvider router={router} />
     ...
   </StoreProvider>
   ```

3. App.tsx

   ```js
   useEffect(() => {
     document.body.setAttribute('data-bs-theme', mode)
   }, [mode])
   const switchModeHandler = () => {
     ctxDispatch({ type: 'SWITCH_MODE' })
   }
   ...
   <Button variant={mode} onClick={switchModeHandler}>
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>
                </Button>
   ```

4. Use bootstrap 5.3 or above
# Video-15-Connect-To-MongoDB

1. create mongodb database
2. npm install dotenv mongoose @typegoose/typegoose
3. put mongodb uri in .env
4. MONGODB_URI=mongodb://localhost/tsmernamazona
5. index.ts

   ```js
   dotenv.config()

   const MONGODB_URI =
     process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
   mongoose.set('strictQuery', true)
   mongoose
     .connect(MONGODB_URI)
     .then(() => {
       console.log('connected to mongodb')
     })
     .catch(() => {
       console.log('error mongodb')
     })
   ```

6. models/productModel

   ```js
   import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

   @modelOptions({})

   @modelOptions({ schemaOptions: { timestamps: true } })
   export class Product {
     public _id!: string
     @prop({ required: true })
     public name!: string
     @prop({ required: true, unique: true })
     public slug!: string
     @prop({ required: true })
     public image!: string
     @prop()
     public images!: string[]
     @prop({ required: true })
     public brand!: string
     @prop({ required: true })
     public category!: string
     @prop({ required: true })
     public description!: string
     @prop({ required: true, default: 0 })
     public price!: number
     @prop({ required: true, default: 0 })
     public countInStock!: number
     @prop({ required: true, default: 0 })
     public rating!: number
     @prop({ required: true, default: 0 })
     public numReviews!: number
     @prop({ required: true, default: false })
     public isFeatured!: boolean
     @prop()
     public banner?: string
   }

   export const ProductModel = getModelForClass(Product)

   ```

in tsconfig.json add this 

'
    "experimentalDecorators": true,
        "emitDecoratorMetadata": true

        '


7. npm i express-async-handler
8. productRouter.ts

   ```js
   export const productRouter = express.Router()

   productRouter.get(
     '/',
     asyncHandler(async (req, res) => {
       const products = await ProductModel.find()
       res.json(products)
     })
   )
   ```

9. index.ts

```js
app.use('/api/products', productRouter)
```

10. run <http://localhost:4000/api/products>
11. seedRouter.ts

    ```js
    const seedRouter = express.Router()

    seedRouter.get(
      '/',
      asyncHandler(async (req: Request, res: Response) => {
        await ProductModel.deleteMany({})
        const createdProducts = await ProductModel.insertMany(products)
        res.send({ createdProducts })
      })
    )
    export default seedRouter
    ```