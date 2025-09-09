// Komponente zum Anzeigen des Startbuttons
const StartButton = ({ onClick }) => {
	return (
		<div style={{ textAlign: 'center', marginTop: '3rem' }}>
			<button
				onClick={onClick}
				style={{
					padding: '1rem 2rem',
					fontSize: '2rem',
					cursor: 'pointer',
					borderRadius: '10px',
					border: '2px solid #fff',
				}}
			>
				Steal New Painting
			</button>
		</div>
	);
};

export default StartButton;
