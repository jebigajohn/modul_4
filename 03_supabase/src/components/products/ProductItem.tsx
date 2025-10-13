import { useNavigate } from 'react-router'
import type { IProduct } from '../../interfaces/IProduct'
import { addCart } from '../../functions/addCart'

interface IProductItemProps {
  product: IProduct
}

export default function ProductItem({ product }: IProductItemProps) {
  const navigate = useNavigate()

  const handleToCart = async () => {
    await addCart(product.id)
    navigate('/cart')
  }

  return (
    <div>
      <p>Title: {product?.title}</p>
      <p>Price: {product.price}</p>
      <p>Quality</p>
      <button onClick={handleToCart}>Add to Cart</button>
    </div>
  )
}
