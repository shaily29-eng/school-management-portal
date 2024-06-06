import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Popup from '../components/Popup';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Popup Component', () => {
    let store;
    let setShowPopup;
    let showPopup = true;

    beforeEach(() => {
        store = mockStore({});
        setShowPopup = jest.fn();
    });

    test('renders success message correctly', () => {
        render(
            <Provider store={store}>
                <Popup message="Done Successfully" setShowPopup={setShowPopup} showPopup={showPopup} />
            </Provider>
        );

        const alert = screen.getByText(/Done Successfully/i);
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('MuiAlert-filledSuccess');
    });

    test('renders error message correctly', () => {
        render(
            <Provider store={store}>
                <Popup message="Something went wrong" setShowPopup={setShowPopup} showPopup={showPopup} />
            </Provider>
        );

        const alert = screen.getByText(/Something went wrong/i);
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass('MuiAlert-filledError');
    });

    test('closes the popup on close button click', () => {
        render(
            <Provider store={store}>
                <Popup message="Done Successfully" setShowPopup={setShowPopup} showPopup={showPopup} />
            </Provider>
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(setShowPopup).toHaveBeenCalledWith(false);
    });
});
