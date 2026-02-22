import Tabs from '../../../components/Tabs';

export default function CredentialsLayout() {
  return (
    <Tabs
      initialRouteName="rfid"
      tabs={[
        { name: 'rfid', title: 'RFID', icon: 'contactless-payment', route: '/credentials/rfid' },
        { name: 'nfc', title: 'NFC', icon: 'nfc-variant', route: '/credentials/nfc' },
      ]}
    />
  );
}
