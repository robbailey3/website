import HomepageProjects from '@features/homepage/HomepageExperiments/HomepageExperiments';
import HomepageBanner from '@features/homepage/HomepageBanner/HomepageBanner';
import HomepageTech from '@features/homepage/HomepageTech/HomepageTech';
import HomepageSocial from '@features/homepage/HomepageSocial/HomepageSocial';

const HomePage = () => {
	return (
		<>
			<HomepageBanner />
			<HomepageTech />
			<HomepageProjects />
			<HomepageSocial />
		</>
	);
};

export default HomePage;
