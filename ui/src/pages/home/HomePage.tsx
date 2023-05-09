import HomepageProjects from '@features/homepage/HomepageExperiments/HomepageExperiments';
import HomepageBanner from '@features/homepage/HomepageBanner/HomepageBanner';
import HomepageTech from '@features/homepage/HomepageTech/HomepageTech';
import HomepageSocial from '@features/homepage/HomepageSocial/HomepageSocial';
import FileField from '@components/common/Form/FileField/FileField';

const HomePage = () => {
	const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		console.log({ evt });
	};
	return (
		<>
			<FileField accept="image/*" message="foo" onChange={onFileChange} />
			<HomepageBanner />
			<HomepageTech />
			<HomepageProjects />
			<HomepageSocial />
		</>
	);
};

export default HomePage;
