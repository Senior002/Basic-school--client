import Navbar from "../../component/navbar"
import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import axios from "axios"
import './home.css'
import URL from "../../config"

function Home(){
    const [refreshKey , setRefreshKey] = useState(0)
    const [status , setStatus] = useState(0)
    const [modal , setModal] = useState('d-none')
    const [data, setData] = useState({
        title : "",
        desc : "",
        _id: ""
    })
    const [subjects , setSubjects] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        if(status === 0){
            delete data?._id
            await axios.post(`${URL}/subject`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setRefreshKey( oldKey => oldKey +1 )
                setData({title:"", desc:"", _id:""})
            })
            .catch((err)=>{
                if(err?.response?.status === 403){
                    alert(err)
                }
            })
        }else{
            await axios.put(`${URL}/subject/${data?._id}`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setRefreshKey( oldKey => oldKey +1 )
                setStatus(0)
                setData({title:"", desc:"", _id: ""})
            })
            .catch((err)=>{
                if(err?.response?.status === 403){
                    alert(err)
                }
            })
        }
    }
    

    const changeHandler = (e) => {
        setData({ ...data , [e.target.name] : e.target.value });
    }

    const modalFunction = () => {
        if(modal === "d-none"){
            setModal("student_add_inp")
            document.body.style.position = 'fixed';             
            document.body.style.top = `-${window.scrollY}px`;
        }else{
            setModal("d-none")
            document.body.style.position = '';
            document.body.style.top = '';
        }
    }

    useEffect(()=>{
        const foo = async () => {
            await axios.get(`${URL}/subject`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                setSubjects(res.data)
            })
            .catch((err)=>{
                if(err?.response?.status === 403){
                    alert(err)
                }
            })
        }
        foo()
    },[refreshKey])

    const Delete = (id) => {
         axios.delete(`${URL}/subject/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            alert('DELETED SUBJECT')
            setRefreshKey( oldKey => oldKey +1 )
        })
        .catch((err)=>{
            if(err?.response?.status === 403){
                alert(err)
            }
        })
    };

    const editSubject = (item) => {
        setData({
            title : item.title,
            desc : item.desc,
            _id : item._id
        })
        setStatus(1)
        modalFunction()
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
              <div className="login_content2">
                    <div className="x_btn_subject">
                        <i className="bi bi-x-lg" onClick={()=>modalFunction()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </i>
                    </div>
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-md-4">
                        {/* <h2 className="header_txt mt-4 pb-3 text-light">Ｓｕｂｊｅｃｔ</h2> */}
                        <form className="text-center mb-5" onSubmit={submit}>
                            <input
                                type="text" 
                                className="form-control mb-4"
                                placeholder="title"
                                onChange={changeHandler}
                                value={data.title}
                                name='title'
                                required
                            />
                            <input
                                type="text" 
                                className="form-control my-2"
                                placeholder="desc"
                                onChange={changeHandler}
                                value={data.desc}
                                name='desc'
                                required
                            />
                                <button className="btner btn1" onClick={()=>modalFunction()}>ᴀᴅᴅꜱᴜʙᴊᴇᴄᴛ</button>
                        </form>
                    </div>
                </div>
              </div>
            </div>
            <div className="row">
                {
                    subjects.map((item , index) => {
                        return(
                            <div className="col-md-2 my-3" key={index}>
                                <div className="cardo text-center border-primary py-3 px-2">
                                        <h3 className="galava">{item.title}</h3>
                                        <p className="tana">{item.desc}</p>
                                        <div className="bordr d-flex justify-content-end mt-1">
                                            <i className="bi bi-pen mt-2 text-primary" onClick={()=>editSubject(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                                </svg>
                                            </i>
                                            <i className="bi bi-trash2 mt-2 mx-4 text-primary" onClick={()=>Delete(item._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                                    <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                                                </svg>
                                            </i>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </>
    )
}
export default Home