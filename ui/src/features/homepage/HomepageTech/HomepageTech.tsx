import FadeInOnEnter from '@components/animations/FadeInOnEnter/FadeInOnEnter';
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
	}
];

const HomepageTech = () => {
	return (
		<Container className="py-32">
			<h2>Technologies</h2>
			<Flex className="space-x-4" wrap>
				{techItems.map((techItem, i) => (
					<FadeInOnEnter key={techItem.title} delay={0.25 * (i + 1)}>
						<FlexItem className="text-center">
							<span>{techItem.title}</span>
							<img
								src={techItem.image}
								alt={`${techItem.image} logo`}
								className="w-12 block mx-auto"
							/>
						</FlexItem>
					</FadeInOnEnter>
				))}
			</Flex>
		</Container>
	);
};

export default HomepageTech;
