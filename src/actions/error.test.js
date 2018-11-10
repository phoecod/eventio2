import {setError, removeError} from './error';

test('should return error setting action object', () =>{
    const action = setError("Invalid username");
    expect(action).toEqual({
        type: 'SET_ERROR',
        error: "Invalid username"
    });
}); 


test('should return error removal action object', () =>{
    const action = removeError();
    expect(action).toEqual({
        type: 'REMOVE_ERROR'
    });
});