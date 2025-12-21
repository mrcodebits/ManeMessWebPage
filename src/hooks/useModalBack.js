import { useEffect } from 'react';

/**
 * Custom hook to handle Back button for modals.
 * 
 * When the modal opens, it pushes a new state to the history stack.
 * When the Back button is pressed (popstate), it closes the modal.
 * When the modal is closed manually (e.g., clicking 'X'), it navigates back to clean up the history stack.
 * 
 * @param {boolean} isOpen - Whether the modal is currently open
 * @param {function} onClose - Function to call to close the modal
 * @param {string} modalId - Unique identifier for the modal (optional, for debugging or complex routing)
 */
const useModalBack = (isOpen, onClose, modalId = 'modal') => {
    useEffect(() => {
        if (isOpen) {
            // 1. Push a new state when modal opens
            const state = { [modalId]: true };
            window.history.pushState(state, '', window.location.href);

            // 2. Listen for popstate (Back button press)
            const handlePopState = (event) => {
                // If the processed state doesn't have our modal flag, close it
                // Note: This relies on the fact that 'back' goes to a state WITHOUT this flag.
                onClose();
            };

            window.addEventListener('popstate', handlePopState);

            // 3. Cleanup
            return () => {
                window.removeEventListener('popstate', handlePopState);

                // If the modal is closing but the history state is still 'ours', we need to go back.
                // This handles the "Close via X button" scenario.
                // We check history.state to see if it's the one we pushed.
                if (window.history.state && window.history.state[modalId]) {
                    window.history.back();
                }
            };
        }
    }, [isOpen, onClose, modalId]);
};

export default useModalBack;
