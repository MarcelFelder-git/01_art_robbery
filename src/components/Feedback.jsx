const Feedback = ({ message }) => {
	return (
		message && (
			<div
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					background: 'rgba(0,0,0,1)',
					color: 'var(--gold)',
					border: '2px solid var(--gold)',
					boxShadow: '15px 15px 15px var(--gold)',
					padding: '4rem 4rem',
					borderRadius: '10px',
					fontSize: '2.5rem',
					zIndex: 1000,
				}}
			>
				{message}
			</div>
		)
	);
};

export default Feedback;
