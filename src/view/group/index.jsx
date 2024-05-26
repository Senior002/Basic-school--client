import Navbar from "../../component/navbar"
import axios from "axios";
import { useState , useEffect } from "react";
import URL from '../../config'
import { useNavigate } from "react-router-dom";
import './group.css'

function Group(){
    const navigate = useNavigate()
    const [data , setData] = useState({
        date: "",
        teacher: "",
        price: "",
        name: ""
    });
    //fanladi saqlawchun
    const [teachers, setTeachers] = useState([])
    //edit yoki delete ni anqlashchun
    const [status , setStatus] = useState(0)
    //bazada o'zgarw bo'ganda useEffectti qayta iwlatvorwchun
    const [refreshKey , setRefreshKey] = useState(0)
    const [refreshKey2 , setRefreshKey2] = useState(0)
    //modal funksya
    const [modal , setModal] = useState('d-none')
    const [group , setGroup] = useState([])
    //o'quvchla ro'yxati
    const [students, setStudents] = useState([])
    //o'quvchi qo'wiw
    const [studentData, setStudentData] = useState({
        fullname: "",
        phone: "",
        group: ""
    })

    const [tablesMod, setTablesMod] = useState('d-none')

    const [studentModal , setStudentModal] = useState('d-none')


    const changeHandler = (e) => {
        setData( { ...data, [e.target.name] : e.target.value } )
    }

    const changeHandlerStudent = (e) => {
        setStudentData({...studentData, [e.target.name]:e.target.value})
    }


    useEffect(()=>{
        const demo = () => {
            axios.get(`${URL}/teacher` , {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setTeachers(res.data)
            })
            .catch((err)=>{
                alert(err)
            });

            axios.get(`${URL}/group` , {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setGroup(res.data)
            })
            .catch((err)=>{
                alert(err)
            });
        }
        demo()
    },[refreshKey])


    const submit = async (e) => {
        e.preventDefault()
        if(status === 0){
            delete data?._id
            await axios.post(`${URL}/group`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setRefreshKey( oldKey => oldKey +1 )
                window.location.reload(false)
                setData({
                    date: "",
                    teacher: "",
                    price: "",
                    name: "",
                    _id: ""
                })
            })
            .catch((err)=>{
                if(err?.response?.status === 403){
                    alert(err)
                }
            });
        }else{
            await axios.put(`${URL}/group/${data?._id}`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setRefreshKey( oldKey => oldKey +1 )
                setStatus(0)
                setData({
                    date: "",
                    teacher: "",
                    price: "",
                    name: "",
                    _id: ""
                })
            })
            .catch((err)=>{
                if(err?.response?.status === 403){
                    alert(err)
                }
            });
        }
    };


    const addGroup = (id) => {
        studentData.group = id
        axios.get(`${URL}/student/groups/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            setStudents(res.data)
        })
        .catch((err)=>{
            alert(err)
        });
        tables()
    }

    const submitStudent = async (e) => {
        e.preventDefault()
        await axios.post(`${URL}/student`, studentData, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            studentData.fullname = ""
            studentData.phone = ""
            addGroup(studentData.group)
        })
        .catch((err)=>{
            if (err?.response?.status === 403) {
                alert(err)
            }
        })

    }


       //input ochilish yopilish funksya
       const modalFunction = () => {
        if(modal === "d-none"){
            setModal("group_add_inp")
            document.body.style.position = 'fixed';             
            document.body.style.top = `-${window.scrollY}px`;
        }else{
            setModal("d-none")
            document.body.style.position = '';
            document.body.style.top = '';
        }
    }

    const studentModalFunction = () => {
        if(studentModal === "d-none"){
            setStudentModal("grp_std_add")
            document.body.style.position = 'fixed';             
            document.body.style.top = `-${window.scrollY}px`;
        }else{
            setStudentModal("d-none")
            document.body.style.position = '';
            document.body.style.top = '';
        }
    }

    
    const deleteGroup = (id) => {
        axios.delete(`${URL}/group/${id}`, {
           headers: {
               authorization: `Bearer ${localStorage.getItem("token")}`
           }
       })
       .then((res)=>{
           alert('DELETED GROUP!')
        //refresh the page fo me too useful!
           window.location.reload(false)

           setRefreshKey( oldKey => oldKey +1 )
       })
       .catch((err)=>{
           if(err?.response?.status === 403){
               alert(err)
           }
       });
   }

   const tables = () => {
    setTablesMod('container')
   }

   const editStudent = (item) => {
    localStorage.setItem('student', JSON.stringify(item))
    navigate('/student')
   }



    return(
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-end mb-3">
                    <div className="col-md-4">
                        <i className="bi bi-plus-circle-dotted text-primary" onClick={()=>modalFunction()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                                <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                        </i>
                    </div>
                </div>
                <div className={modal}>
                    <div className="login_content4">
                        <div className="x_btn_group">
                            <i className="bi bi-x-lg" onClick={()=>modalFunction()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </i>
                        </div>
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-4">
                                {/* <h2 className="header_txt mt-4 pb-3 text-light">New Group</h2> */}
                                <form className="text-center mb-5" onSubmit={submit}>
                                    <input
                                        type="text" 
                                        className="form-control mb-3"
                                        placeholder="Group name.."
                                        onChange={changeHandler}
                                        value={data.name}
                                        name='name'
                                        required
                                    />
                                    <input
                                        type="text" 
                                        className="form-control my-3"
                                        placeholder="Date"
                                        onChange={changeHandler}
                                        value={data.date}
                                        name='date'
                                        required
                                    />
                                    <input
                                        type="number" 
                                        className="form-control my-3"
                                        placeholder="Price++"
                                        onChange={changeHandler}
                                        value={data.price}
                                        name='price'
                                        required
                                    />
                                    <select 
                                        name="teacher"
                                        value={data.teacher}
                                        onChange={changeHandler}
                                        className='form-select slct'
                                        defaultValue={teachers[0]?._id}
                                    >
                                        <option value="">O'QITUVCHINI TANLANG</option>
                                        {
                                            teachers.map((item, index)=>{
                                                return(
                                                    <option value={item._id} key={index}>{item.fullname}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button className="btn btn2" onClick={()=>modalFunction()}>ᴀᴅᴅGroup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="col-md-12">
                        <div className="row ">
                            {
                                group.map((item , index) => {
                                return(
                                    <div
                                        className="card col-md-1 bg-primary text-light gruppa mx-1"
                                        key={index}
                                        onClick={()=>addGroup(item._id)}
                                    >
                                        {item.name}
                                    </div>
                                )   
                                })
                            }
                        </div>
                        <div className={tablesMod}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Fullname</th>
                                        <th scope="col">Phone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map(( item, index ) => {
                                            return(
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.phone}</td>
                                                    <td onClick={()=>editStudent(item)}>
                                                        <i className="bi bi-person-vcard card_iconca">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
                                                                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                                                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
                                                            </svg>
                                                        </i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="btns mb-1">
                                <i className="bip bi-person-plus" onClick={()=>studentModalFunction()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </i>
                                <i className="bij bi-journal-x" onClick={()=>deleteGroup(studentData.group)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-journal-x" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                    </svg>
                                </i>
                            </div>
                        </div>
                            <div className={studentModal}>
                        <div className="grp_std_adder text-center">
                            <div className="x_btn_group">
                                <i className="bi bi-x-lg" onClick={()=>studentModalFunction()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                        </svg>
                                </i>
                            </div>
                            {/* <h2 className="text-light">Add student to group</h2> */}
                                    <form onSubmit={submitStudent}>
                                        <input 
                                            type="text" 
                                            value={studentData.fullname}
                                            onChange={changeHandlerStudent} 
                                            className="form-control my-3 logs_inp"
                                            placeholder="Fullname"
                                            name="fullname"
                                        />
                                        <input 
                                            type="text" 
                                            value={studentData.phone}
                                            onChange={changeHandlerStudent} 
                                            className="form-control my-3 logs_inp"
                                            placeholder="Phone"
                                            name="phone"
                                        />
                                        <button className="btn btn2" onClick={()=>studentModalFunction()}>SEND</button>
                                    </form>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default Group