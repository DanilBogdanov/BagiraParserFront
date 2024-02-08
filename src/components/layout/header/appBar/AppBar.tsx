import { Link } from 'react-router-dom';
import { AppRoutes } from '@/router/routes';
import { NavLink } from '@mantine/core';

export default function AppBar() {
  return (
    <>
      <NavLink active component={Link} to={AppRoutes.Prices} label='Prices' />
      <NavLink
        component={Link}
        to={AppRoutes.Competitors}
        label='Competitors'
      />
      <NavLink component={Link} to={AppRoutes.Pages} label='Pages' />
    </>
  );
}
