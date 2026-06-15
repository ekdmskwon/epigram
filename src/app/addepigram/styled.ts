import styled from "styled-components";
import { FORM_FIELD_HEIGHT } from "@/styles/form";
import { FORM_MAX_WIDTH } from "./constants";

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.blue100};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 128px 16px 80px;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const PageTitle = styled.h1`
  width: 100%;
  max-width: ${FORM_MAX_WIDTH}px;
  margin: 0 0 40px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.text2xl.lineHeight};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

export const Form = styled.form`
  width: 100%;
  max-width: ${FORM_MAX_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  input::placeholder {
    color: ${({ theme }) => theme.colors.blue400};
    font-weight: 400;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.state};
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.line200};
  border-radius: 12px;
  background-color: #ffffff;
  box-sizing: border-box;
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black950};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue400};
    font-weight: 400;
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.state : theme.colors.inputBorderFocus};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 12px;
`;

export const RadioOption = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black950};
`;

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: ${({ theme }) => theme.colors.blue800};
  cursor: pointer;
`;

export const SourceFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.blue200};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue800};
`;

export const TagRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue700};
  font-size: 14px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue950};
  }
`;

export const FieldMessage = styled.p`
  margin: 8px 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXs.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXs.lineHeight};
  color: ${({ theme }) => theme.colors.state};
`;

export const FormError = styled.p`
  margin: -16px 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.state};
`;

export const SubmitButton = styled.button<{ $ready: boolean }>`
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
