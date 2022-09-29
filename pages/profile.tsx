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
  const meetLink = 'meet.google.com/svs-ntia-esz';

  const trigUser = useTrigUser();
  const googleUser = useSession().data?.user;

  let trigUserName: string = trigUser?.name;
  console.log(trigUserName);

  const [userEnteredName, setUserEnteredName] = useState(trigUserName || '');
  const [userEnteredPhone, setUserEnteredPhone] = useState('');
  const [textReminder, setTextReminder] = useState(false);
  const [callReminder, setCallReminder] = useState(false);
  // const userEnteredPhoneWithoutPunctuation = userEnteredPhone.replace(' ', '');
  // const isUserEnteredPhoneValid = userEnteredPhoneWithoutPunctuation;
  const [copyTagOn, setCopyTagOn] = useState(false);
  const [hasUserChangedInfo, setHasUserChangedInfo] = useState(false);
  const [meetLinkDisplay, setMeetLinkDisplay] = useState(<div>{meetLink}</div>);

  const preferredName =
    trigUser?.name || googleUser?.name || trigUser?.email || 'loading';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formObject = {
      name: userEnteredName,
      phone: userEnteredPhone,
      reminderPreferences: {
        textReminder,
        callReminder,
      },
    };

    console.log('submitting', formObject);
  };

  const handleCopyButtonClick = () => {
    console.log('happening!');
    navigator.clipboard.writeText(meetLink);
    setCopyTagOn(true);
    setMeetLinkDisplay(<CopiedDisplay>COPIED ✓ </CopiedDisplay>);
    setTimeout(() => {
      setCopyTagOn(false);
      setMeetLinkDisplay(<div>{meetLink}</div>);
    }, 1200);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Gap height={30} />
      <Wrapper
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
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
            {meetLinkDisplay}

            <CopyButton onClick={handleCopyButtonClick}>
              <ContentCopyIcon />
            </CopyButton>
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
            onChange={setUserEnteredPhone}
            defaultCountry="US"
            placeholder="123 456 7890"
          />
        </InfoItem>
        <InfoItem>
          <InfoLabel>session reminders</InfoLabel>
          <RemindersOptions>
            <EmailReminder>
              <Switch disabled defaultChecked />
              <EmailIcon className="BeforeIcon" />
              <ReminderNoticeTime>
                20 mins <Before>before</Before>
              </ReminderNoticeTime>
              <CheckBlue> ✓ </CheckBlue>
            </EmailReminder>
            <TextReminder>
              <Switch
                onChange={() => {
                  setTextReminder((prev) => !prev);
                }}
              />
              <TextsmsIcon className="AfterIcon" />
              <ReminderNoticeTime>
                2 mins <After>after</After>
              </ReminderNoticeTime>
              <CheckRed> &nbsp; {textReminder ? '✓' : ' '} </CheckRed>
            </TextReminder>
            <CallReminder>
              <Switch
                onChange={() => {
                  setCallReminder((prev) => !prev);
                }}
              />
              <CallIcon className="AfterIcon" />
              <ReminderNoticeTime>
                5 mins <After>after</After>
              </ReminderNoticeTime>
              <CheckRed> &nbsp; {callReminder ? '✓' : ' '} </CheckRed>
            </CallReminder>
          </RemindersOptions>
        </InfoItem>
        <Gap height={15} />

        <SaveButton type="submit" variant="contained">
          Save Changes
        </SaveButton>
        <Gap height={15} />
      </Wrapper>
    </div>
  );
};

const CheckBlue = styled.div`
  color: ${cl.getHSL(cl.blue)};
`;

const CheckRed = styled.div`
  color: ${cl.getHSL(cl.red)};
`;

const SaveButton = styled(Button)`
  background-color: ${cl.getHSL(cl.blue)};

  width: 100%;

  &:hover {
    background-color: ${cl.getHSL(cl.blue)};
  }
`;

const RemindersOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 10px;
`;

const Gmail = styled.div`
  padding-left: 10px;
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

const EmailReminder = styled(Reminder)`
  position: relative;
  &:after {
    content: '';
    width: 0px;
    height: 60px;
    border-right: 2px dashed ${cl.getHSLA(cl.gray_mid, 0.5)};
    position: absolute;
    right: -4px;
    top: 50px;
  }
`;

const TextReminder = styled(Reminder)``;

const CallReminder = styled(Reminder)``;

const MyPhoneInput = styled(PhoneInputWithCountrySelect)`
  padding-left: 15px;
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
    margin-left: 5px;
    border-radius: 8px;
    background-color: ${cl.getHSLA(cl.blue, 0.1)};
  }

  .PhoneInputCountrySelect {
  }
  .PhoneInputCountrySelectArrow {
    width: 5px;
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
  cursor: auto;
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
const CopyButton = styled(Button)`
  cursor: pointer;
  position: absolute;

  right: 15px;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px 8px 8px 8px;
  margin-right: 10px;
  /* border: 2px solid ${cl.getHSL(cl.blue)}; */

  background-color: ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.blue)};

  @media (pointer: fine) and (hover: hover) {
    &:hover {
      background-color: ${cl.getHSLA(cl.blue, 0.1)};
      /* color: ${cl.getHSL(cl.white)}; */
    }
  }
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

const CopiedDisplay = styled.div`
  color: ${cl.getHSL(cl.red)};
  /* background-color: blue; */
  text-align: center;
  width: 300px;
`;

export default profile;
