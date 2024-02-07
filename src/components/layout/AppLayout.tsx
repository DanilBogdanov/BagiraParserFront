import { Layout } from 'antd';
import AppHeader from './header/AppHeader';
import AppFooter from './footer/AppFooter';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader></AppHeader>
        {children}
        <AppFooter></AppFooter>
      </Layout>
    </>
  );
}
