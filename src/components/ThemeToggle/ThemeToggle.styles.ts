import styled from 'styled-components';

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  margin: 20px 0 0 20px;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.blue};
  transition: 0.4s;
  border-radius: 34px;

  ::before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => theme.white};
    transition: 0.4s;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  :checked + ${Slider} {
    background-color: ${({ theme }) => theme.blue};
  }

  :checked + ${Slider}:before {
    transform: translateX(24px);
  }

  :focus + ${Slider} {
    box-shadow: ${({ theme }) => `0 0 2px ${theme.text}`};
  }
`;
