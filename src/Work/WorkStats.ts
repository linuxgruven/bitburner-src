import { AugmentationNames } from "../Augmentation/data/AugmentationNames";
import { CONSTANTS } from "../Constants";
import { IPlayer } from "../PersonObjects/IPlayer";

export interface WorkStats {
  money: number;
  hackExp: number;
  strExp: number;
  defExp: number;
  dexExp: number;
  agiExp: number;
  chaExp: number;
  intExp: number;
}

interface newWorkStatsParams {
  money?: number;
  hackExp?: number;
  strExp?: number;
  defExp?: number;
  dexExp?: number;
  agiExp?: number;
  chaExp?: number;
  intExp?: number;
}

export const newWorkStats = (params?: newWorkStatsParams): WorkStats => {
  return {
    money: params?.money ?? 0,
    hackExp: params?.hackExp ?? 0,
    strExp: params?.strExp ?? 0,
    defExp: params?.defExp ?? 0,
    dexExp: params?.dexExp ?? 0,
    agiExp: params?.agiExp ?? 0,
    chaExp: params?.chaExp ?? 0,
    intExp: params?.intExp ?? 0,
  };
};

export const sumWorkStats = (w0: WorkStats, w1: WorkStats): WorkStats => {
  return {
    money: w0.money + w1.money,
    hackExp: w0.hackExp + w1.hackExp,
    strExp: w0.strExp + w1.strExp,
    defExp: w0.defExp + w1.defExp,
    dexExp: w0.dexExp + w1.dexExp,
    agiExp: w0.agiExp + w1.agiExp,
    chaExp: w0.chaExp + w1.chaExp,
    intExp: w0.intExp + w1.intExp,
  };
};

export const scaleWorkStats = (w: WorkStats, n: number): WorkStats => {
  return {
    money: w.money * n,
    hackExp: w.hackExp * n,
    strExp: w.strExp * n,
    defExp: w.defExp * n,
    dexExp: w.dexExp * n,
    agiExp: w.agiExp * n,
    chaExp: w.chaExp * n,
    intExp: w.intExp * n,
  };
};

export const applyWorkStats = (player: IPlayer, workStats: WorkStats, cycles: number, source: string): WorkStats => {
  let focusBonus = 1;
  if (!player.hasAugmentation(AugmentationNames.NeuroreceptorManager)) {
    focusBonus = player.focus ? 1 : CONSTANTS.BaseFocusBonus;
  }
  const gains = {
    money: workStats.money * cycles,
    hackExp: focusBonus * workStats.hackExp * cycles,
    strExp: focusBonus * workStats.strExp * cycles,
    defExp: focusBonus * workStats.defExp * cycles,
    dexExp: focusBonus * workStats.dexExp * cycles,
    agiExp: focusBonus * workStats.agiExp * cycles,
    chaExp: focusBonus * workStats.chaExp * cycles,
    intExp: focusBonus * workStats.intExp * cycles,
  };
  player.gainHackingExp(gains.hackExp);
  player.gainStrengthExp(gains.strExp);
  player.gainDefenseExp(gains.defExp);
  player.gainDexterityExp(gains.dexExp);
  player.gainAgilityExp(gains.agiExp);
  player.gainCharismaExp(gains.chaExp);
  player.gainIntelligenceExp(gains.intExp);
  player.gainMoney(gains.money, source);
  return gains;
};
