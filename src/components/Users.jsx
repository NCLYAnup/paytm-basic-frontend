import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://paytm-basic-backend-one.vercel.app/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
                setLoading(false);
            })
    }, [filter])
    const token = localStorage.getItem('token'); // This should come from your authentication context or storage where the token is saved
  const decodedToken = jwtDecode(token);
  const currentUserId = decodedToken.userId;

  if (loading) {
    return <Loader />; // Show the loader while loading
  }
  
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
        {users.filter(user => user._id !== currentUserId).map(filteredUser => <User user={filteredUser} key={filteredUser._id} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}