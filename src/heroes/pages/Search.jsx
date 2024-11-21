import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import queryString from "query-string" //intalar dependencia npm add query-string 
import { getHeroByName } from "../helpers"
import { HeroCard } from "../components"


export const Search = () => {

  const navigate = useNavigate()
  const location = useLocation()
  /* console.log(location) */

  // queryString me sirve para extraer los elementos del location
  const { q = ''} = queryString.parse( location.search )
  /* console.log(query) */

  const heroes = getHeroByName(q)

  const { searchText, handleChange} = useForm({
    searchText: q
  })

  const onSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`?q=${ searchText }`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input 
              type="text"
              placeholder="Search Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ handleChange }
            />

            <button className="btn btn-outline-primary mt-1">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            // otra forma de mostrar o no un elemento es con el display
            /* <div className="alert alert-primary" style={{ display: q === '' ? '' : 'none' }}>
              Search a Hero
            </div>  
          */}
          
          { ( q === '' ) ?
            <div className="alert alert-primary">
              Search a Hero
            </div> : 
            ( heroes.length === 0 ) &&
            <div className="alert alert-danger">
              There`s no results
            </div>
          }
          { heroes.map( hero => (
            <HeroCard key={ hero.id } { ...hero } />
          ))}
        </div>
      </div>
    </>
  )
}
