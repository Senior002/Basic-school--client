import { Route , Routes } from "react-router-dom";
import Login from "../view/login";
import Group from "../view/group";
// import Navbar from "../component/navbar";
import Home from "../view/home";
import Teacher from "../view/teacher";
import Student from "../view/student";
import Chart from "../view/chart";
import Cost from "../view/cost";

function AppRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/subject" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/group" element={<Group />} />
                <Route path="/student" element={<Student />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/cost" element={<Cost />} />
            </Routes>
        </>
    )
}
export default AppRouter