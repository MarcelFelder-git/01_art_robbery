const museums = [
	{
		name: 'Art Institute of Chicago',
		city: 'Chicago',
		image: '/chicago_art_institute.png',
		enabled: true,
		key: 'chicago',
	},
	{
		name: 'Metropolitan Museum of Art',
		city: 'New York',
		image: '/met_museum_nyc.png',
		enabled: false,
		key: 'met',
	},
	{
		name: 'Louvre',
		city: 'Paris',
		image: '/louvre_paris.png',
		enabled: false,
		key: 'louvre',
	},
	{
		name: 'Rijksmuseum',
		city: 'Amsterdam',
		image: '/rijksmuseum_amsterdam.png',
		enabled: false,
		key: 'rijks',
	},
	{
		name: 'British Museum',
		city: 'London',
		image: '/british_museum_london.png',
		enabled: false,
		key: 'british',
	},
];

const MuseumSelector = ({ onSelect }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h2 style={{ marginTop: '-20px' }}>Choose a Museum for the Heist:</h2>
			{museums.map((museum) => (
				<button
					className="museum-button"
					key={museum.key}
					onClick={() => museum.enabled && onSelect(museum.key)}
					disabled={!museum.enabled}
					style={{
						cursor: museum.enabled ? 'pointer' : 'not-allowed',
						filter: museum.enabled ? 'none' : 'grayscale(90%)',
					}}
				>
					<img
						src={museum.image}
						alt={museum.name}
						style={{
							width: '100%',
							height: 'auto',
							objectFit: 'cover',
							borderRadius: '20px',
						}}
					/>

					{!museum.enabled && (
						<img
							src="/coming_soon.png"
							alt="Coming soon"
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '80%',
								opacity: '100%',
								pointerEvents: 'none',
							}}
						/>
					)}

					<div
						style={{
							marginTop: '8px',
							fontWeight: 'bold',
							marginBottom: '8px',
						}}
					>
						{museum.name}
						<br />
						<span style={{ fontWeight: 'normal', fontSize: '14px' }}>
							{museum.city}
						</span>
					</div>
				</button>
			))}
		</div>
	);
};

export default MuseumSelector;
