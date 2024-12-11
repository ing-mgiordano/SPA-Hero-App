import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"
import { MemoryRouter, Route, Routes } from "react-router-dom"


describe('<PublicRoute /> test', () => {

    test('should show "children" if is not loggin', () => {
      
        const contexValue  = {
            logged: false
        }
        const childrenValue = 'ShowChildren'

      render(
        <AuthContext.Provider value={ contexValue }>
            <PublicRoute>
                {childrenValue}
            </PublicRoute>
        </AuthContext.Provider>
      )

      expect( screen.getAllByText(childrenValue)).toBeTruthy()
      /* screen.debug() */

    })

    test('should show "Navigate" if is loggin', () => {
      
        const contexValue  = {
            logged: true,
            user: {
                name: 'Name1',
                id: 'ABC123'
            }
        }
        const childrenValue = 'ShowChildren'
        const navigateValue = 'ShowMarvelPage'

      render(
        <AuthContext.Provider value={ contexValue }>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="login" element={ 
                            <PublicRoute>
                                {childrenValue}
                            </PublicRoute>
                        }
                    />
                    <Route path="marvel" element={ navigateValue } />
                </Routes>
                <PublicRoute>
                    {childrenValue}
                </PublicRoute>

            </MemoryRouter>
        </AuthContext.Provider>
      )

      expect( screen.getAllByText(navigateValue)).toBeTruthy()
      screen.debug()

    })
    
})