import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

interface TechItem {
	title: string;
	image: string;
}

const techItems: TechItem[] = [
	{
		title: 'React',
		image: '/tech-icons/react-original.svg'
	},
	{
		title: 'Go',
		image: '/tech-icons/go-original.svg'
	},
	{
		title: 'Typescript',
		image: '/tech-icons/typescript-original.svg'
	},
	{
		title: 'JavaScript',
		image: '/tech-icons/javascript-original.svg'
	},
	{
		title: 'Vue',
		image: '/tech-icons/vuejs-original.svg'
	},
	{
		title: 'Node',
		image: '/tech-icons/nodejs-original.svg'
	},
	{
		title: 'CSS',
		image: '/tech-icons/css3-plain.svg'
	},
	{
		title: 'C#',
		image: '/tech-icons/csharp-plain.svg'
	},
	{ title: 'Angular', image: '/tech-icons/angularjs-plain.svg' },
	{ title: 'MongoDB', image: '/tech-icons/mongodb-original.svg' }
];

const HomepageTech = () => {
	return (
		<Container className="py-32">
			<AnimateOnEnter
				initial={{ opacity: 0 }}
				animation={{ opacity: 1, transition: { duration: 1 } }}
			>
				<h2>Technologies</h2>
			</AnimateOnEnter>
			<Flex className="md:space-x-4 justify-center md:justify-start" wrap>
				{techItems.map((techItem, i) => (
					<AnimateOnEnter
						key={techItem.title}
						animation={{
							y: 0,
							opacity: 1,
							transition: {
								delay: 0.2 * (i + 1),
								duration: 0.2
							}
						}}
						initial={{ opacity: 0, y: -100 }}
						enterThreshold={1}
						className="basis-1/4 md:basis-auto"
					>
						<FlexItem className="text-center mb-4">
							<span className="opacity-50 mb-4 block">{techItem.title}</span>
							<img
								src={techItem.image}
								alt={`${techItem.image} logo`}
								className="w-12 block mx-auto"
							/>
						</FlexItem>
					</AnimateOnEnter>
				))}
			</Flex>
		</Container>
	);
};

export default HomepageTech;
