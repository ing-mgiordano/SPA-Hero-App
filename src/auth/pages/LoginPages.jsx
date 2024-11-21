import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export const LoginPages = () => {

  const { login } = useContext( AuthContext )
  const navigate = useNavigate()

  const onLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/'
    login( 'Miguel Giordano' )
    
    navigate(lastPath, {
      replace: true //remplza el historial, no puedo volver atras
    })
  }
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button
        className="btn btn-primary"
        onClick={ onLogin }
      >
        Login
      </button>
    </div>
  )
}
