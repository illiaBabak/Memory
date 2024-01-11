import { createBrowserRouter } from 'react-router-dom';
import { ContainerCards } from 'src/components/ContainerCards';
import { StartPage } from 'src/components/StartPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/cards',
    element: <ContainerCards />,
  },
]);
