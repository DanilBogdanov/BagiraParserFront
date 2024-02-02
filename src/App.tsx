import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRouter from '@/router/AppRouter';
import AppLayout from '@/components/layout/AppLayout';
import ruRU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
