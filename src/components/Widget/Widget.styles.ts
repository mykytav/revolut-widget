import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.error};

  span {
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    margin-left: 1rem;
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.lightBg};
  padding: 2rem 8rem;
  position: relative;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.tabletWidth}) {
    padding: 2rem 4rem;
  }

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    padding: 2rem;
  }
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 600;
`;

export const MarketOrder = styled.div`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 5rem;
  font-size: 2rem;

  span {
    color: ${({ theme }) => theme.balanceText};
    margin-bottom: 2rem;
  }
`;

export const Block = styled.div<{
  alignItems?: CSSProperties['alignItems'];
  width?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => `${width} || 100%`};

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const TransactionSwap = styled.button<{ upside: boolean }>`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.5rem solid ${({ theme }) => theme.bg};
  background-color: ${({ theme }) => theme.currencyRowBg};
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 auto;
  outline: none;
  font-size: 3rem;

  :hover {
    box-shadow: 0 0 8px rgba(171, 178, 183, 0.32);
    cursor: pointer;
  }

  svg {
    fill: ${({ theme }) => theme.blue};
    width: 2.5rem;
    height: 2.5rem;
  }

  ${({ upside }) =>
    upside &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `};

  @media (max-width: ${({ theme }) => theme.mobileWidth}) {
    align-items: flex-start;
    margin: 0 auto;
  }
`;
