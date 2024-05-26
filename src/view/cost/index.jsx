import './cost.css'
import axios from 'axios'
import URL from '../../config'
import React, { useState , useEffect } from 'react'
import Navbar from '../../component/navbar'

function Cost(){
    const [refresh , setRefresh] = useState(0)
    const [modal, setModal] = useState('d-none')
    const [ cost, setCost ] = useState([])
    const [ data, setData ] = useState({
        title: '',
        price: 0
    })

    const submit = async (e) => {
        e.preventDefault()
        await axios.post(`${URL}/cost`, data, {
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            setRefresh(refresh + 1)
            setData({
                title:'',
                price:''
            })
        })
        .catch((err)=>{
            if(err.response.status===403){
                alert(err)
            }
        });
    }
    
    
    useEffect(()=>{
        const demo = async () => {
          await axios.get(`${URL}/cost`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((res)=>{
            setCost(res.data)
          })
          .catch((err)=>{
            if(err.response.status===403){
                alert(err)
            }
        })
        }
        demo()
    },[refresh])

    const Delete = async (id) => {
        await axios.delete(`${URL}/cost/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            setRefresh(refresh + 1)
            alert('COST DELETED!')
        })
        .catch((err)=>{
            if(err.response.status === 403){
                alert(err)
            }
        });
    }
    

    const modalFunction = () => {
        if(modal==='d-none'){
            setModal('cost_add_inp')
            document.body.style.position = 'fixed';             
            document.body.style.top = `-${window.scrollY}px`;
        }else{
            setModal('d-none')
            document.body.style.position = '';
            document.body.style.top = '';
        }
    }

    const changeHandler = (e) => {
        setData( { ...data, [e.target.name] : e.target.value } )
    }

    return(
        
        <div className="container">
            <Navbar />
            {/* <div className="header_tex py-2 text-center">
                <h2>𝙲𝙾𝚂𝚃𝚂 𝙿𝙰𝙶𝙴</h2>
            </div> */}
            <div className="cost_adder_btn">
                <div className="row justify-content-end">
                    <div className="col-md-2 py-2">
                        <i className="bi bi-clipboard2-plus" onClick={()=>modalFunction()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-clipboard2-plus" viewBox="0 0 16 16">
                                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5V6.5Z"/>
                            </svg>
                        </i>
                    </div>
                </div>
            </div>
            <div className={modal}>
                        <div className="x_btn">
                            <i className="bi bi-x-lg" onClick={()=>modalFunction()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </i>
                        </div>
                <div className="wrepper text-center">
                    {/* <h3 className='text-light'>ADD COST</h3> */}
                    <form className='form_copy' onSubmit={submit}>
                        <select 
                                name="title"
                                value={data.title}
                                onChange={changeHandler}
                                className='form-select slct'
                                // defaultValue={teachers[0]?._id}
                        >
                            <option value="">TANLANG</option>
                            <option value={data._id}>Gaz</option>
                            <option value={data._id}>Svet</option>
                            <option value={data._id}>Suv</option>
                            <option value={data._id}>YerMulk</option>
                        </select>
                        <input 
                            type="number" 
                            className='form-control my-3'
                            value={data.price}
                            onChange={changeHandler}
                            name='price'
                            placeholder='Price++' 
                            required
                        />
                        <button className='btn btn5' onClick={()=>modalFunction()}>AddCost</button>
                    </form>
                </div>
            </div>
            <div className="infos">
                <div className="row">
                    {
                        cost.map((item, index)=>{
                            return(
                                <div className="cardos col-md-3 m-3 text-center p-3" key={index}>
                                    <div className="hedor py-3">
                                        <h3 className='text-primary my-2'>{item?.title}</h3>
                                        <h4 className='text-danger my-2'>{item?.price} so'm</h4>
                                    </div>
                                        <div className="under_btn pt-3 text-end">
                                            <i className="bi bi-trash2 mt-2 mx-4 text-primary" onClick={()=>Delete(item._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                                    <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                                </svg>                                                                     
                                            </i>
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Cost