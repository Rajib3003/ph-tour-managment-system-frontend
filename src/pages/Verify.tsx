import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"


export default function Verify() {
    const location = useLocation()
    const navigate = useNavigate()
    const [email] = useState(location.state)

    useEffect(        
      ()=> {        
          if(!email){
            navigate("/")
        }
      },[email,navigate]
    )
    console.log("location",location.state)
  return (
    <div>
      this is verify page
    </div>
  )
}
