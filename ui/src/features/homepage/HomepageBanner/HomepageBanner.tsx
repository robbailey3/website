import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

const HomepageBanner = () => {
	return (
		<Container>
			<Flex>
				<FlexItem className="my-4">
					<h1 className="text-8xl">Rob Bailey</h1>
					<h2 className="text-4xl">Software Engineer</h2>
				</FlexItem>
			</Flex>
		</Container>
	);
};

export default HomepageBanner;
