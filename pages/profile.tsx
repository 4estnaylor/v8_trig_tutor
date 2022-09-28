import React, { useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import useTrigUser from '../utils/hooks/useTrigUser';
import { useSession, signIn } from 'next-auth/react';
import styled from 'styled-components';
import cl from '../colors';
import Gap from '../components/Gaps/Gap';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import VideocamIcon from '@mui/icons-material/Videocam';
import validator from 'validator';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import TextsmsIcon from '@mui/icons-material/Textsms';
import CallIcon from '@mui/icons-material/Call';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const profile = () => {
  const [userEnteredName, setUserEnteredName] = useState('');
  const [userEnteredPhone, setUserEnteredPhone] = useState('');
  const userEnteredPhoneWithoutPunctuation = userEnteredPhone.replace(' ', '');
  const isUserEnteredPhoneValid = userEnteredPhoneWithoutPunctuation;

  const trigUser = useTrigUser();
  const googleUser = useSession().data?.user;

  const preferredName =
    trigUser?.name || googleUser?.name || trigUser?.email || 'loading';

  return (
    <div>
      <ResponsiveAppBar />
      <Gap height={30} />
      <Wrapper>
        <InfoItem>
          <InfoLabel> google acount </InfoLabel>
          <UserInfo>
            <Avatar alt={googleUser?.name || 'na'} src={googleUser?.image!} />
            <Gmail>{trigUser?.email || 'loading...'}</Gmail>
          </UserInfo>
          {/* <EditButton
            style={{ pointerEvents: 'revert' }}
            onClick={() => {
              window.alert(
                'you cannot change your linked google account for your trig tutor account here. But, it can be done!   \n \n (1) Send email to me at forrest@trig-tutor.com from your current google account, and I can change it for you.  \n \n or \n \n (2) Alternatively, create a new account with a different google google account.'
              );
            }}
          >
            <LockIcon />
          </EditButton> */}
        </InfoItem>
        <InfoItem>
          <InfoLabel> meet link </InfoLabel>
          <UserInfo>
            {' '}
            meet.google.com/svs-ntia-esz
            <EditButton
              style={{ pointerEvents: 'none', paddingRight: '20px' }}
              onClick={() => {}}
            >
              <ContentCopyIcon />
            </EditButton>
          </UserInfo>
        </InfoItem>
        <InfoItem>
          <InfoLabel>preferred name </InfoLabel>
          <UserInfoInput
            value={userEnteredName}
            placeholder={preferredName || 'loading...'}
            onChange={(e) => {
              setUserEnteredName(e.target.value);
            }}
          />

          {/* <SaveButton>save</SaveButton> */}
          {/* <EditButton>
            <EditIcon />
          </EditButton> */}
        </InfoItem>
        <InfoItem>
          <InfoLabel>{'phone (optional)'}</InfoLabel>
          <MyPhoneInput
            value={userEnteredPhone}
            onChange={() => {
              setUserEnteredPhone;
            }}
            placeholder="123 456 7890"
          />
        </InfoItem>
        <InfoItem>
          <InfoLabel>reminders</InfoLabel>
          <RemindersOptions>
            <EmailReminder>
              <EmailIcon className="BeforeIcon" />
              <ReminderNoticeTime>
                30 mins <Before>before</Before>
              </ReminderNoticeTime>

              <Switch disabled defaultChecked />
            </EmailReminder>
            <TextReminder>
              <TextsmsIcon className="AfterIcon" />
              <ReminderNoticeTime>
                2 mins <After>after</After>
              </ReminderNoticeTime>

              <Switch />
            </TextReminder>
            <CallReminder>
              <CallIcon className="AfterIcon" />
              <ReminderNoticeTime>
                5 mins <After>after</After>
              </ReminderNoticeTime>

              <Switch />
            </CallReminder>
          </RemindersOptions>
        </InfoItem>
        <Gap height={15} />
        <SaveButton variant="contained">Save Changes</SaveButton>
      </Wrapper>
    </div>
  );
};

const SaveButton = styled(Button)`
  background-color: ${cl.getHSL(cl.blue)};

  &:hover {
    background-color: ${cl.getHSLA(cl.blue, 0.5)};
  }
  width: 100%;
`;

const RemindersOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;

const Gmail = styled.div`
  flex: 2;
  text-align: center;
`;

const Reminder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & .MuiSvgIcon-root.AfterIcon {
    color: ${cl.getHSL(cl.red)};
  }

  & .MuiSvgIcon-root.BeforeIcon {
    color: ${cl.getHSL(cl.blue)};
  }
`;

const ReminderNoticeTime = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Before = styled.div`
  color: ${cl.getHSL(cl.blue)};
`;

const After = styled.div`
  color: ${cl.getHSL(cl.red)};
`;

const EmailReminder = styled(Reminder)``;

const TextReminder = styled(Reminder)``;

const CallReminder = styled(Reminder)``;

const MyPhoneInput = styled(PhoneInputWithCountrySelect)`
  padding-left: 10px;
  height: 50px;

  &.PhoneInput {
  }

  .PhoneInputCountry {
  }

  .PhoneInputCountryIcon {
    box-shadow: none;
    background-color: transparent;
  }

  .PhoneInputInput {
    border: none;
    font-size: 1rem;
    padding: 10px;
    border-radius: 8px;
    background-color: ${cl.getHSLA(cl.blue, 0.1)};
  }
`;

const Wrapper = styled.form`
  background-color: ${cl.getHSL(cl.white)};
  max-width: 350px;
  margin: auto;
`;

const CopyIcon = styled.div``;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;

  /* border: 2px solid ${cl.getHSL(cl.blue)}; */

  position: relative;
  border-bottom: 1px solid ${cl.getHSLA(cl.gray_mid, 0.3)};
  padding: 20px;
`;
const InfoLabel = styled.div`
  display: flex;
  align-items: center;

  padding-left: 10px;
  color: ${cl.getHSLA(cl.gray_mid, 0.9)};
  background-color: ${cl.getHSL(cl.white)};
`;

const UnchangeableInfoItem = styled(InfoItem)``;

const UserEmailInfo = styled.div`
  border: none;
  height: 41px;
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
  color: ${cl.getHSL(cl.black)};
  border-radius: 8px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
  overflow: hidden;
  color: ${cl.getHSL(cl.gray_dark)};
  border-radius: 8px;
`;
const UserInfoInput = styled.input`
  cursor: pointer;
  margin: 4px;
  margin-left: 10px;

  border: none;
  background-color: ${cl.getHSLA(cl.blue, 0.1)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
  color: ${cl.getHSL(cl.gray_dark)};
  font-size: 1rem;
`;
const EditButton = styled.div`
  cursor: pointer;
  pointer-events: none;
  position: absolute;

  right: 0;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px 8px 8px 8px;
  /* border: 2px solid ${cl.getHSL(cl.blue)}; */

  background-color: ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.blue)};
`;

const MeetCode = styled.input`
  /* border: 2px solid ${cl.getHSL(cl.gray_mid)}; */
  border: none;
  background-color: ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.black)};
  padding: 4px;
  border-radius: 4px 0 0 4px;
  height: 40px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-right: none;
`;

export default profile;
