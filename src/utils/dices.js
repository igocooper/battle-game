import { commonConstants } from '../constants/common';

export function angleGenerator () {
    let factor = Math.floor(1 + Math.random() * 6);
    let { x, y, z } = commonConstants.DICES_ANGLES[factor];
    return {
        x: x + 3600,
        y: y + 3600,
        z: z + 3600,
        result: factor
    };
};