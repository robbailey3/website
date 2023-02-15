import { Link } from 'react-router-dom';
import { Experiment } from './Experiment';

export interface ExperimentItemProps {
	experiment: Experiment;
}

const ExperimentItem = (props: ExperimentItemProps) => {
	const { experiment } = props;

	return (
		<div className="border p-4 rounded mr-4">
			<h2>
				<Link to={experiment.link}>{experiment.title}</Link>
			</h2>
		</div>
	);
};

export default ExperimentItem;
