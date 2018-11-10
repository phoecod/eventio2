import {Landing, EventDisplay} from './Landing';
import {EventItem} from './EventItem';
import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import { ExpansionPanelActions } from '@material-ui/core';

const events = [
    {
        id: 34343,
        title: 'test 1',
        description: 'what is love',
        capacity: 5,
        date: new Date()
    },
    {
        id: 2132,
        title: 'test 2',
        description: 'baby,dont hurt me',
        capacity: 10,
        date: new Date()
    },
    {
        id: 643,
        title: 'test 3',
        description: 'no more',
        capacity: 1,
        date: new Date ()
    }
]

it('shows eventItem', () => {
    const fetchEvents = jest.fn();
    const wrapped = shallow(<EventDisplay fetchEvents={fetchEvents} events={events} />);

expect(wrapped.find('EventItem').length).toEqual(1);
})