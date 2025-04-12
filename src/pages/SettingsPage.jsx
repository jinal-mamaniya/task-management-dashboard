import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "../components/ui";
import { toggleTheme, selectTheme } from "../store/slices/uiSlice";

const SettingsContainer = styled.div`
  max-width: 800px;
`;

const SettingSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled}40;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.disabled}20;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SettingDescription = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SettingDetail = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SettingControl = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.text.disabled};
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  // Local state for settings that would connect to Redux in a full app
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [defaultView, setDefaultView] = useState("board");
  const [defaultPriority, setDefaultPriority] = useState("medium");

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div>
      <h1>Settings</h1>
      <p>Customize your task management experience</p>

      <SettingsContainer>
        <SettingSection>
          <SectionTitle>Appearance</SectionTitle>

          <SettingRow>
            <SettingDescription>
              <SettingLabel>Dark Mode</SettingLabel>
              <SettingDetail>
                Switch between light and dark themes
              </SettingDetail>
            </SettingDescription>
            <SettingControl>
              <Toggle>
                <input
                  type="checkbox"
                  checked={currentTheme === "dark"}
                  onChange={handleThemeToggle}
                />
                <span></span>
              </Toggle>
            </SettingControl>
          </SettingRow>
        </SettingSection>

        <SettingSection>
          <SectionTitle>Notifications</SectionTitle>

          <SettingRow>
            <SettingDescription>
              <SettingLabel>Email Notifications</SettingLabel>
              <SettingDetail>
                Receive task reminders and updates via email
              </SettingDetail>
            </SettingDescription>
            <SettingControl>
              <Toggle>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <span></span>
              </Toggle>
            </SettingControl>
          </SettingRow>

          <SettingRow>
            <SettingDescription>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDetail>
                Receive task reminders and updates as push notifications
              </SettingDetail>
            </SettingDescription>
            <SettingControl>
              <Toggle>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                <span></span>
              </Toggle>
            </SettingControl>
          </SettingRow>
        </SettingSection>

        <SettingSection>
          <SectionTitle>Task Defaults</SectionTitle>

          <SettingRow>
            <SettingDescription>
              <SettingLabel>Default View</SettingLabel>
              <SettingDetail>
                Choose your preferred task view layout
              </SettingDetail>
            </SettingDescription>
            <SettingControl>
              <Select
                value={defaultView}
                onChange={(e) => setDefaultView(e.target.value)}
              >
                <option value="board">Board View</option>
                <option value="list">List View</option>
                <option value="calendar">Calendar View</option>
              </Select>
            </SettingControl>
          </SettingRow>

          <SettingRow>
            <SettingDescription>
              <SettingLabel>Default Priority</SettingLabel>
              <SettingDetail>
                Set the default priority for new tasks
              </SettingDetail>
            </SettingDescription>
            <SettingControl>
              <Select
                value={defaultPriority}
                onChange={(e) => setDefaultPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </SettingControl>
          </SettingRow>
        </SettingSection>

        <Button>Save Changes</Button>
      </SettingsContainer>
    </div>
  );
};

export default SettingsPage;
