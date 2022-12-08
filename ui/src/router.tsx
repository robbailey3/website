import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@pages/error/ErrorPage';
import HomePage from '@pages/home/HomePage';
import Root from './Root';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />
			}
		]
	}
]);

export default router;
