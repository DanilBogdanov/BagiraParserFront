import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRouter from '@/router/AppRouter';
import AppLayout from '@/components/layout/AppLayout';
import ruRU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

function App() {
  return (
    <>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <QueryClientProvider client={client}>
            <AppLayout>
              <AppRouter />
            </AppLayout>
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
