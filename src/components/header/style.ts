import styled from "styled-components";

export const HeaderBase = styled.nav`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black950 || "#0F0F0F"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line100 || "#eeeeee"};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 120px;
`;

export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const Logo = styled.span`
  cursor: pointer;
`;

export const MenuLinks = styled.div`
  display: flex;
  gap: 24px;

  a {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black100 || "#ffffff"};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.blue200 || "#0070f3"};
    }
  }
`;

export const UserLinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  transition: background-color 0.2s ease;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black100 || "#ffffff"};
`;

export const ProfileImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.black200 || "#e0e0e0"};
  position: relative;
`;
