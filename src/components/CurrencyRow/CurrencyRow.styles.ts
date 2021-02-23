import styled from 'styled-components';

export const CurrencyRow = styled.div`
  border-radius: 2.5rem;
  background-color: ${({ theme }) => theme.currencyRowBg};
  padding: 4rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    flex-direction: column;
    padding: 4rem 1rem;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  width: 12rem;

  svg {
    fill: ${({ theme }) => theme.text};
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 3rem;
    top: 0.66rem;
    pointer-events: none;

    :hover {
      cursor: pointer;
    }

    @media (max-width: ${({ theme }) => theme.mobileWidth}) {
      right: 2rem;
      top: 0;
    }
  }
`;

export const Select = styled.select`
  border: 0;
  font-size: 3rem;
  background-size: 2rem;
  background-color: ${({ theme }) => theme.currencyRowBg};
  color: ${({ theme }) => theme.text};
  outline: 0;
  appearance: none;
  width: 12rem;
  cursor: pointer;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    padding: 0;
    font-size: 2rem;
    width: 10rem;
    margin-bottom: 0;
  }
`;

export const Balance = styled.div`
  color: ${({ theme }) => theme.balanceText};
  font-size: 1.5rem;

  span {
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    font-size: 1.25rem;
  }
`;

export const Input = styled.input`
  caret-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.text};
  font-size: 3rem;
  background: transparent;
  width: 22rem;
  outline: none;
  border: 0;
  text-align: right;

  ::placeholder {
    color: ${({ theme }) => theme.balanceText};
  }

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    font-size: 2rem;
    text-align: left;
    margin-top: 2rem;
    width: 15rem;
  }
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 1.5rem;
  margin-top: 2rem;
`;
