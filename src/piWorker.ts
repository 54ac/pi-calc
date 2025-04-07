import { piCalculate } from "./piCalculate.ts";

self.onmessage = (event) => {
	console.log("Received message in worker: ", event.data);
	const n = event.data;

	const result = piCalculate(n).toString();

	console.log("Calculation complete");

	self.postMessage(result.slice(0, 1) + "." + result.slice(1));
	console.log("Sent result from worker");
};
