"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createEpigram } from "@/api/epigram";
import Input from "@/components/input";
import { useAuth } from "@/contexts/AuthContext";
import { getAccessToken } from "@/lib/auth-token";
import {
  canAddTag,
  CONTENT_MAX_LENGTH,
  getContentError,
  hasAddEpigramFieldErrors,
  isAddEpigramFormReady,
  MAX_TAG_LENGTH,
  MAX_TAGS,
  resolveAuthor,
  validateAddEpigramFieldOnBlur,
  validateAddEpigramForm,
  type AddEpigramField,
  type AddEpigramFieldErrors,
  type AuthorType,
} from "@/lib/validation/addepigram";
import * as S from "../styled";

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
    });

    const errors = validateAddEpigramForm(formValues, userName);
    if (hasAddEpigramFieldErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const epigram = await createEpigram({
        content: content.trim(),
        author: resolveAuthor(formValues, userName),
        ...(referenceTitle.trim() && {
          referenceTitle: referenceTitle.trim(),
        }),
        ...(referenceUrl.trim() && { referenceUrl: referenceUrl.trim() }),
        ...(tags.length > 0 && { tags }),
      });

      router.push(`/epigram/${epigram.id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        setSubmitError(
          "서버에 연결할 수 없습니다. API 주소를 확인한 뒤 다시 시도해주세요.",
        );
        return;
      }

      setSubmitError(
        "에피그램 저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
      <S.FieldGroup>
        <S.FieldLabel htmlFor="epigram-content">
          내용
          <S.RequiredMark aria-hidden>*</S.RequiredMark>
        </S.FieldLabel>
        <S.TextArea
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
          <S.FieldMessage id="epigram-content-error" role="alert">
            {contentError}
          </S.FieldMessage>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldLabel>
          저자
          <S.RequiredMark aria-hidden>*</S.RequiredMark>
        </S.FieldLabel>
        <S.RadioGroup role="radiogroup" aria-label="저자 선택">
          {AUTHOR_OPTIONS.map(({ value, label }) => (
            <S.RadioOption key={value}>
              <S.RadioInput
                type="radio"
                name="authorType"
                value={value}
                checked={authorType === value}
                onChange={() => handleAuthorTypeChange(value)}
              />
              {label}
            </S.RadioOption>
          ))}
        </S.RadioGroup>
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
          <S.FieldMessage role="alert">{fieldErrors.authorName}</S.FieldMessage>
        )}
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldLabel htmlFor="reference-title">출처</S.FieldLabel>
        <S.SourceFields>
          <Input
            id="reference-title"
            type="text"
            placeholder="출처 제목 입력"
            $size="lg"
            $appearance="outlined"
            value={referenceTitle}
            onChange={(e) => setReferenceTitle(e.target.value)}
          />
          <Input
            type="url"
            placeholder="URL (ex. https://www.website.com)"
            $size="lg"
            $appearance="outlined"
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
          />
        </S.SourceFields>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldLabel htmlFor="epigram-tags">태그</S.FieldLabel>
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
        {tags.length > 0 && (
          <S.TagList>
            {tags.map((tag) => (
              <S.TagChip key={tag}>
                #{tag}
                <S.TagRemoveButton
                  type="button"
                  aria-label={`${tag} 태그 삭제`}
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </S.TagRemoveButton>
              </S.TagChip>
            ))}
          </S.TagList>
        )}
      </S.FieldGroup>

      {submitError && <S.FormError role="alert">{submitError}</S.FormError>}

      <S.SubmitButton
        type="submit"
        $ready={canSubmit && !isSubmitting}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? "저장 중..." : "작성 완료"}
      </S.SubmitButton>
    </S.Form>
  );
}
