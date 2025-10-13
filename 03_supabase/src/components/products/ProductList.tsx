import { useContext } from 'react'
import { mainContext, type MainContextProps } from '../../context/MainProvider'
import type { IProduct } from '../../interfaces/IProduct'
import ProductItem from './ProductItem'

export default function ProductList() {
  const { products } = useContext(mainContext) as MainContextProps

  return (
    <div>
      {products.map((product: IProduct) => {
        return (
          <div key={product.id}>
            <ProductItem product={product} />
          </div>
        )
      })}
    </div>
  )
}
