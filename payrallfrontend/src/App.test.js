import { render, screen } from '@testing-library/react';

// Keep this test focused on App route structure instead of page internals.
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => null,
}), { virtual: true });

jest.mock('./components/login/Login', () => () => null);
jest.mock('./components/forget-password/ForgetPassword', () => () => null);
jest.mock('./components/reset-password/ResetPassword.js', () => () => null);
jest.mock('./pages/Home.js', () => () => null);
jest.mock('./pages/Employees.js', () => () => null);
jest.mock('./pages/EmployeeCategories.js', () => () => null);
jest.mock('./pages/Departments.js', () => () => null);
jest.mock('./pages/JobRoles.js', () => () => null);
jest.mock('./layouts/AppLayout.js', () => () => null);
jest.mock('./layouts/AuthLayout.js', () => () => null);
jest.mock('./pages/OT.js', () => () => null);
jest.mock('./pages/GenerateSalary.js', () => () => null);
jest.mock('./pages/SalaryReports.js', () => () => null);
jest.mock('./pages/Loan.js', () => () => null);
jest.mock('./pages/Leaves.js', () => () => null);
jest.mock('./pages/LeavesNew.js', () => () => null);
jest.mock('./pages/SpecialHolidays.js', () => () => null);
jest.mock('./pages/OTusage.js', () => () => null);
jest.mock('./pages/Users.js', () => () => null);

import App from './App';

test('renders app route tree', () => {
  render(<App />);
  expect(screen.getByTestId('routes')).toBeInTheDocument();
});
