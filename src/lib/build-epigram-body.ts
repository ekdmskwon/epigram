import type { CreateEpigramRequest, UpdateEpigramRequest } from "@/api/epigram";

type EpigramFormPayload = {
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  tags: string[];
};

export function buildCreateEpigramBody(
  values: EpigramFormPayload,
): CreateEpigramRequest {
  const body: CreateEpigramRequest = {
    content: values.content.trim(),
    author: values.author,
    tags: values.tags,
  };

  const referenceTitle = values.referenceTitle.trim();
  const referenceUrl = values.referenceUrl.trim();

  if (referenceTitle) {
    body.referenceTitle = referenceTitle;
  }

  if (referenceUrl) {
    body.referenceUrl = referenceUrl;
  }

  return body;
}

export function buildUpdateEpigramBody(
  values: EpigramFormPayload,
): UpdateEpigramRequest {
  return buildCreateEpigramBody(values);
}
