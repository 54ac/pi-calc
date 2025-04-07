import { useState, useRef, useEffect } from "react";

export const PiCalculator = () => {
	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(
		!window.Worker ? "Web Workers are not supported in this browser" : null
	);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState<number | null>(null);
	const workerRef = useRef<Worker | null>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === "") setInputValue(null);
		else setInputValue(parseInt(value));
	};

	const handleCalculate = () => {
		setLoading(true);
		setError(null);
		setResult(null);

		workerRef.current?.postMessage(inputValue);
		console.log("Sent message to worker: ", inputValue);
	};

	useEffect(() => {
		const worker = new Worker(new URL("./piWorker.ts", import.meta.url), {
			type: "module"
		});
		workerRef.current = worker;
		console.log("Created worker");

		worker.onmessage = (event) => {
			console.log("Received message from worker");
			const result = event.data;
			setResult(result);
			setLoading(false);
		};

		worker.onerror = (event) => {
			console.log("Received error from worker");
			setError(event.message);
			setLoading(false);
		};

		return () => worker.terminate();
	}, []);

	return (
		<div>
			<h1>Pi Calculator</h1>
			<input
				type="number"
				placeholder="Enter a number"
				onChange={handleInputChange}
			/>
			<button
				onClick={handleCalculate}
				disabled={
					!window.Worker ||
					!workerRef.current ||
					loading ||
					inputValue === null ||
					inputValue <= 0
				}
			>
				Calculate
			</button>

			{loading && <p>Calculating...</p>}

			{error && <p style={{ color: "red" }}>Error: {error}</p>}

			{result && <p style={{ overflowWrap: "break-word" }}>Result: {result}</p>}
		</div>
	);
};
