import { types } from "../../../src/auth/types/types"


describe('types test', () => {

    test('should return the corrects types', () => {
      
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    })
    
})
