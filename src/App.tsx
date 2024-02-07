import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRouter from '@/router/AppRouter';
import AppLayout from '@/components/layout/AppLayout';
import ruRU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

const client = new QueryClient();

function App() {
  return (
    <>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <QueryClientProvider client={client}>
            <MantineProvider>
              <AppLayout>
                <AppRouter />
              </AppLayout>
            </MantineProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
