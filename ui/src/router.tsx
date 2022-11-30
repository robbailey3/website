import { createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/home/Homepage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />
	}
]);

router.subscribe((route) => {});

export default router;
