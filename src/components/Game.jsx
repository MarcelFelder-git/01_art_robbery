import { useEffect, useState } from 'react';
import { fetchHighlightPaintings } from '../api.js';
import Loader from './Loader.jsx';
import Feedback from './Feedback.jsx';
import StartButton from './StartButton.jsx';
import ImageGallery from './ImageGallery.jsx';
import Timer from './Timer.jsx';
import FlashlightUpgrade from './FlashlightUpgrade.jsx';
import BackToMainMenuButton from './BackToMainMenuButton.jsx';

const Game = ({ difficulty, setScreen }) => {
	const [paintings, setPaintings] = useState([]);
	const [shuffledImages, setShuffledImages] = useState([]);
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
		index: null,
	});
	const [imageDimensions, setImageDimensions] = useState([]);
	const [timer, setTimer] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [feedback, setFeedback] = useState('');
	const [gameActive, setGameActive] = useState(false);
	const [money, setMoney] = useState(0);
	const [flashlightSize, setFlashlightSize] = useState(100);
	const [flashlightLevel, setFlashlightLevel] = useState(1);

	const getUpgradeCost = () => flashlightLevel * 100;

	useEffect(() => {
		const loadPaintings = async () => {
			const data = await fetchHighlightPaintings(1000); // z.B. 50 Gemälde
			setPaintings(data);
		};
		loadPaintings();
	}, []);

	useEffect(() => {
		if (timerRunning) {
			const interval = setInterval(() => {
				setTimer((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						setFeedback('Security caught you! You lost all your money.');
						setTimerRunning(false);
						setGameActive(false);
						setMoney(0);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timerRunning]);

	useEffect(() => {
		if (feedback) {
			const timeout = setTimeout(() => {
				setFeedback('');
			}, 4000);
			return () => clearTimeout(timeout);
		}
	}, [feedback]);

	const getFiltersByDifficulty = () => {
		const filterOptions = {
			easy: [
				'hue-rotate(180deg)',
				'sepia(100%)',
				'grayscale(100%)',
				'blur(3px)',
				'saturate(20%)',
				'saturate(200%)',
			],
			normal: [
				'hue-rotate(90deg)',
				'sepia(80%)',
				'grayscale(80%)',
				'blur(2px)',
				'saturate(50%)',
				'saturate(150%)',
			],
			hard: [
				'hue-rotate(30deg)',
				'sepia(40%)',
				'grayscale(60%)',
				'blur(1px)',
				'saturate(80%)',
				'saturate(120%)',
			],
		};
		const filters = filterOptions[difficulty] || ['none'];
		const shuffled = [...filters].sort(() => Math.random() - 0.5);
		return [shuffled[0], shuffled[1]];
	};

	const getTimeByDifficulty = () => {
		switch (difficulty) {
			case 'easy':
				return 60;
			case 'normal':
				return 45;
			case 'hard':
				return 30;
			default:
				return 60;
		}
	};

	const startNewRound = () => {
		if (paintings.length === 0) return;
		const random = paintings[Math.floor(Math.random() * paintings.length)];
		const original = { ...random, type: 'original', filter: '' };
		const [filter1, filter2] = getFiltersByDifficulty();
		const fake1 = { ...random, type: 'fake', filter: filter1 };
		const fake2 = { ...random, type: 'fake', filter: filter2 };
		const shuffled = [original, fake1, fake2].sort(() => Math.random() - 0.5);
		setShuffledImages(shuffled);
		setImageDimensions([]);
		const newTime = getTimeByDifficulty();
		setTimer(newTime);
		setTimerRunning(true);
		setGameActive(true);
	};

	const handleImageLoad = (index, e) => {
		const { width, height } = e.target;
		setImageDimensions((prev) => {
			const newDimensions = [...prev];
			newDimensions[index] = { width, height };
			return newDimensions;
		});
	};

	const handleGuess = (type) => {
		if (!timerRunning) return;
		if (type === 'original') {
			const moneyEarned = Math.floor(Math.random() * 100) + 50;
			setMoney((prevMoney) => prevMoney + moneyEarned);
			setFeedback(`Correct! The painting was worth ${moneyEarned} Money.`);
		} else {
			setFeedback('You chose the wrong painting!');
		}
		setTimerRunning(false);
		setGameActive(false);
	};

	const handleMouseMove = (e, index) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setMousePosition({ x, y, index });
	};

	const getMaskStyle = (index) => {
		if (mousePosition.index !== index) {
			return { WebkitMaskImage: 'none', maskImage: 'none' };
		}
		const radius = flashlightSize;
		const mask = `radial-gradient(circle ${radius}px at ${mousePosition.x}px ${mousePosition.y}px, transparent 60%, black 100%)`;
		return {
			WebkitMaskImage: mask,
			maskImage: mask,
			WebkitMaskRepeat: 'no-repeat',
			maskRepeat: 'no-repeat',
		};
	};

	const handleUpgradeFlashlight = () => {
		const cost = getUpgradeCost();
		if (money >= cost) {
			setMoney((prev) => prev - cost);
			setFlashlightLevel((prev) => prev + 1);
			setFlashlightSize((prev) => prev + 20);
			setFeedback(`🔦 Flashlight upgraded to level ${flashlightLevel + 1}!`);
		} else {
			setFeedback('Not enough money for an upgrade!');
		}
	};

	const handleBackToMainMenu = () => {
		setScreen('start');
	};

	return (
		<div>
			<FlashlightUpgrade
				flashlightSize={flashlightSize}
				flashlightLevel={flashlightLevel}
				handleUpgradeFlashlight={handleUpgradeFlashlight}
				money={money}
				getUpgradeCost={getUpgradeCost}
			/>

			<Feedback message={feedback} />

			{paintings.length === 0 ? (
				<Loader />
			) : (
				<>
					{!gameActive && (
						<>
							<StartButton onClick={startNewRound} />
							<BackToMainMenuButton onClick={handleBackToMainMenu} />
						</>
					)}
					{gameActive && shuffledImages.length > 0 && (
						<div style={{ justifyContent: 'center', margin: '0 auto' }}>
							<Timer time={timer} />

							<ImageGallery
								shuffledImages={shuffledImages}
								imageDimensions={imageDimensions}
								handleImageLoad={handleImageLoad}
								handleGuess={handleGuess}
								getMaskStyle={getMaskStyle}
								handleMouseMove={handleMouseMove}
							/>
							<div
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									margin: '20px auto',
									width: '50%',
									borderRadius: '10px',
									backgroundColor: 'var(--gold)',
								}}
							>
								<p style={{ margin: '0 auto' }}>{shuffledImages[0].title}</p>
								{shuffledImages[0].artistDisplayName && (
									<p style={{ margin: '0 auto' }}>
										Artist: {shuffledImages[0].artistDisplayName}
									</p>
								)}
								{shuffledImages[0].objectDate && (
									<p style={{ margin: '0 auto' }}>
										Year: {shuffledImages[0].objectDate}
									</p>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Game;
