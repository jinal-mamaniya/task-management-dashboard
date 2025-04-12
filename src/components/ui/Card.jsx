import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export default Card;