import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 312px;
`;

export const InputContainer = styled.div<{ $hasError: boolean }>`
  display: flex;
  align-items: center;
  width: 312px;
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.state : theme.colors.blue300};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.state : theme.colors.blue500};
  }

  &:has(input:disabled) {
    background-color: ${({ theme }) => theme.colors.black100};
    border-color: ${({ theme }) => theme.colors.line100};
    cursor: not-allowed;
  }
`;

export const BaseInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black950};
  
  caret-color: ${({ theme }) => theme.colors.blue400};

  div[data-error="true"] & {
    caret-color: ${({ theme }) => theme.colors.state};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black300};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.black400};
  }
`;

export const ErrorMessage = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXs.size};
  color: ${({ theme }) => theme.colors.state};
`;