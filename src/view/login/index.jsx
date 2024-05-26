import axios from "axios"
import { useState, useRef } from "react"
import './login.css'
import  URL  from "../../config"
import { useNavigate } from "react-router-dom"

function Login(){
    const navigate = useNavigate()
    const [data, setData] = useState({
        phone : "",
        password : ""
    })

    const [user , setUser] = useState(true)

    const submit = async (e) => {
        if(user === true){
            e.preventDefault()
        await axios.post(`${URL}/auth/admin`, data)
        .then((res)=>{
            localStorage.setItem('token' , res?.data?.jwt_key)
            navigate('/subject')
        })
        .catch((err)=>{
            if(err?.response?.status === 403){
                alert("phone/password false!")
            }
        })
        }else{
            e.preventDefault()
            await axios.post(`${URL}/auth/boss`, data)
            .then((res) => {
                localStorage.setItem('token', res.data.jwt_key)
                navigate('/chart')
            })
            .catch((err) => {
                if(err.response.status === 403){
                    alert('Phone/password false!')
                }
            })
        }
        
    }
    

    const changeHandler = (e) => {
        setData({ ...data , [e.target.name] : e.target.value })
    }



    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    return(
        <>
            <section>
                <div className="form_box">
                    <div className="form-value">
                        <form onSubmit={submit}>
                            <h2 className="hash_two">LOGIN</h2>
                            <select 
                            name=""
                            className="form-select SELECTR"
                            onChange={(e)=>{
                                setUser(e.target.value)
                            }}
                        >
                            <option value="true">ADMIN</option>
                            <option value="false">BOSS</option>
                        </select>
                            <div className="input_box">
                                <i className="bi bi-envelope letter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                    </svg>
                                </i>
                                <input type="text"
                                    onChange={changeHandler}
                                    value={data.phone}
                                    name='phone'
                                    required
                                />
                                <label htmlFor="">Phone</label>
                            </div>
                            <div className="input_box">
                                <i className="bi bi-eye EYE"  onClick={()=>myFunction()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                </i>
                                <input 
                                    type="password"
                                    onChange={changeHandler}
                                    value={data.password}
                                    name='password'
                                    id="myInput"
                                    required
                                />
                                <label htmlFor="">Password</label>
                            </div>
                            <div className="forget">
                                <label htmlFor=""><input className="remembrme" type="checkbox" />Remember me!</label>
                                <a className="forgt_paswrd" href="">Forget password</a>
                            </div>
                            <button className="login_btner">Log in</button>
                            <div className="register">
                                <p className="yozv">Don't have an account? <a className="hovola" href="">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login