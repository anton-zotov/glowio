import { randomColor, randomElement } from './utils';

const bool = (probability = 0.5) => () => Math.random() > 1 - probability;
const number = (min, max) => () => min + Math.floor(Math.random() * (max - min));
const color = () => randomColor;
const array = (...values) => () => randomElement(values);
const probability = (config) => () => {
	let totalProbability = Object.keys(config).reduce((acc, p) => acc + (+p), 0);
	let p = Math.random() * totalProbability;

	for (let [fnProbability, fn] of Object.entries(config)) {
		if (p < fnProbability) return fn();
		p -= fnProbability;
	}	
};

export const randomConfigSchema = {
	particleSize: probability({
		3: number(1, 30),
		1: number(31, 50)
	}),
	particlePer100Pixels: number(40, 150),
	color: color(),
	colorVariation: probability({
		5: number(0, 50),
		1: number(50, 100)
	}),
	opacityMin: number(1, 100),
	opacityMax: number(1, 100),

	horzSineEnabled: bool(0.25),
	horzSineAmplitude: number(1, 100),
	horzSinePeriod: number(1, 200),
	horzSineRandomizeAmplitude: bool(0.25),
	horzSineModulo: bool(0.25),
	horzSineDelay: array('', 'offsetX', 'offsetY'),

	vertSineEnabled: bool(0.25),
	vertSineAmplitude: number(1, 100),
	vertSinePeriod: number(1, 200),
	vertSineRandomizeAmplitude: bool(0.25),
	vertSineModulo: bool(0.25),
	vertSineDelay: array('', 'offsetX', 'offsetY'),

	horzTanEnabled: bool(0.25),
	horzTanAmplitude: number(1, 100),
	horzTanPeriod: number(1, 200),
	horzTanRandomizeAmplitude: bool(0.25),
	horzTanModulo: bool(0.25),
	horzTanDelay: array('', 'offsetX', 'offsetY'),

	vertTanEnabled: bool(0.25),
	vertTanAmplitude: number(1, 100),
	vertTanPeriod: number(1, 200),
	vertTanRandomizeAmplitude: bool(0.25),
	vertTanModulo: bool(0.25),
	vertTanDelay: array('', 'offsetX', 'offsetY'),

};

export const movementFeatureFlags = [
	'horzSineEnabled',
	'vertSineEnabled',
	'horzTanEnabled',
	'vertTanEnabled',
];

// export const arandomConfigSchema = {
// 	particleSize: 5,
// 	particlePer100Pixels: number(40, 150),
// 	color: color(),
// 	colorVariation: 5,
// 	opacityMin: 1,
// 	opacityMax: 50,

// 	horzSineEnabled: false,
// 	horzSineAmplitude: 10,
// 	horzSinePeriod: 100,
// 	horzSineRandomizeAmplitude: false,
// 	horzSineModulo: false,
// 	horzSineDelay: "offsetY",

// 	vertSineEnabled: false,
// 	vertSineAmplitude: 10,
// 	vertSinePeriod: 100,
// 	vertSineRandomizeAmplitude: false,
// 	vertSineModulo: false,
// 	vertSineDelay: "offsetX",

// 	horzTanEnabled: false,
// 	horzTanAmplitude: 10,
// 	horzTanPeriod: 100,
// 	horzTanRandomizeAmplitude: false,
// 	horzTanModulo: false,
// 	horzTanDelay: "offsetY",

// 	vertTanEnabled: false,
// 	vertTanAmplitude: 10,
// 	vertTanPeriod: 100,
// 	vertTanRandomizeAmplitude: false,
// 	vertTanModulo: false,
// 	vertTanDelay: "offsetX",
// };
