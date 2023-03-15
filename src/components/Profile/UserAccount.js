import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
// hooks

// _mock_
// components
import { useState } from 'react';
import Iconify from '../../sharedComponents/iconify/Iconify';
import AccountGeneral from '../../sharedComponents/profileCard/AccountGeneral';
import AccountChangePassword from '../../sharedComponents/profileCard/AccountChangePassword';
import HeaderBreadcrumbs from '../../sharedComponents/upload/HeaderBreadcrumbs';

// sections

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'profilling',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <> </>,
    },
    {
      value: 'change_password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Container maxWidth={'lg'}>
      <HeaderBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard' /* , href: PATH_DASHBOARD.root */ },
          { name: 'User' /* , href: PATH_DASHBOARD.user.root */ },
          { name: 'Account Settings' },
        ]}
      />

      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={(event, newValue) => {
          console.log(newValue);
          setCurrentTab(newValue);
        }}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}
