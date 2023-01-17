import AnimateOnEnter from '@components/animations/AnimateOnEnter/AnimateOnEnter';
import Container from '@components/layout/Container/Container';
import Flex from '@components/layout/Flex/Flex';
import FlexItem from '@components/layout/FlexItem/FlexItem';

const HomepageBanner = () => {
	return (
		<Container style={{ height: 'calc(100vh - 4.5rem)' }}>
			<Flex justify="center" align="center" className="h-full" wrap>
				<FlexItem className="my-4 md:basis-2/3 basis-full">
					<AnimateOnEnter
						initial={{ x: -100, opacity: 0 }}
						animation={{
							x: 0,
							opacity: 1,
							transition: {
								duration: 0.25
							}
						}}
					>
						<h1 className="text-8xl">Rob Bailey</h1>
					</AnimateOnEnter>
					<AnimateOnEnter
						initial={{ x: -100, opacity: 0 }}
						animation={{
							x: 0,
							opacity: 1,
							transition: {
								delay: 0.25,
								duration: 0.25
							}
						}}
					>
						<h2 className="text-light text-opacity-75">Software Engineer</h2>
					</AnimateOnEnter>
				</FlexItem>
				<FlexItem className="my-4 md:basis-1/3 basis-full">
					<AnimateOnEnter
						initial={{ y: 100, opacity: 0 }}
						animation={{
							y: 0,
							opacity: 1,
							transition: {
								delay: 0.5,
								duration: 0.25
							}
						}}
					>
						<p>
							I&apos;m a self-taught developer with a passion for learning new
							technologies and solving problems.
						</p>
						<p>
							I&apos;m a big fan of the environment, beer and making cool things
							with code.
						</p>
						<div className="my-2">
							<p>
								<span
									role="img"
									aria-label="Briefcase"
									className="text-xl mr-2"
								>
									💼
								</span>
								<span className="font-bold">Currently working at: </span>
								<a
									target="_blank"
									href="https://www.netcall.com/"
									rel="noopener noreferrer"
								>
									Netcall
								</a>
							</p>
							<p>
								<span role="img" aria-label="Learning" className="text-xl mr-2">
									🎓
								</span>
								<span className="font-bold">Currently learning: </span>
								<span className="font-bold">Go</span>
							</p>
						</div>
					</AnimateOnEnter>
				</FlexItem>
			</Flex>
		</Container>
	);
};

export default HomepageBanner;
