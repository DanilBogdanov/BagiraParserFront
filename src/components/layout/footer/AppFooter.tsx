import { Footer } from 'antd/es/layout/layout';

export default function AppFooter() {
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>
        Parser ©{new Date().getFullYear()} Created by Danil
      </Footer>
    </>
  );
}
