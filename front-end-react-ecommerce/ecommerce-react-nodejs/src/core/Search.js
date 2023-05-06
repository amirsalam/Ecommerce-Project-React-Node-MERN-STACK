import React,{useState,useEffect} from 'react'
import { getCategories, getProducts } from './ApiCore'
import Card from '../core/Card';

const Search = () => {
    const [categories,setCategories] = useState([])
    const [products,setProducts] = useState([])
    const [searchData,setSearchData] = useState({search:'',category:''})

    const handleChange = (e) =>{
      setSearchData({...searchData,[e.target.id]:e.target.value})
    }
    const resultMessage = () =>{
      return products && products.length > 0 && (
        <h3>
          Found {products.length} Products
        </h3>
      )
    }
    const searchSubmit = (e) =>{
      e.preventDefault();
      
      let {search,category} = searchData
      if(search || category){

        getProducts({search : search || undefined,category})
        .then(res => setProducts(res))
      }
      else{
        setProducts([])
      }
    }
    useEffect(() => {
        getCategories()
        .then(categories => setCategories(categories))
    },[])
  return (
    <div>
      <form onSubmit={searchSubmit}>
        <div className="input-group input-group-lg">
        <div className="input-group-prepend">
            <select onChange={handleChange}  className="btn" name="" id="category">
              <option value="">Select Category</option>
              {categories.map((category,i) =>(

              <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <input onChange={handleChange} type="search" id="search" className="form-control mx-4"/>
          <div className="input-group-apprend">
          <button className="btn">Search</button>
          </div>
        </div>
      </form>
      <hr/>
      {resultMessage()}
      <div class="row">
        {products.map((product,i) =>(
        <div key={product._id} className="col-md-4">
          <Card product={product}/>
        </div>
        ))}
      </div>
      
      </div>
    
  )
}

export default Search
