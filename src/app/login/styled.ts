import styled from "styled-components";
import { FORM_FIELD_HEIGHT, FORM_FIELD_WIDTH } from "@/styles/form";

export const LoginPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginMain = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px 16px 64px;
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (min-width: ${FORM_FIELD_WIDTH}px) {
    width: ${FORM_FIELD_WIDTH}px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  margin-bottom: 8px;
`;

export const FormFields = styled.div`
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  height: ${FORM_FIELD_HEIGHT}px;
  margin-top: 8px;

  button {
    width: 100%;
    height: ${FORM_FIELD_HEIGHT}px;
    min-height: ${FORM_FIELD_HEIGHT}px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const LoginButton = styled.button<{ $ready: boolean }>`
  width: 100%;
  height: ${FORM_FIELD_HEIGHT}px;
  border: none;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXl.lineHeight};
  font-weight: 600;
  color: #ffffff;
  cursor: ${({ $ready }) => ($ready ? "pointer" : "not-allowed")};
  background-color: ${({ theme, $ready }) =>
    $ready ? theme.colors.blue600 : theme.colors.blue300};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $ready }) =>
      $ready ? theme.colors.blue700 : theme.colors.blue300};
  }

  &:disabled {
    opacity: 1;
  }
`;

export const SignUpLinkRow = styled.p`
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  margin: -8px 0 0;
  text-align: right;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black600};
  line-height: 1.5;
`;

export const SignUpLinkText = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.black800};
  }
`;

export const FormError = styled.p`
  width: 100%;
  max-width: ${FORM_FIELD_WIDTH}px;
  color: ${({ theme }) => theme.colors.state};
  font-size: 14px;
  text-align: center;
  margin: -8px 0 0;
`;
