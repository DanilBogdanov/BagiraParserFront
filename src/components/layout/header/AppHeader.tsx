import { Header } from 'antd/es/layout/layout';
import AppLogo from './AppLogo';
import AppBar from './appBar/AppBar';

export default function AppHeader() {
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <AppLogo />
        <AppBar />
      </Header>
    </>
  );
}
