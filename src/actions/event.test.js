import {setEvent, deleteEvent, editEvent} from './event';

const event = {
    id: "6764565",
    title: "I am doing",
    description: "AWESOME at this test",
    capacity: 10,
    date: "2018-09-09 10:30 AM"
}

test('should return event setting action object', () =>{
    
    const action = setEvent(event);
    expect(action).toEqual({
        type: 'SET_EVENTS',
        events: event
    });
}); 


test('should return event removing action with event ID action object', () =>{
    const eventId = event.id;
    const action = deleteEvent(eventId);
    expect(action).toEqual({
        type: 'DELETE_EVENT',
        eventId
    });
});

test('should return event editing action with new event values', () =>{

    const action = editEvent(event);
    expect(action).toEqual({
        type: 'EDIT_EVENT',
        event
    });
});