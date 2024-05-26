import axios from "axios";
import { useState, useEffect } from "react";
import './student.css'
import { useNavigate } from "react-router-dom";
import URL from '../../config'

function Student () {
    const navigate = useNavigate()
    const [modal, setModal] = useState('d-none')
    const [student, setStudent] = useState([])
    const [payment , setPayment] = useState({
        date: '',
        price: 0
    })

    const Back = () => {
        localStorage.setItem("student", "")
        navigate('/group')
    }

    useEffect(() => {
        const foo = () => {
            setStudent([JSON.parse( localStorage.getItem('student'))])
        }
        foo()
    }, [])

    const Delete = async (id) => {
        await axios.delete(`${URL}/student/${id}`, {
            headers: {
                authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            alert('STUDENT DELETED')
            Back()
        })
        .catch((err)=>{
            if(err?.response?.status === 403){
                alert(err)
            }
        });
    }

    const changeHandler = (e) => {
        setPayment({...payment, [e.target.name]: e.target.value})
    }

    const modalFunction = () => {
        if(modal==='d-none'){
            setModal('mod text-center')
            document.body.style.position = 'fixed';             
            document.body.style.top = `-${window.scrollY}px`;
        }else{
            setModal('d-none')
            document.body.style.position = '';
            document.body.style.top = '';
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        await axios.put(`${URL}/student/${student[0]._id}` , payment, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then( (res) => {
            setPayment({
                date: '',
                price: ''
            })
            modalFunction()
        })
        .catch( (err) => {
            if(err?.response?.status === 403){
                alert(err)
            }
        })
    }



    return(
        <>
            <div className="container">
                <div className="back_part my-2">
                    <i className="bi bi-box-arrow-left backer" onClick={()=>Back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </i>
                </div>
                <div className="heder_word text-center">
                    <h2>STUDENT INFO</h2>
                </div>
                        {
                            student.map((item , index) => {
                                return(
                                    <div className="row d-flex justify-content-center" key={index}>
                                        
                                            <div className="col-md-4 cardy m-3">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="image text-center mb-2">
                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="network is't best" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <h2 className="text-center text-primary">Group: {item?.group.name}</h2>
                                                    </div>
                                                    <div className="col-md-12 mb-2">
                                                        <h4>Fullname: {item?.fullname}</h4>
                                                        <h4>Phone: {item?.phone}</h4>
                                                    </div>
                                                    <div className="col-md-12 d-flex justify-content-end orab">
                                                        <div className="under_btns">
                                                            <i className="bi bi-pen mt-2 text-primary">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                                                </svg>
                                                            </i>
                                                            <i className="bi bi-trash2 mt-2 mx-4 text-primary" onClick={()=>Delete(item._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                                                    <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                                                </svg>
                                                            </i>
                                                            <i className="bi bi-cash-coin casher" onClick={()=>modalFunction()}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                                                                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                                                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                                                                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                                                </svg>
                                                            </i>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-md-7 m-3">
                                                        <div className="row">
                                                            {
                                                                item.payments.map( ( elem, indexxx ) => {
                                                                    return(
                                                                        <div className="col-md-3 card bg-primary m-2 p-2 text-white" key={indexxx}>
                                                                            <h4 className="vaqti">Vaqti : {elem.date}</h4>
                                                                            <h4 className="summasi">Summa : {elem.price} so'm</h4>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                            </div>
                                    </div>
                                    
                                )
                            })
                        }
                    <div className={modal}>
                        <div className="x_btn">
                            <i className="bi bi-x-lg" onClick={()=>modalFunction()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </i>
                        </div>
                            <form onSubmit={submitForm}>
                                <select
                                    name="date"
                                    value={payment.date}
                                    className='form-select m-2'
                                    onChange={changeHandler}
                                >
                                    <option value="">TANLANG</option>
                                    <option value="Yanvar">Yanvar</option>
                                    <option value="Fevral">Fevral</option>
                                    <option value="Mart">Mart</option>
                                    <option value="Aprel">Aprel</option>
                                    <option value="May">May</option>
                                    <option value="Iyun">Iyun</option>
                                    <option value="Iyul">Iyul</option>
                                    <option value="Avgust">Avgust</option>
                                    <option value="Sentyabr">Sentyabr</option>
                                    <option value="Oktyabr">Oktyabr</option>
                                    <option value="Noyabr">Noyabr</option>
                                    <option value="Dekabr">Dekabr</option>
                                </select>
                                <input 
                                type="number" 
                                className="form-control m-2"
                                onChange={changeHandler}
                                value={payment.price}
                                name='price'
                                placeholder="Price++"
                                required
                                />
                                <button className="btn btn3" onClick={()=>modalFunction()}>𝙋𝘼𝙔</button>
                            </form>
                    </div>
            </div>
        </>
    )
}
export default Student