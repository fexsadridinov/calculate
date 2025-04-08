import ReactDOM from 'react-dom/client';
import App from './App';
import PercentagePage from './pages/PercentagePage';
import APRPage from './pages/APRPage';
import InterestRatesPage from './pages/InterestPage';
import PropertyTaxPage from './pages/PropertyTaxPage';
import MortgagePage from './pages/MortgagePage';
import Error from './pages/Error';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <PercentagePage />
            },
            {
                path: '/apr',
                element: <APRPage />
            },
            {
                path: '/interest-rates',
                element: <InterestRatesPage />
            },
            {
                path: '/property-taxes',
                element:  <PropertyTaxPage />
            },
            {
                path: '/mortgages',
                element:  <MortgagePage />
            }
        ]
    },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}