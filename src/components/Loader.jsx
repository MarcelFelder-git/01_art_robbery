import { useState, useEffect } from 'react';

const Loader = () => {
	const [loadingMessage, setLoadingMessage] = useState(
		'Getting ready for the heist...'
	);
	const spinnerStyle = {
		width: '40px',
		height: '40px',
		border: '4px solid var(--off-white)',
		borderTop: '4px solid var(--gold)',
		borderRadius: '50%',
		animation: 'spin 1s linear infinite',
	};

	const containerStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1rem',
		padding: '2rem',
	};

	useEffect(() => {
		const timer1 = setTimeout(() => {
			setLoadingMessage('Driving to the museum...');
		}, 6000);

		const timer2 = setTimeout(() => {
			setLoadingMessage('Sneaking into the museum hall...');
		}, 12000);

		const timer3 = setTimeout(() => {
			setLoadingMessage('Spotting the target...');
		}, 18000);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
		};
	}, []);

	return (
		<div style={containerStyle}>
			<div style={spinnerStyle} />
			<style>
				{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
			</style>
			<p>{loadingMessage}</p>
		</div>
	);
};

export default Loader;
