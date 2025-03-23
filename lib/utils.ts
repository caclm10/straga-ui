function getEnsured<T = any>(fn: () => T, message?: string) {
	const value = fn();
	if (!value) {
		throw new Error(message || "Invalid value.");
	}

	return value;
}

function nextTick() {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(resolve);
		});
	});
}

function afterTransition(elements: HTMLElement[]) {
	const combinedAnimations: Promise<Animation>[] = [];

	elements.forEach((element) => {
		const animations = element.getAnimations();

		if (animations.length > 0) {
			combinedAnimations.push(
				...animations.map((animation) => animation.finished),
			);
		}
	});

	return Promise.all(combinedAnimations);
}

export { afterTransition, getEnsured, nextTick };
