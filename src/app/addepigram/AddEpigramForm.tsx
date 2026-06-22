"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { createEpigram } from "@/api/epigram";
import Input from "@/components/input";
import { useAuth } from "@/contexts/AuthContext";
import { buildCreateEpigramBody } from "@/lib/build-epigram-body";
import { getEpigramSubmitErrorMessage } from "@/lib/epigram-submit-error";
import { getAccessToken } from "@/lib/auth-token";
import { FORM_MAX_WIDTH } from "@/lib/addepigram-page";
import { FORM_FIELD_HEIGHT } from "@/styles/form";
import {
  canAddTag,
  CONTENT_MAX_LENGTH,
  getContentError,
  hasAddEpigramFieldErrors,
  isAddEpigramFormReady,
  MAX_TAG_LENGTH,
  MAX_TAGS,
  REFERENCE_TITLE_MAX_LENGTH,
  REFERENCE_URL_MAX_LENGTH,
  resolveAuthor,
  validateAddEpigramFieldOnBlur,
  validateAddEpigramForm,
  type AddEpigramField,
  type AddEpigramFieldErrors,
  type AuthorType,
} from "@/lib/validation/addepigram";

const AUTHOR_OPTIONS: { value: AuthorType; label: string }[] = [
  { value: "custom", label: "직접 입력" },
  { value: "unknown", label: "알 수 없음" },
  { value: "self", label: "본인" },
];

