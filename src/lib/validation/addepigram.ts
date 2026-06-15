export const CONTENT_MAX_LENGTH = 500;
export const MAX_TAGS = 3;
export const MAX_TAG_LENGTH = 10;

export const UNKNOWN_AUTHOR_LABEL = "알 수 없음";

export type AuthorType = "custom" | "unknown" | "self";

export type AddEpigramField =
  | "content"
  | "authorName"
  | "referenceTitle"
  | "referenceUrl";

export type AddEpigramFieldErrors = Partial<Record<AddEpigramField, string>>;

export type AddEpigramFormValues = {
  content: string;
  authorType: AuthorType;
  authorName: string;
  referenceTitle: string;
  referenceUrl: string;
  tags: string[];
};

export function resolveAuthor(
  values: AddEpigramFormValues,
  userName: string,
): string {
  switch (values.authorType) {
    case "unknown":
      return UNKNOWN_AUTHOR_LABEL;
    case "self":
      return userName.trim();
    case "custom":
    default:
      return values.authorName.trim();
  }
}

export function getContentError(content: string): string | undefined {
  if (!content.trim()) return "내용을 입력해주세요.";
  if (content.length > CONTENT_MAX_LENGTH) {
    return "500자 이내로 입력해주세요.";
  }
  return undefined;
}

function validateReferenceUrl(referenceUrl: string): string | undefined {
  if (referenceUrl.trim()) {
    try {
      const parsed = new URL(referenceUrl.trim());
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return "http:// 또는 https://로 시작하는 유효한 URL을 입력해주세요.";
      }
    } catch {
      return "올바른 URL 형식이 아닙니다.";
    }
  }
  return undefined;
}

export function getReferenceUrlError(referenceUrl: string): string | undefined {
  return validateReferenceUrl(referenceUrl);
}

export function validateAddEpigramFieldOnBlur(
  field: AddEpigramField,
  values: AddEpigramFormValues,
  userName: string,
): string | undefined {
  switch (field) {
    case "content":
      return getContentError(values.content);
    case "authorName":
      if (values.authorType !== "custom") return undefined;
      if (!values.authorName.trim()) return "저자 이름을 입력해주세요.";
      return undefined;
    case "referenceTitle":
      return undefined;
    case "referenceUrl":
      return getReferenceUrlError(values.referenceUrl);
    default:
      return undefined;
  }
}

export function validateAddEpigramForm(
  values: AddEpigramFormValues,
  userName: string,
): AddEpigramFieldErrors {
  const errors: AddEpigramFieldErrors = {};

  const contentError = getContentError(values.content);
  if (contentError) errors.content = contentError;

  if (values.authorType === "custom" && !values.authorName.trim()) {
    errors.authorName = "저자 이름을 입력해주세요.";
  }

  if (values.authorType === "self" && !userName.trim()) {
    errors.authorName = "본인 정보를 불러오지 못했습니다. 다시 로그인해주세요.";
  }

  const referenceUrlError = validateReferenceUrl(values.referenceUrl);
  if (referenceUrlError) {
    errors.referenceUrl = referenceUrlError;
  }

  return errors;
}

export function hasAddEpigramFieldErrors(
  errors: AddEpigramFieldErrors,
): boolean {
  return Object.keys(errors).length > 0;
}

export function isAddEpigramFormReady(
  values: AddEpigramFormValues,
  userName: string,
): boolean {
  return !hasAddEpigramFieldErrors(validateAddEpigramForm(values, userName));
}

export function canAddTag(tags: string[], tagName: string): boolean {
  const trimmed = tagName.trim();
  if (!trimmed) return false;
  if (trimmed.length > MAX_TAG_LENGTH) return false;
  if (tags.length >= MAX_TAGS) return false;
  if (tags.includes(trimmed)) return false;
  return true;
}
