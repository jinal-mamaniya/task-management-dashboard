import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
        return css`
          background-color: transparent;
          border: 1px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          
          &:hover {
            background-color: ${theme.colors.primary}10;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          
          &:hover {
            background-color: ${theme.colors.primary}10;
          }
        `;
      default: // primary
        return css`
          background-color: ${theme.colors.primary};
          color: white;
          box-shadow: ${theme.shadows.sm};
          
          &:hover {
            background-color: ${theme.colors.secondary};
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
  }}
  
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${`${theme.spacing.xs} ${theme.spacing.sm}`};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'large':
        return css`
          padding: ${`${theme.spacing.md} ${theme.spacing.lg}`};
          font-size: ${theme.fontSizes.lg};
        `;
      default: // medium
        return css``;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;