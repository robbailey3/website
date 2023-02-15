import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import { Experiment } from '@features/experiments/ExperimentItem/Experiment';
import ExperimentItem from '@features/experiments/ExperimentItem/ExperimentItem';

const ExperimentsPage = () => {
	const experiments: Experiment[] = [
		{ title: 'GitHub', description: '', link: 'github' },
		{ title: 'GitHub', description: '', link: 'github' },
		{ title: 'GitHub', description: '', link: 'github' },
		{ title: 'GitHub', description: '', link: 'github' },
		{ title: 'GitHub', description: '', link: 'github' },
		{ title: 'GitHub', description: '', link: 'github' }
	];

	return (
		<Container>
			<Flex wrap>
				{experiments.map((experiment, index) => (
					<FlexItem key={index} className="basis-1/3 my-8">
						<ExperimentItem experiment={experiment} />
					</FlexItem>
				))}
			</Flex>
		</Container>
	);
};

export default ExperimentsPage;
