import { authReducer } from "../../../src/auth"
import { types } from "../../../src/auth/types/types"


describe('authReducer test', () => {

    test('should return init state', () => { 
        const state = authReducer({ logged: false }, {})
        expect(state).toEqual({ logged: false })
    })

    test('should call login and auth the user', () => { 
        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action)
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })
    })

    test('should call logout and desauth the user', () => { 

        const state = {
            logged: true,
            user: {
                name: 'name',
                id: '123'
            }
        }
        const action = {
            type: types.logout
        }
        const newState = authReducer( state, action )
        expect( newState ).toEqual({ logged: false })

    })
})