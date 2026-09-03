import type {
  BaziCalculateRequest,
  BaziCalculateResponse,
  FourPillars,
  AdvancedPillars,
  HeavenlyStems,
  EarthlyBranches,
  FiveElements,
  HiddenStems,
  TenGods,
  NaYin,
  Zodiac,
  Constellation,
  SolarTerms,
  LuckPillars,
  Analysis,
  LifePredictions,
  CurrentAnnualLuck,
} from '@baziapi/sdk';

export type {
  BaziCalculateRequest,
  BaziCalculateResponse,
  FourPillars,
  AdvancedPillars,
  HeavenlyStems,
  EarthlyBranches,
  FiveElements,
  HiddenStems,
  TenGods,
  NaYin,
  Zodiac,
  Constellation,
  SolarTerms,
  LuckPillars,
  Analysis,
  LifePredictions,
  CurrentAnnualLuck,
};

export interface ApiResponse<T = BaziCalculateResponse> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}
