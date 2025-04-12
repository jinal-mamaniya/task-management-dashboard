import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '../../store/slices/uiSlice';

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.text.primary}10;
  }
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <ToggleButton onClick={handleToggle}>
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle;