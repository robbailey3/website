import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@pages/error/ErrorPage';
import HomePage from '@pages/home/HomePage';
import Root from './Root';
import ExperimentsPage from '@pages/experiments/ExperimentsPage';
import GitHubPage from '@pages/experiments/GitHub/GitHubPage';
import ImageAIPage from '@pages/experiments/ImageAI/ImageAIPage';

const router = createBrowserRouter([
	{
		path: '',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <HomePage />
			},
			{
				path: 'experiments',
				element: <ExperimentsPage />
			},
			{
				path: 'experiments/github',
				element: <GitHubPage />
			},
			{
				path: 'experiments/imageai',
				element: <ImageAIPage />
			}
		]
	}
]);

export default router;
