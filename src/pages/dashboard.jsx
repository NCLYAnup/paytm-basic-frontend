import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState, useEffect } from "react"

export const Dashboard =   () => {
    const [balance, setBalance]=useState("")

    useEffect(() => {
        axios.get("https://paytm-basic-backend-one.vercel.app/api/v1/account/balance",
         {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
                setBalance(response.data.balance)

    }), []})

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={Math.floor(balance)} />
            <Users />
        </div>
    </div>
}