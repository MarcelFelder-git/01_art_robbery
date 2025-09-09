const ImageGallery = ({
	shuffledImages,
	imageDimensions,
	handleImageLoad,
	handleGuess,
	getMaskStyle,
	handleMouseMove,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				gap: '2rem',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			{shuffledImages.map((img, index) => {
				const dimensions = imageDimensions[index] || {
					width: 400,
					height: 500,
				};
				return (
					<div
						key={index}
						onMouseMove={(e) => handleMouseMove(e, index)}
						onMouseLeave={() =>
							handleMouseMove(
								{
									currentTarget: {
										getBoundingClientRect: () => ({ left: 0, top: 0 }),
									},
								},
								null
							)
						}
						style={{
							position: 'relative',
							cursor: 'none',
							width: dimensions.width,
							height: dimensions.height,
							filter: img.filter,
							display: 'inline-block',
						}}
					>
						<button
							onClick={() => handleGuess(img.type)}
							style={{
								border: 'none',
								background: 'none',
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								padding: 0,
								cursor: 'none',
							}}
						>
							<img
								src={img.primaryImageSmall}
								alt={img.title}
								onLoad={(e) => handleImageLoad(index, e)}
								style={{
									display: 'block',
									width: '100%',
									height: '100%',
									objectFit: 'contain',
								}}
							/>
						</button>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0, 0, 0, 0.95)',
								filter: img.filter,
								pointerEvents: 'none',
								...getMaskStyle(index),
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ImageGallery;
