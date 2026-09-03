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

export interface ApiResponseWrapper {
  success: boolean;
  data?: BaziCalculateResponse;
  error?: string;
  source?: 'live' | 'sample';
  note?: string;
}

export type FiveElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
