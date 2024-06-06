// src/__tests__/Popup.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Popup from '../components/Popup';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';

jest.mock('../redux/userRelated/userSlice', () => ({
    underControl: jest.fn(),
}));

jest.mock('../redux/studentRelated/studentSlice', () => ({
    underStudentControl: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Popup Component', () => {
    let store;
    let setShowPopup;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();
        setShowPopup = jest.fn();
    });

    const renderComponent = (message, showPopup) => {
        render(
            <Provider store={store}>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Provider>
        );
    };

    it('renders the success message', () => {
        renderComponent("Done Successfully", true);
        expect(screen.getByText("Done Successfully")).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess');
    });

    it('renders the error message', () => {
        renderComponent("Error Occurred", true);
        expect(screen.getByText("Error Occurred")).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledError');
    });

    it('dispatches actions and closes on close event', () => {
        renderComponent("Done Successfully", true);
        fireEvent.click(screen.getByRole('alert'));

        expect(setShowPopup).toHaveBeenCalledWith(false);
        expect(store.dispatch).toHaveBeenCalledWith(underControl());
        expect(store.dispatch).toHaveBeenCalledWith(underStudentControl());
    });
});
