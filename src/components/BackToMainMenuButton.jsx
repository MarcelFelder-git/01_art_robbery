const BackToMainMenuButton = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ margin: '40px auto', display: 'block' }}
			className="back-to-main-menu-button"
		>
			Back to Main Menu
		</button>
	);
};

export default BackToMainMenuButton;
