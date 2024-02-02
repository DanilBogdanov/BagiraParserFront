import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          path={AppRoutes.Main}
          element={<Navigate to={AppRoutes.Prices} />}
        />
        <Route path={AppRoutes.Prices} element={<div>Prices Page</div>} />
        <Route path={AppRoutes.Competitors} element={<div>Competitors</div>} />
        <Route path={AppRoutes.Pages} element={<div>Pages</div>} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}
