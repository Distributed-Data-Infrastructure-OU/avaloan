import constants from "@/constants";
const ethers = require('ethers');

export function calculateCollateral(amount) {
    if (amount) {
        return constants.DEFAULT_COLLATERAL_RATIO * amount - amount;
    }
}

export const fromWei = val => parseFloat(ethers.utils.formatEther(val));
export const toWei = ethers.utils.parseEther;
