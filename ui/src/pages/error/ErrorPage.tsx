import { useRouteError } from 'react-router-dom';
import Header from '../../components/global/Header/Header';
import Container from '../../components/layout/Container/Container';
import Flex from '../../components/layout/Flex/Flex';
import FlexItem from '../../components/layout/FlexItem/FlexItem';

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<>
			<Header />
			<div className="h-screen">
				<Container className="h-full">
					<Flex justify="center" align="center" className="h-full text-center">
						<FlexItem className="border border-primary p-12">
							<h1 className="text-8xl my-12">Oops! 🙈</h1>
							<p>Something went wrong.</p>
							<p className="opacity-70 italic my-8">
								{(error as any).statusText}
							</p>
						</FlexItem>
					</Flex>
				</Container>
			</div>
		</>
	);
};

export default ErrorPage;
