"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  cancelEpigramLike,
  deleteEpigram,
  getEpigramDetail,
  toggleEpigramLike,
  type EpigramDetailResponse,
} from "@/api/epigram";
import {
  createComment,
  deleteComment,
  updateComment,
  type CommentItem,
} from "@/api/comment";
import { getUserById } from "@/api/user";
import { useAuth } from "@/contexts/AuthContext";
import { useComments } from "@/hooks/useComments";
import { COMMENT_PAGE_SIZE, COMMENT_MAX_LENGTH, EPIGRAM_PAPER_MIN_HEIGHT } from "@/lib/epigram-detail";
import type { User } from "@/types/user";
import { formatRelativeTime } from "@/utils/format-relative-time";
import type { EpigramDetailViewProps } from "./type";

export default function EpigramDetailView({
  epigramId,
  initialEpigram,
  initialComments,
}: EpigramDetailViewProps) {
  const router = useRouter();
  const { isLoggedIn, userId, profileImageUrl } = useAuth();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

  const [epigram, setEpigram] = useState<EpigramDetailResponse>(initialEpigram);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentFormError, setCommentFormError] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [commentActionError, setCommentActionError] = useState("");

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const {
    comments,
    totalCount,
    nextCursor,
    isLoading,
    loadError,
    loadMore,
    prependComment,
    updateCommentInList,
    removeCommentFromList,
  } = useComments(epigramId, COMMENT_PAGE_SIZE, initialComments);

  const isOwner =
    isLoggedIn &&
    userId !== null &&
    epigram.writerId === userId;

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    getEpigramDetail(epigramId)
      .then((data) => { if (!cancelled) setEpigram(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [epigramId, isLoggedIn]);

  useEffect(() => {
    if (!loadMoreRef.current || nextCursor === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMore, nextCursor]);

  const handleToggleLike = async () => {
    if (!isLoggedIn || isLikeLoading) return;

    const prevEpigram = epigram;
    const wasLiked = epigram.isLiked;

    setEpigram((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    setIsLikeLoading(true);
    try {
      const updated = wasLiked
        ? await cancelEpigramLike(epigramId)
        : await toggleEpigramLike(epigramId);
      setEpigram(updated);
    } catch {
      setEpigram(prevEpigram);
      setShareMessage("좋아요 처리에 실패했습니다.");
      setTimeout(() => setShareMessage(""), 2000);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleDeleteEpigram = async () => {
    setIsDeleting(true);
    try {
      await deleteEpigram(epigramId);
      router.push("/epigramlist");
      router.refresh();
    } catch {
      setShareMessage("에피그램 삭제에 실패했습니다.");
      setTimeout(() => setShareMessage(""), 2000);
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  const handleSubmitComment = async () => {
    const trimmed = commentInput.trim();
    if (!trimmed) {
      setCommentFormError("댓글을 입력해주세요.");
      return;
    }
    if (trimmed.length > COMMENT_MAX_LENGTH) {
      setCommentFormError(`${COMMENT_MAX_LENGTH}자 이내로 입력해주세요.`);
      return;
    }
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsSubmittingComment(true);
    setCommentFormError("");
    try {
      const created = await createComment(epigramId, { content: trimmed });
      prependComment(created);
      setCommentInput("");
    } catch {
      setCommentFormError("댓글 등록에 실패했습니다.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const startEditComment = (comment: CommentItem) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setCommentActionError("");
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingContent("");
    setCommentActionError("");
  };

  const saveEditComment = async (commentId: number) => {
    const trimmed = editingContent.trim();
    if (!trimmed) {
      setCommentActionError("댓글을 입력해주세요.");
      return;
    }
    if (trimmed.length > COMMENT_MAX_LENGTH) {
      setCommentActionError(`${COMMENT_MAX_LENGTH}자 이내로 입력해주세요.`);
      return;
    }

    try {
      const updated = await updateComment(commentId, { content: trimmed });
      updateCommentInList(updated);
      cancelEditComment();
    } catch {
      setCommentActionError("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      removeCommentFromList(commentId);
    } catch {
      setCommentActionError("댓글 삭제에 실패했습니다.");
    }
  };

  const openProfileModal = useCallback(async (targetUserId: number) => {
    setProfileModalOpen(true);
    setIsProfileLoading(true);
    setProfileUser(null);
    try {
      const user = await getUserById(targetUserId);
      setProfileUser(user);
    } catch {
      setProfileUser(null);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  const closeProfileModal = () => {
    setProfileModalOpen(false);
    setProfileUser(null);
  };

  return (
    <>
      <EpigramSection>
        <EpigramPaper>
          <EpigramTopRow>
            {(epigram.tags ?? []).length > 0 && (
              <TagRow>
                {(epigram.tags ?? []).map((tag) => (
                  <Tag key={tag.id}>#{tag.name}</Tag>
                ))}
              </TagRow>
            )}
            {isOwner && (
              <MenuWrapper ref={menuWrapperRef}>
                <MenuButton
                  type="button"
                  aria-label="에피그램 메뉴"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <MenuDots aria-hidden>
                    <span />
                    <span />
                    <span />
                  </MenuDots>
                </MenuButton>
                {menuOpen && (
                  <MenuDropdown>
                    <MenuLink
                      href={`/epigrams/${epigramId}/edit`}
                      onClick={() => setMenuOpen(false)}
                    >
                      수정하기
                    </MenuLink>
                    <MenuItem
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        setDeleteModalOpen(true);
                      }}
                    >
                      삭제하기
                    </MenuItem>
                  </MenuDropdown>
                )}
              </MenuWrapper>
            )}
          </EpigramTopRow>

          <EpigramBody>
            <EpigramContent>{epigram.content}</EpigramContent>
            <EpigramAuthor>- {epigram.author} -</EpigramAuthor>
          </EpigramBody>

          <ActionRow>
            <LikeButton
              type="button"
              onClick={handleToggleLike}
              disabled={!isLoggedIn || isLikeLoading}
              $active={epigram.isLiked}
              aria-pressed={epigram.isLiked}
            >
              <Image
                src="/icons/button-like.svg"
                alt=""
                width={28}
                height={26}
                aria-hidden
              />
              {epigram.likeCount}
            </LikeButton>
            {(epigram.referenceTitle || epigram.referenceUrl) &&
              (epigram.referenceUrl ? (
                <SourceLink
                  href={epigram.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="출처 새 창에서 열기"
                >
                  <SourceLabel>
                    {epigram.referenceTitle ?? epigram.referenceUrl}
                  </SourceLabel>
                  <Image
                    src="/icons/button-external.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                  />
                </SourceLink>
              ) : (
                <SourceButton aria-label="출처">
                  <SourceLabel>
                    {epigram.referenceTitle ?? epigram.referenceUrl}
                  </SourceLabel>
                  <Image
                    src="/icons/button-external.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                  />
                </SourceButton>
              ))}
          </ActionRow>
          {shareMessage && <Toast role="status">{shareMessage}</Toast>}
        </EpigramPaper>
      </EpigramSection>

      <CommentSection>
        <CommentHeading>댓글 ({totalCount})</CommentHeading>

        <CommentComposer>
          <AvatarButton type="button" onClick={() => userId && openProfileModal(userId)} disabled={!userId}>
            <Image
              src={profileImageUrl || "/icons/default-avatar.svg"}
              alt=""
              width={40}
              height={40}
              aria-hidden
            />
          </AvatarButton>
          <CommentInputBox>
            <CommentInput
              placeholder="100자 이내로 입력해주세요."
              value={commentInput}
              maxLength={COMMENT_MAX_LENGTH}
              onChange={(e) => {
                setCommentInput(e.target.value);
                setCommentFormError("");
              }}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
            />
            <CommentSaveButton
              type="button"
              onClick={handleSubmitComment}
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? "저장 중..." : "저장"}
            </CommentSaveButton>
          </CommentInputBox>
        </CommentComposer>
        {commentFormError && (
          <CommentError role="alert">{commentFormError}</CommentError>
        )}

        {loadError && <CommentError role="alert">{loadError}</CommentError>}

        {comments.length > 0 && <CommentListDivider aria-hidden />}

        <CommentList>
          {comments.map((comment) => {
            const isCommentOwner =
              userId !== null && comment.writer.id === userId;
            const isEditing = editingCommentId === comment.id;

            return (
              <CommentListItem key={comment.id}>
                <CommentRow>
                  <AvatarButton
                    type="button"
                    onClick={() => openProfileModal(comment.writer.id)}
                  >
                    <Image
                      src={comment.writer.image || "/icons/default-avatar.svg"}
                      alt=""
                      width={32}
                      height={32}
                      aria-hidden
                    />
                  </AvatarButton>

                  <CommentContent>
                    <CommentItemHeader>
                      <CommentMeta>
                        <NameButton
                          type="button"
                          onClick={() => openProfileModal(comment.writer.id)}
                        >
                          {comment.writer.nickname}
                        </NameButton>
                        <TimeText>{formatRelativeTime(comment.createdAt)}</TimeText>
                      </CommentMeta>
                      {isCommentOwner && !isEditing && (
                        <CommentActions>
                          <CommentActionButton type="button" onClick={() => startEditComment(comment)}>
                            수정
                          </CommentActionButton>
                          <CommentActionButton
                            type="button"
                            $danger
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            삭제
                          </CommentActionButton>
                        </CommentActions>
                      )}
                    </CommentItemHeader>

                    {isEditing ? (
                      <EditCommentBox>
                        <CommentInput
                          value={editingContent}
                          maxLength={COMMENT_MAX_LENGTH}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                        <EditActions>
                          <ActionButton type="button" onClick={cancelEditComment}>
                            취소
                          </ActionButton>
                          <ActionButton type="button" onClick={() => saveEditComment(comment.id)}>
                            저장
                          </ActionButton>
                        </EditActions>
                      </EditCommentBox>
                    ) : (
                      <CommentBody>{comment.content}</CommentBody>
                    )}
                  </CommentContent>
                </CommentRow>
              </CommentListItem>
            );
          })}
        </CommentList>

        {commentActionError && (
          <CommentError role="alert">{commentActionError}</CommentError>
        )}

        <LoadMoreSentinel ref={loadMoreRef} aria-hidden />
        {isLoading && comments.length > 0 && (
          <LoadingText>댓글을 불러오는 중...</LoadingText>
        )}
      </CommentSection>

      {deleteModalOpen && (
        <ModalOverlay role="presentation" onClick={() => setDeleteModalOpen(false)}>
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-epigram-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle id="delete-epigram-title">에피그램 삭제</ModalTitle>
            <ModalText>이 에피그램을 삭제하시겠습니까?</ModalText>
            <ModalActions>
              <ModalButton type="button" onClick={() => setDeleteModalOpen(false)}>
                취소
              </ModalButton>
              <ModalButton
                type="button"
                $danger
                disabled={isDeleting}
                onClick={handleDeleteEpigram}
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </ModalButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}

      {profileModalOpen && (
        <ModalOverlay role="presentation" onClick={closeProfileModal}>
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle id="profile-modal-title">프로필</ModalTitle>
            {isProfileLoading ? (
              <ModalText>불러오는 중...</ModalText>
            ) : profileUser ? (
              <ProfileBody>
                <ProfileImage>
                  <Image
                    src={profileUser.image || "/icons/default-avatar.svg"}
                    alt=""
                    width={64}
                    height={64}
                    aria-hidden
                  />
                </ProfileImage>
                <ProfileName>{profileUser.nickname}</ProfileName>
              </ProfileBody>
            ) : (
              <ModalText>프로필을 불러오지 못했습니다.</ModalText>
            )}
            <ModalActions>
              <ModalButton type="button" onClick={closeProfileModal}>
                닫기
              </ModalButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}

const EpigramSection = styled.section`
  margin-bottom: 32px;
`;

const EpigramPaper = styled.div`
  position: relative;
  min-height: ${EPIGRAM_PAPER_MIN_HEIGHT}px;
  padding: 24px 16px 32px;

  @media (min-width: 768px) {
    padding: 32px 22px 40px;
  }
`;

const EpigramTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin-bottom: 12px;
`;

const TagRow = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXl.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.blue400};
`;

const EpigramBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const EpigramContent = styled.blockquote`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: ${({ theme }) => theme.fontSizes.point.text3xl.size};
  line-height: ${({ theme }) => theme.fontSizes.point.text3xl.lineHeight};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black700};
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const EpigramAuthor = styled.p`
  margin: 0;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: ${({ theme }) => theme.fontSizes.point.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.point.text2xl.lineHeight};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue400};
`;

const MenuWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-left: auto;
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.black600};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.line100};
  }
`;

const MenuDots = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;

  span {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 30;
  min-width: 120px;
  padding: 8px 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const MenuLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black800};

  &:hover {
    background: ${({ theme }) => theme.colors.line100};
  }
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black800};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.line100};
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

const LikeButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.blue600 : theme.colors.black600};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXl.lineHeight};
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.15s ease;

  img {
    filter: brightness(0) invert(1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 18px;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  border-radius: 999px;
  background: #ffffff;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black800};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background100};
  }
`;

const SourceButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 18px;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  border-radius: 999px;
  background: #ffffff;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black800};
  cursor: default;
`;

const SourceLabel = styled.span`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Toast = styled.p`
  margin: 8px 0 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  color: ${({ theme }) => theme.colors.blue600};
`;

const CommentSection = styled.section`
  padding-top: 16px;
`;

const CommentHeading = styled.h2`
  margin: 0 0 24px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXl.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

const CommentComposer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const CommentListDivider = styled.div`
  display: flex;
  align-items: center;
  height: 48px;

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.line200};
  }
`;

const AvatarButton = styled.button`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:disabled {
    cursor: default;
  }
`;

const CommentInputBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background100};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.inputBorderFocus};
  }
`;

const CommentInput = styled.textarea`
  display: block;
  width: 100%;
  min-height: 120px;
  max-height: 200px;
  padding: 16px 16px 56px;
  border: none;
  border-radius: 12px;
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textMd.lineHeight};
  color: ${({ theme }) => theme.colors.black950};
  background: transparent;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black400};
  }

  &:focus {
    outline: none;
  }
`;

const CommentSaveButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.black600};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentError = styled.p`
  margin: 0 0 16px;
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  color: ${({ theme }) => theme.colors.state};
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentListItem = styled.article`
  padding: 24px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.line200};
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const CommentRow = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: start;
`;

const CommentContent = styled.div`
  min-width: 0;
`;

const CommentItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const NameButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black300};
  cursor: pointer;
  text-align: left;
  flex-shrink: 0;
`;

const TimeText = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black300};
  white-space: nowrap;
  flex-shrink: 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 0;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.state : theme.colors.black600};
  cursor: pointer;
`;

const CommentActionButton = styled(ActionButton)`
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
`;

const CommentBody = styled.p`
  margin: 16px 0 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textXl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textXl.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black700};
  white-space: pre-wrap;
  word-break: break-word;
`;

const EditCommentBox = styled.div`
  margin-top: 16px;
`;

const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

const LoadMoreSentinel = styled.div`
  height: 1px;
`;

const LoadingText = styled.p`
  margin: 16px 0 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  color: ${({ theme }) => theme.colors.black400};
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
`;

const ModalTitle = styled.h3`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

const ModalText = styled.p`
  margin: 0 0 20px;
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black600};
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButton = styled.button<{ $danger?: boolean }>`
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: ${({ theme, $danger }) =>
    $danger ? theme.colors.state : theme.colors.line100};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  font-weight: 600;
  color: ${({ $danger }) => ($danger ? "#ffffff" : "inherit")};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;
