import React,{useEffect,useState} from 'react'
import { getOneProduct, relatedProducts } from './ApiCore'
import Card from './Card'
import Layout from './Layout'

const Product = (props) => {
    const [product,setProduct] = useState({})
    const [related,setRelated] = useState([])

    useEffect(() =>{
        let productId = props.match.params.id
        getOneProduct(productId)
        .then(res => {
            setProduct(res)
            return relatedProducts(productId)
        })
        .then(related => setRelated(related))
        .catch(err => console.log(err))
    },[props])
  return (
    <div>
        {product && product.description && (
      <Layout
        title={product.name}
        description={product.description.substring(0,100)}
        className="container"
      >
        
        <div class="row">
            <div class="col-md-9">
            <Card product={product} showViewBtn={false}/>
            </div>
            <div class="col-md-3">
               {related.map((product,i) =>(
                <Card key={product._id} product={product} />
               ))}
            </div>
        </div>
        
        </Layout>
        )}
      
    </div>
  )
}

export default Product
