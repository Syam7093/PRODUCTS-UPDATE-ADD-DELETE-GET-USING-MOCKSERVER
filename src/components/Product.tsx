import React, { useEffect, useState } from 'react'
import axios from "axios"



const Product = () => {
    const [product,setproduct]=useState<string>('')
    const [price,setprice]=useState<string>('')
    const [items,setitems]=useState<any>([])
    const [show,setshow]=useState(false)
    const [product1,setproduct1]=useState<string>('')
    const [price1,setprice1]=useState<string>('')
    const [one, setOne] = useState<any | null>(null);
    const [search,setserach]=useState<string>('')
    // console.log(one,'on------')
    
    const [show1,setshow1]=useState(false)
    
    useEffect(()=>{
        getdata()
    },[items])



    const submitdata=async()=>{
        let datasend={
            product:product,
            price:price
        }
       let data=await axios.post(`http://localhost:6767/users`,datasend)
       setshow(false)
       
    }

    const delteoneitem=async(s:any)=>{
        let data=await axios.delete(`http://localhost:6767/users/${s.id}`)
        let some=items.filter((e:any)=>{
            return e!==data
        })
        setitems(some)
       console.log(data.data,"data")
    }

    const getdata=async()=>{
       let gets=await axios.get(`http://localhost:6767/users`)
       setitems(gets.data)
    }

    const itemupdate=(k:any)=>{
        console.log(k,"kkkkk")
        setprice1(k.price)
        setproduct1(k.product)
        setOne(k)
        setshow1(true)

    }


    const updagtesave=async()=>{
        console.log(one,"rammm")

        one.product=product1
        one.price=price1
       let data=await axios.put(`http://localhost:6767/users/${one.id}`,one)
       console.log(data,"data")
       setshow1(false)
    }

    const filterdata=items.filter((e:any)=>{
        return e.product.toLowerCase().includes(search.toLocaleLowerCase())
    })








  return (
    <div>
        <button onClick={()=>{
            setshow(true)
        }}>Create New product</button>
        <input type="text" onChange={(e)=>{setserach(e.target.value)}}></input>


      { show==true && <div>
            <div>
                <label>Product</label>
                <input type="text" onChange={(e:any)=>{setproduct(e.target.value)}}></input>
            </div>
            <div>
                <label>Item</label>
                <input type="text" onChange={(e:any)=>{setprice(e.target.value)}}></input>
            </div>
            <button onClick={()=>{
              submitdata()
            }}>Submit</button>

           
        </div>}

        <div>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>price</th>
                        <th>Action</th>
                    </tr>
                {filterdata.map((e:any)=>{
                    return(
                    <tr>
                        <td>{e.product}</td>
                        <td>{e.price}</td>
                        <td ><button style={{margin:"10px"}} onClick={()=>{
                            itemupdate(e)
                        }}>update</button><button onClick={()=>{
                            delteoneitem(e)
                        }}>Delete</button></td>
                    </tr>
                    )

                })}
                </table>
            </div>



            { show1==true && <div>
            <div>
                <label>Product</label>
                <input type="text" value={product1} onChange={(e:any)=>{setproduct1(e.target.value)}}></input>
            </div>
            <div>
                <label>Item</label>
                <input type="text" value={price1} onChange={(e:any)=>{setprice1(e.target.value)}}></input>
            </div>
            <button onClick={()=>{
           updagtesave()
            }}>Submit</button>

           
        </div>}
        


        


    </div>
  )
}

export default Product