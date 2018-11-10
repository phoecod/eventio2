import {setAuthToken, signOut} from './auth';

test('should return auth action object', () =>{
    const action = setAuthToken("sdgattdgsdf234234");
    expect(action).toEqual({
        type: 'SET_AUTH',
        auth: "sdgattdgsdf234234"
    });
}); 


test('should return auth action object', () =>{
    const action = signOut();
    expect(action).toEqual({
        type: 'REMOVE_AUTH'
    });
});