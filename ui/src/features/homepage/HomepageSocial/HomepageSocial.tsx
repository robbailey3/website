import IconLink from '@components/common/IconLink/IconLink';
import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';
import {
	faGithub,
	faLinkedin,
	faStackOverflow
} from '@fortawesome/free-brands-svg-icons';

const HomepageSocial = () => {
	return (
		<section>
			<Container className="py-32">
				<h2>Find Me On</h2>
				<Flex className="space-x-8">
					<FlexItem>
						<IconLink
							icon={faGithub}
							href="https://github.com/robbailey3"
							alt="GitHub"
						/>
					</FlexItem>
					<FlexItem>
						<IconLink
							icon={faLinkedin}
							href="https://www.linkedin.com/in/robbailey3/"
							alt="LinkedIn"
						/>
					</FlexItem>
					<FlexItem>
						<IconLink
							icon={faStackOverflow}
							href="https://stackoverflow.com/users/7959497/rob-bailey"
							alt="Stack Overflow"
						/>
					</FlexItem>
				</Flex>
			</Container>
		</section>
	);
};

export default HomepageSocial;
