import AppLayout from '@/components/layout/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { useAppStore } from './store/appStore';
import PricesPage from './pages/PricesPage';
import CompetitorsPage from './pages/CompetitorsPage';
import PagesPage from './pages/PagesPage';
import { AppPages } from './types';
import { ModalsProvider } from '@mantine/modals';

const client = new QueryClient();

function App() {
  const activePage = useAppStore((state) => state.activePage);

  const getPage = () => {
    let page;
    switch (activePage) {
      case AppPages.Prices:
        page = <PricesPage />;
        break;
      case AppPages.Competitors:
        page = <CompetitorsPage />;
        break;
      case AppPages.Pages:
        page = <PagesPage />;
        break;
    }

    return page;
  };

  return (
    <>
      <QueryClientProvider client={client}>
        <MantineProvider>
          <ModalsProvider>
            <AppLayout>{getPage()}</AppLayout>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
