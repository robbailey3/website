import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

const HomepageBanner = () => {
	return (
		<Container>
			<Flex>
				<FlexItem className="my-4">
					<h1>Rob Bailey</h1>
					<h2>Software Engineer</h2>
				</FlexItem>
			</Flex>
		</Container>
	);
};

export default HomepageBanner;
