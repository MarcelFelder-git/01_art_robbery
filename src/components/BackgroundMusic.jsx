import { useState, useRef } from 'react';

const BackgroundMusic = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.3);
	const audioRef = useRef(null);

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (event) => {
		const newVolume = event.target.value;
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	return (
		<div style={{ margin: '2rem' }}>
			{/* eslint-disable jsx-a11y/media-has-caption */}
			<audio ref={audioRef} src="/background_music.mp3" loop />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '2rem',
				}}
			>
				<button onClick={toggleMusic}>
					{isPlaying ? 'Music Off' : 'Music On'}
				</button>

				<div>
					<label>
						Volume:
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={handleVolumeChange}
							className="volume-slider"
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default BackgroundMusic;
