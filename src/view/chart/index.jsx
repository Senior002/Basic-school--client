import './chart.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import {
  BarChart, Bar,
  ResponsiveContainer, Tooltip,
  XAxis, YAxis, PieChart,
  Pie, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import URL from '../../config'
import axios from 'axios';

function Chart() {
  //grouplar i nechta studentlar borligi datasi
  const [data, setData] = useState([])
  //grouplardi xozircha sentabr oyida qancha price topganini ko'rish
  const [data1, setData1] = useState([])
  //cost dan resultlar datasi
  const [data2, setData2] = useState([])

  //GROUP, STUDENT QUANTITY
  useEffect(() => {
    const foo = async () => {
      await axios.get(`${URL}/reports/group`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res)=>{setData(res.data)}).catch((err)=>{alert(err)})
    }
    foo()

    const foo1 = async () => {
      await axios.get(`${URL}/reports/groupPrice`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {month: 'Sentyabr'}
      })
      .then((res)=>{setData1(res.data)}).catch((err)=>{alert(err)})
    }
    foo1()

    //cost
    const foo2 = () => {
      axios.get(`${URL}/reports/cost`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => { setData2(res.data) }).catch((err) => { alert(err) });
    }
    foo2()
  }, []);


  const data01 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const dataPie = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  return (
    <div className="container">
      <div className="row py-3 mb-2">
        <div className="col-md-11 text-end">
          <div className="general_place">
            <Link className='navbar_item' to="/">
              <i className="bi bi-escape logout_btn" onClick={()=>localStorage.clear()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
                  <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z"/>
                  <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z"/>
                </svg>
              </i>
            </Link>
          </div>
        </div>
      </div>
          <div className="row bow">
            <div className="header_tex mt-2 mb-3">
              <h1 className='static'>STATISTICS</h1>
              <i className="bi bi-graph-down-arrow static_icon" onClick={()=>window.location.reload(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-graph-down-arrow" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
                </svg>
              </i>
            </div>
            <div className="col-md-5 mb-2">
              <div className="student_text text-center">
                <h2 className='soni mb-5'>STUDENT quantity</h2>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart width={150} height={50} data={data}>
                  <Bar dataKey="count" fill="#8884d8" />
                  <Tooltip />
                  <XAxis dataKey="_id.name" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="col-md-5 mb-3">
                <div className="student_text1 text-center">
                    <h2 className='mablag mb-5'>GROUP price</h2>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie dataKey="price" data={data1} fill="#8884d8" label />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
            </div>
            <div className="col-md-5 my-3" style={{ width: '100%', height: 300 }}>
                <div className="student_text2 text-center">
                  <h2 className='mablag1 mb-5'>COSTS price</h2>
                </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={data2}>
                      <Bar dataKey="totalPrice" fill="#8884d8" />
                      <Tooltip />
                      <XAxis  dataKey="_id"/>
                      <YAxis />
                    </BarChart>
                  </ResponsiveContainer>
            </div>
          </div>
    </div>
  )
}
export default Chart