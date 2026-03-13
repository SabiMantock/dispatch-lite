import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import { DashboardLayout } from './layout/DashboardLayout'
import { routes } from './layout/routes'

function RoutedDashboardLayout() {
  const location = useLocation()

  const route =
    routes.find((routeItem) => routeItem.path === location.pathname) ??
    routes[0]

  return <DashboardLayout route={route} />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<RoutedDashboardLayout />}
          />
        ))}
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
