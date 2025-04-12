import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/ui';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Button style={{ marginTop: '2rem' }}>Go to Dashboard</Button>
    </NotFoundContainer>
  );
};

export default NotFound;