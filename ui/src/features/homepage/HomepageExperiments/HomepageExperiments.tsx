import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import ExperimentItem from '@features/experiments/ExperimentItem/ExperimentItem';
import { experiments } from '@features/experiments/experiments';

const HomepageProjects = () => {
	return (
		<Container className="bg-primary py-16">
			<h2>Experiments</h2>
			<Flex>
				{experiments.slice(-3).map((experiment, index) => (
					<FlexItem key={index} className="basis-1/3 my-8">
						<AnimateOnEnter
							initial={{ opacity: 0 }}
							animation={{
								opacity: 1,
								transition: { delay: 0.1 * (index + 1) }
							}}
							enterThreshold={1}
						>
							<ExperimentItem experiment={experiment} />
						</AnimateOnEnter>
					</FlexItem>
				))}
			</Flex>
		</Container>
	);
};

export default HomepageProjects;
