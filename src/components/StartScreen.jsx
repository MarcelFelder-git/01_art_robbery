import { useState } from 'react';

export default function StartScreen({ onContinue, onNewGame }) {
	const [difficulty, setDifficulty] = useState('easy');

	const handleStart = () => {
		onNewGame({ difficulty });
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				height: '55vh',
			}}
		>
			<div
				className="start-screen"
				style={{
					textAlign: 'center',
					padding: '20px',
					backgroundColor: 'var(--off-black)',
					borderRadius: '10px',
				}}
			>
				<p
					className="intro"
					style={{ color: '#fff', fontSize: '1.2rem', lineHeight: '1.6' }}
				>
					<strong>Welcome to Art Robbery: The Heist!</strong> <br />
					You are a <strong>master thief</strong>, targeting the world’s{' '}
					<strong>most famous paintings</strong>. <br />
					Your mission: sneak into museums, steal <strong>priceless art</strong>
					, and escape without getting caught. <br />
					But beware: for security reasons, each museum hides a{' '}
					<strong>fake version</strong> of the paintings alongside the real one.{' '}
					<br />
					Choose wisely, avoid the traps, and{' '}
					<strong>outsmart the security</strong>. <br />
					Are you ready to become the <strong>ultimate art thief</strong> and
					claim your fortune?
				</p>

				<div
					className="buttons"
					style={{
						marginTop: '50px',
						display: 'flex',
						gap: '30px',
						justifyContent: 'center',
					}}
				>
					<button onClick={handleStart}>Start New Game</button>
					{localStorage.getItem('gameData') && (
						<button onClick={onContinue} disabled>
							Continue Game
						</button>
					)}
				</div>

				<div
					className="options-box"
					style={{
						margin: '40px auto',
						display: 'flex',
						gap: '30px',
						fontSize: '1.5rem',
						justifyContent: 'center',
					}}
				>
					<label htmlFor="difficulty">Difficulty:</label>
					<select
						id="difficulty"
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
						style={{ backgroundColor: 'var(--gold)', color: 'white' }}
					>
						<option value="easy">Easy</option>
						<option value="normal">Normal</option>
						<option value="hard">Hard</option>
					</select>
				</div>
			</div>
		</div>
	);
}
