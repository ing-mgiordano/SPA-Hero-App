import { useMemo } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { getHeroById } from "../helpers"


export const Hero = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  //useMemo memorizo los valores que me devuelve la funcion. 
  //Si estos valores no van a cambiar es mejor memorizarlos 
  //para cuando se renderize nuevamente el componente, no se 
  //vuelvan a llamar a esta funcion.

  //useCallback para memorizar funciones
  
  const hero = useMemo( () => getHeroById( id ), [id])
  const heroImgUrl = `/assets/heroes/${ id }.jpg`

  const onNavigateBack = () => {
    if(hero.publisher === 'Marvel Comics') {
      navigate('/marvel')
    }
    if(hero.publisher === 'DC Comics') {
      navigate('/dc')
    }
  }

  if ( !hero ) {
   return <Navigate to='/' />
  }
  
  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
        <img
          className="img-thumbnail"
          src={ heroImgUrl }
          alt={ hero.superhero }
        />
      </div>

      <div className="col-8">
        <h3>{ hero.superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter ego:</b> { hero.alter_ego }</li>
          <li className="list-group-item"><b>Publisher:</b> { hero.publisher }</li>
          <li className="list-group-item"><b>First appearance:</b> { hero.first_appearance }</li>
        </ul>
        <h5 className="mt-3"> Characters </h5>
        <p>{ hero.characters }</p>

        <button
          className="btn btn-outline-primary"
          onClick={ onNavigateBack }
        >Back</button>
      </div>
    </div>
  )
}
