import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PrivateRoute } from '../../src/router/PrivateRoute'

describe('<PrivateRoute /> test', () => {

    test('should render children if user is logged in', () => {
        const contextValue = {
            logged: true,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Private Component')).toBeTruthy()
    })

    test('should navigate to login if user is not logged in', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route 
                            path="/marvel" 
                            element={
                                <PrivateRoute>
                                    <h1>Private Component</h1>
                                </PrivateRoute>
                            } 
                        />
                        <Route path="/login" element={<h1>Login Page</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Login Page')).toBeTruthy()
    })

    test('should save the last path in localStorage', () => {
        const contextValue = {
            logged: false,
        }

        Storage.prototype.setItem = jest.fn()

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel?query=123']}>
                    <Routes>
                        <Route 
                            path="/marvel" 
                            element={
                                <PrivateRoute>
                                    <h1>Private Component</h1>
                                </PrivateRoute>
                            } 
                        />
                        <Route path="/login" element={<h1>Login Page</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel?query=123')
    })

})
