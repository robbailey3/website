const Header = () => {
	return (
		<header>
			<div>
				<a
					id="skip-link"
					href="#main"
					className="sr-only focus:not-sr-only focus:p-4 focus:bg-white focus:shadow focus:rounded"
				>
					Skip to content
				</a>
			</div>
		</header>
	);
};
