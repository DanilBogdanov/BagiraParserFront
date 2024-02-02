import { Navigate, Route, Routes } from 'react-router-dom';
import PricesPage from '@/pages/PricesPage';
import CompetitorsPage from '@/pages/CompetitorsPage';
import PagesPage from '@/pages/PagesPage';
import { AppRoutes } from './routes';
import NotFoundPage from '@/pages/NotFoundPage';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          path={AppRoutes.Main}
          element={<Navigate to={AppRoutes.Prices} />}
        />
        <Route path={AppRoutes.Prices} element={<PricesPage />} />
        <Route path={AppRoutes.Competitors} element={<CompetitorsPage />} />
        <Route path={AppRoutes.Pages} element={<PagesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
