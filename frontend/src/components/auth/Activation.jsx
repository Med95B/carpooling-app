import { useSelector,useDispatch } from "react-redux"
import { useParams,Link } from "react-router-dom"
import { activateUser, selectError } from "../../store/userSlice"
import { useEffect } from "react"

function Activation() {

const {token}=useParams()
console.log(token);
const error=useSelector(selectError)
console.log(error);
const dispatch=useDispatch()

useEffect(()=>{
    if (token) {
        dispatch(activateUser({token:token}))
    }
},[token,dispatch])



  return (
    <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {error ? (
      <p>Your token is expired!</p>
    ) : (
      <div className="text-center">
      <p>Your account has been created suceessfully!</p>
     <Link to={'/ride'}> <button className="btn btn-info">Sign in</button></Link>
      </div>


    )}
  </div>
  )
}

export default Activation