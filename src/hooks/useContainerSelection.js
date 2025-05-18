import { useState } from 'react';

export const useContainerSelection = () => {
  const [selectedContainer, setSelectedContainer] = useState(null);

  const handleContainerSelect = (container) => {
    setSelectedContainer(selectedContainer?.size === container.size ? null : container);
  };

  const handleClose = () => {
    setSelectedContainer(null);
  };

  const handleContinue = () => {
    alert('Continue to next step!');
  };

  return {
    selectedContainer,
    handleContainerSelect,
    handleClose,
    handleContinue,
  };
}; 