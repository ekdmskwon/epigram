import styled from "styled-components";

/** Figma 회원가입 폼 필드·버튼 크기 */
export const SIGNUP_FIELD_WIDTH = 640;
export const SIGNUP_FIELD_HEIGHT = 64;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: ${SIGNUP_FIELD_WIDTH}px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 48px 16px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (min-width: ${SIGNUP_FIELD_WIDTH}px) {
    width: ${SIGNUP_FIELD_WIDTH}px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const FormFields = styled.div`
  width: 100%;
  max-width: ${SIGNUP_FIELD_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${SIGNUP_FIELD_WIDTH}px;
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: ${SIGNUP_FIELD_WIDTH}px;
  height: ${SIGNUP_FIELD_HEIGHT}px;
  margin-top: 8px;

  button {
    width: 100%;
    height: ${SIGNUP_FIELD_HEIGHT}px;
    min-height: ${SIGNUP_FIELD_HEIGHT}px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const FormError = styled.p`
  width: 100%;
  max-width: ${SIGNUP_FIELD_WIDTH}px;
  color: ${({ theme }) => theme.colors.state};
  font-size: 14px;
  text-align: center;
  margin-top: -8px;
`;
