import React from 'react';

import * as S from './ThemeToggle.styles';

export const ThemeToggle: React.FC<{
  onChange: () => void;
  checked: boolean;
}> = ({ onChange, checked }) => {
  return (
    <S.Label>
      <S.Input checked={checked} type="checkbox" onChange={onChange} />
      <S.Slider className="slider" />
    </S.Label>
  );
};
