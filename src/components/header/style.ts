import Link from "next/link";
import styled from "styled-components";

export const HEADER_HEIGHT = 80;

export const HeaderBase = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.black950};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const InnerContainer = styled.div<{ $layout?: "guest" | "user" }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $layout }) =>
    $layout === "guest" ? "center" : "space-between"};
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 40px;
  }

  @media (min-width: 1200px) {
    padding: 0 120px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 36px;
  }
`;

export const Logo = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

export const MenuLinks = styled.nav`
  display: none;
  gap: 24px;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black100};
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const HamburgerIcon = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.black100};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black100};
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }
`;

export const MobileMenuPanel = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  padding: 24px 16px;
  background-color: ${({ theme }) => theme.colors.black950};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 999;

  @media (min-width: 768px) {
    display: none;
  }

  a {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black100};
    text-decoration: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
`;

export const UserLinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black100};
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;
