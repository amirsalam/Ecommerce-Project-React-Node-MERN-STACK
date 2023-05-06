import moment from 'moment'
import React,{useState,useEffect, Fragment} from 'react'
import { isAuthenticated } from '../../auth/helpers'
import Layout from '../../core/Layout'
import { getStatus, listOfOrders, updateOrderStatus } from '../ApiAdmin'

const  ListOrders = () => {
    const [orders,setOrders] = useState([])
    const [status,setStatus] = useState([])
    const {user,token} = isAuthenticated()
    const LoardOrders = (user,token) =>{
        listOfOrders(user._id,token)
        .then(res => setOrders(res))
        .catch(err => console.error(err))

    }

    const LoardStatus = (user,token) =>{
        getStatus(user._id,token)
        .then(res => setStatus(res.status))
        .catch(err => console.error(err))

    } 
    
    const handleStatus = (e,order) =>{
         updateOrderStatus(user._id,token,order._id,e.target.value)
         .then(res => {
            if(res.error) {
                console.error(res.error)
            }
            LoardOrders(user,token)
         })
    }

    useEffect(() =>{
        LoardOrders(user,token)
        LoardStatus(user,token)
    },[])

    const notOrders = () =>{
        if(orders.length === 0) {
            return (
                
                <div className="alert alert-warning text-center my-5 display-3">
                    Not Orders Yet !
                </div>
                
            )
        }
        else 
        {
            return (
                
                <div className="alert alert-info text-center my-5 display-3">
                    Total Orders {orders.length}
                </div>
                
            )
        }
    }

    const showInput = (key,value) =>{
        
        return (
            <div className="form-group my-2">
              <label htmlFor={key}>{key}</label>
              <input readOnly value={value} type="text" name="" id={key} className="form-control"/>
            </div>
        )
    }

    const showStatus = (order) =>{
        return status.length && (
            <Fragment>
                <h4>Status : {order.status}</h4>
                
                <select onChange={e => handleStatus(e,order)}  className="form-control" required="required">
                    <option value="">Select Status</option>
                    {status.map(s =>(
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                
            </Fragment>
        )
    }

    const showOrders = () =>{
        return orders.length && orders.map(order =>(

   <div className="my-3" key={order._id}>
     <ul className="list-group">
        <li className="list-group-item active"> 
            <strong>Transact ID </strong>
            {order.transaction_id}
        </li>
        
        <li className="list-group-item"> 
        <strong>Amount </strong>
            $ {order.amount}
        </li>
        
        <li className="list-group-item"> 
        <strong>Status </strong>
            {showStatus(order)}
        </li>
        <li className="list-group-item"> 
        <strong>Ordered On </strong>
            {moment(order.createdAt).fromNow()}
        </li>
        <li className="list-group-item"> 
        <strong>Customer </strong>
            {order.user.name}
        </li>
        <li className="list-group-item"> 
        <strong>Delivery Address </strong>
            {order.address}
        </li>
  </ul>
<div className="my-5">
    <h3 className='display-4 my-3'>Total Products {order.products.length}</h3>
    {order.products.map(product =>(

<div className="card text-white bg-secondary mb-3" key={product._id}>

    <div className="card-header">{product.name}</div>
		<div className="card-body">
        {showInput('Product ID', product._id)}
        {showInput('Product Name', product.name)}
        {showInput('Product Price', product.price)}
        {showInput('Product Quantity', product.count)}
		
	</div>
</div>
    ))}
</div>
   </div>         
        ))
        
    }

  return (
    <div>
      <Layout 
      title="Orders" 
      description="Orders Management" 
      className="container">
        
        <div className="row">
            <div className="col-md-6 mx-auto">
                {notOrders()}
                {showOrders()}
            </div>
        </div>
        
      </Layout>
    </div>
  )
}

export default ListOrders
