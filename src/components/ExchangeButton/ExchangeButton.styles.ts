import styled from 'styled-components';

export const ExchangeButton = styled.button`
  border: none;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  margin: 2rem auto 0;
  padding: 2rem 8rem;
  transition: background-color 0.4s linear;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.exchangeBtnHover};
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    padding: 2rem 4rem;
    width: 100%;
  }
`;