export default function AddEpigramForm() {
  const router = useRouter();
  const { userName } = useAuth();

  const [content, setContent] = useState("");
  const [authorType, setAuthorType] = useState<AuthorType>("custom");
  const [authorName, setAuthorName] = useState("");
  const [referenceTitle, setReferenceTitle] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState<AddEpigramFieldErrors>({});
  const [blurredFields, setBlurredFields] = useState<
    Partial<Record<AddEpigramField, boolean>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
    }
  }, [router]);

  const formValues = useMemo(
    () => ({
      content,
      authorType,
      authorName,
      referenceTitle,
      referenceUrl,
      tags,
    }),
    [content, authorType, authorName, referenceTitle, referenceUrl, tags],
  );

  const contentError = getContentError(content);
  const showContentError =
    !!contentError &&
    (blurredFields.content || content.length > CONTENT_MAX_LENGTH);

  const canSubmit = isAddEpigramFormReady(formValues, userName);

  const getDisplayError = (field: AddEpigramField) =>
    blurredFields[field] ? fieldErrors[field] : undefined;

  const handleFieldBlur = (field: AddEpigramField) => {
    setBlurredFields((prev) => ({ ...prev, [field]: true }));
    const message = validateAddEpigramFieldOnBlur(field, formValues, userName);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const clearFieldError = (field: AddEpigramField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleAuthorTypeChange = (nextType: AuthorType) => {
    setAuthorType(nextType);
    clearFieldError("authorName");
    if (nextType !== "custom") {
      setAuthorName("");
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!canAddTag(tags, trimmed)) return;

    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
    clearFieldError("tags");
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== "Enter") return;

    e.preventDefault();
    handleAddTag();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    setBlurredFields({
      content: true,
      authorName: true,
      referenceTitle: true,
      referenceUrl: true,
      tags: true,
    });

    const errors = validateAddEpigramForm(formValues, userName);
    if (hasAddEpigramFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const epigram = await createEpigram(
        buildCreateEpigramBody({
          content,
          author: resolveAuthor(formValues, userName),
          referenceTitle,
          referenceUrl,
          tags,
        }),
      );

      router.push(`/epigrams/${epigram.id}`);
    } catch (error) {
      setSubmitError(getEpigramSubmitErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <FieldLabel htmlFor="epigram-content">
          내용
          <RequiredMark aria-hidden>*</RequiredMark>
        </FieldLabel>
        <TextArea
          id="epigram-content"
          placeholder="500자 이내로 입력해주세요."
          value={content}
          $hasError={!!showContentError}
          aria-invalid={!!showContentError}
          aria-describedby={
            showContentError ? "epigram-content-error" : undefined
          }
          onBlur={() => handleFieldBlur("content")}
          onChange={(e) => {
            setContent(e.target.value);
            clearFieldError("content");
            setSubmitError("");
          }}
        />
        {showContentError && (
          <FieldMessage id="epigram-content-error" role="alert">
            {contentError}
          </FieldMessage>
        )}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel>
          저자
          <RequiredMark aria-hidden>*</RequiredMark>
        </FieldLabel>
        <RadioGroup role="radiogroup" aria-label="저자 선택">
          {AUTHOR_OPTIONS.map(({ value, label }) => (
            <RadioOption key={value}>
              <RadioInput
                type="radio"
                name="authorType"
                value={value}
                checked={authorType === value}
                onChange={() => handleAuthorTypeChange(value)}
              />
              {label}
            </RadioOption>
          ))}
        </RadioGroup>
        {authorType === "custom" && (
          <Input
            type="text"
            placeholder="저자 이름 입력"
            $size="lg"
            $appearance="outlined"
            value={authorName}
            errorMessage={getDisplayError("authorName")}
            onBlur={() => handleFieldBlur("authorName")}
            onChange={(e) => {
              setAuthorName(e.target.value);
              clearFieldError("authorName");
            }}
          />
        )}
        {authorType === "self" && getDisplayError("authorName") && (
          <FieldMessage role="alert">{fieldErrors.authorName}</FieldMessage>
        )}
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="reference-title">출처</FieldLabel>
        <SourceFields>
          <Input
            id="reference-title"
            type="text"
            placeholder="출처 제목 입력"
            $size="lg"
            $appearance="outlined"
            value={referenceTitle}
            maxLength={REFERENCE_TITLE_MAX_LENGTH}
            errorMessage={getDisplayError("referenceTitle")}
            onBlur={() => handleFieldBlur("referenceTitle")}
            onChange={(e) => {
              setReferenceTitle(e.target.value);
              clearFieldError("referenceTitle");
            }}
          />
          <Input
            type="url"
            placeholder="URL (ex. https://www.website.com)"
            $size="lg"
            $appearance="outlined"
            value={referenceUrl}
            maxLength={REFERENCE_URL_MAX_LENGTH}
            errorMessage={getDisplayError("referenceUrl")}
            onBlur={() => handleFieldBlur("referenceUrl")}
            onChange={(e) => {
              setReferenceUrl(e.target.value);
              clearFieldError("referenceUrl");
            }}
          />
        </SourceFields>
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="epigram-tags">
          태그
          <RequiredMark aria-hidden>*</RequiredMark>
        </FieldLabel>
        <Input
          id="epigram-tags"
          type="text"
          placeholder="입력하여 태그 작성 (최대 10자)"
          $size="lg"
          $appearance="outlined"
          value={tagInput}
          disabled={tags.length >= MAX_TAGS}
          maxLength={MAX_TAG_LENGTH}
          onKeyDown={handleTagInputKeyDown}
          onChange={(e) => setTagInput(e.target.value)}
        />
        {getDisplayError("tags") && (
          <FieldMessage role="alert">{fieldErrors.tags}</FieldMessage>
        )}
        {tags.length > 0 && (
          <TagList>
            {tags.map((tag) => (
              <TagChip key={tag}>
                #{tag}
                <TagRemoveButton
                  type="button"
                  aria-label={`${tag} 태그 삭제`}
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </TagRemoveButton>
              </TagChip>
            ))}
          </TagList>
        )}
      </FieldGroup>

      {submitError && <FormError role="alert">{submitError}</FormError>}

      <SubmitButton
        type="submit"
        $ready={canSubmit && !isSubmitting}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? "저장 중..." : "작성 완료"}
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
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

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FieldLabel = styled.label`
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

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.state};
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
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

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 12px;
`;

const RadioOption = styled.label`
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

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: ${({ theme }) => theme.colors.blue800};
  cursor: pointer;
`;

const SourceFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const TagChip = styled.span`
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

const TagRemoveButton = styled.button`
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

const FieldMessage = styled.p`
  margin: 8px 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXs.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXs.lineHeight};
  color: ${({ theme }) => theme.colors.state};
`;

const FormError = styled.p`
  margin: -16px 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.state};
`;

const SubmitButton = styled.button<{ $ready: boolean }>`
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
