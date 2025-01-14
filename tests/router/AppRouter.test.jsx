import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"

describe('<AppRouter /> test', () => {

    test('should display loggin page if not is auth', () => {
      
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Login').length ).toBe(2)
        /* screen.debug() */
    })

    test('should display mavel component if is auth', () => {
        
        const contextValue = {
            logged: true,
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Marvel Comics')).toBeTruthy()
        screen.debug()
    })
})