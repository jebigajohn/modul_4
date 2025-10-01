import { useContext } from 'react'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import type { IProduct } from '../../interfaces/IProduct'
import type { ICustomer } from '../../interfaces/ICustomer'

export default function Home() {
  const { products } = useContext(mainContext) as MainContextProps
  const { customers } = useContext(mainContext) as MainContextProps

  console.log(products)

  return (
    <div>
      <div>
        {products.map((product: IProduct, index: number) => {
          return (
            <div key={index}>
              <h4>Title {product.title}</h4>
            </div>
          )
        })}
      </div>
      <div>
        {customers.map((customer: ICustomer, index: number) => {
          return (
            <div key={index}>
              <h4>Customer {customer.CustomerName}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}
