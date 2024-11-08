const final_tps = [0.03, 0.1, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;

interface ITpsFeeParams {
	base_tps_fee?: number;
	tps_interval?: number;
	tps_fee_multiplier?: number;
}

interface IGenerateTpsFeeDataByParams {
	currentParams: ITpsFeeParams;
	newParams?: ITpsFeeParams;
}

interface ITpsFeeDataResult {
	fee: number;
	newFee?: number;
	tps: number;
}

export const generateTpsFeeDataByParams = ({ currentParams, newParams }: IGenerateTpsFeeDataByParams = { currentParams: {}, newParams: {} }): ITpsFeeDataResult[] => {
	const { base_tps_fee: current_base_tps_fee = 10, tps_interval: current_tps_interval = 1, tps_fee_multiplier: current_tps_fee_multiplier = 1 } = currentParams ?? {};
	const { base_tps_fee: new_base_tps_fee = 10, tps_interval: new_tps_interval = 1, tps_fee_multiplier: new_tps_fee_multiplier = 1 } = newParams ?? {};

	return final_tps.map((tps: number) => ({
		tps,
		fee: Math.ceil(current_tps_fee_multiplier * current_base_tps_fee * (Math.exp(tps / current_tps_interval) - 1)),
		newFee: Math.ceil(new_tps_interval ? new_tps_fee_multiplier * new_base_tps_fee * (Math.exp(tps / new_tps_interval) - 1) : 0)
	})) satisfies ITpsFeeDataResult[];
}
