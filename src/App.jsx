import { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import MuseumSelector from './components/MuseumSelector.jsx';
import Game from './components/Game.jsx';
import BackgroundMusic from './components/BackgroundMusic';

export default function App() {
	const [screen, setScreen] = useState('start');
	const [museum, setMuseum] = useState('');
	const [difficulty, setDifficulty] = useState('easy');

	const handleNewGame = ({ difficulty }) => {
		setDifficulty(difficulty);
		setScreen('museum_selector');
	};

	const handleContinue = () => setScreen('museum_selector');

	const handleMuseumSelect = (museumName) => {
		setMuseum(museumName);
		setScreen('game_screen');
	};

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Art Robbery: The Heist</h1>

			{screen === 'start' && (
				<StartScreen onNewGame={handleNewGame} onContinue={handleContinue} />
			)}
			{screen === 'museum_selector' && (
				<MuseumSelector onSelect={handleMuseumSelect} />
			)}
			{screen === 'game_screen' && (
				<Game museum={museum} difficulty={difficulty} setScreen={setScreen} />
			)}

			<BackgroundMusic />
		</div>
	);
}
