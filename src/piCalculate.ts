// https://pi-calculator.netlify.app/

export const piCalculate = (n: number) => {
	let i = 1n;
	let x = 3n * 10n ** BigInt(n + 20);
	let pi = x;
	while (x > 0) {
		x = (x * i) / ((i + 1n) * 4n);
		pi += x / (i + 2n);
		i += 2n;
	}
	return pi / 10n ** 20n;
};
