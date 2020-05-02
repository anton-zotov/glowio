import { randomConfigSchema, movementFeatureFlags } from './random-config-schema';
import { randomElement } from './utils';

export function getRandomizedConfig(config) {
	for (let [key, getValue] of Object.entries(randomConfigSchema)) {
		config[key] = getValue();
	}

	// enable at leave one movement feature
	if (!movementFeatureFlags.some(flag => config[flag])) {
		config[randomElement(movementFeatureFlags)] = true;
	}

	return config;
}