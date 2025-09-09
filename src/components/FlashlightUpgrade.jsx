const FlashlightUpgrade = ({
	flashlightLevel,
	handleUpgradeFlashlight,
	money,
	getUpgradeCost,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '80%',
				marginLeft: '12%',
			}}
		>
			<p>💰 Money: {money}</p>
			<button onClick={handleUpgradeFlashlight} style={{ cursor: 'pointer' }}>
				🔧 Flashlight upgraden (Costs: {getUpgradeCost()}💰)
			</button>
			<p>🔦 Flashlight: Level {flashlightLevel}</p>
		</div>
	);
};

export default FlashlightUpgrade;
