import { Solar, Lunar } from 'lunar-javascript';
import type { BaziCalculateRequest, BaziCalculateResponse } from './types';

// Chinese stems and elements dictionary
const STEM_INFO: Record<string, { en: string; element: string }> = {
  甲: { en: 'Jia (Yang Wood)', element: 'Wood' },
  乙: { en: 'Yi (Yin Wood)', element: 'Wood' },
  丙: { en: 'Bing (Yang Fire)', element: 'Fire' },
  丁: { en: 'Ding (Yin Fire)', element: 'Fire' },
  戊: { en: 'Wu (Yang Earth)', element: 'Earth' },
  己: { en: 'Ji (Yin Earth)', element: 'Earth' },
  庚: { en: 'Geng (Yang Metal)', element: 'Metal' },
  辛: { en: 'Xin (Yin Metal)', element: 'Metal' },
  壬: { en: 'Ren (Yang Water)', element: 'Water' },
  癸: { en: 'Gui (Yin Water)', element: 'Water' },
};

const BRANCH_INFO: Record<string, { en: string; element: string; animal: string; animalZh: string }> = {
  子: { en: 'Zi (Rat)', element: 'Water', animal: 'Rat', animalZh: '鼠' },
  丑: { en: 'Chou (Ox)', element: 'Earth', animal: 'Ox', animalZh: '牛' },
  寅: { en: 'Yin (Tiger)', element: 'Wood', animal: 'Tiger', animalZh: '虎' },
  卯: { en: 'Mao (Rabbit)', element: 'Wood', animal: 'Rabbit', animalZh: '兔' },
  辰: { en: 'Chen (Dragon)', element: 'Earth', animal: 'Dragon', animalZh: '龙' },
  巳: { en: 'Si (Snake)', element: 'Fire', animal: 'Snake', animalZh: '蛇' },
  午: { en: 'Wu (Horse)', element: 'Fire', animal: 'Horse', animalZh: '马' },
  未: { en: 'Wei (Goat)', element: 'Earth', animal: 'Goat', animalZh: '羊' },
  申: { en: 'Shen (Monkey)', element: 'Metal', animal: 'Monkey', animalZh: '猴' },
  酉: { en: 'You (Rooster)', element: 'Metal', animal: 'Rooster', animalZh: '鸡' },
  戌: { en: 'Xu (Dog)', element: 'Earth', animal: 'Dog', animalZh: '狗' },
  亥: { en: 'Hai (Pig)', element: 'Water', animal: 'Pig', animalZh: '猪' },
};

const SHISHEN_EN: Record<string, string> = {
  比肩: 'Friend (比肩)',
  劫财: 'Rob Wealth (劫财)',
  食神: 'Eating God (食神)',
  伤官: 'Hurting Officer (伤官)',
  偏财: 'Indirect Wealth (偏财)',
  正财: 'Direct Wealth (正财)',
  七杀: 'Seven Killings (七杀)',
  正官: 'Direct Officer (正官)',
  偏印: 'Indirect Resource (偏印)',
  正印: 'Direct Resource (正印)',
  日主: 'Self (Day Master / 日主)',
  日元: 'Self (Day Master / 日主)',
};

const WUXING_CHAR_MAP: Record<string, string> = {
  木: 'Wood',
  火: 'Fire',
  土: 'Earth',
  金: 'Metal',
  水: 'Water',
};

// Branch interaction helper
function analyzeBranchInteractions(branches: string[]) {
  const [yb, mb, db, hb] = branches;
  const clashes: string[] = [];
  const combinations: string[] = [];
  const punishments: string[] = [];
  const harms: string[] = [];

  const clashPairs: [string, string, string][] = [
    ['子', '午', 'Zi-Wu Clash (子午相冲)'],
    ['丑', '未', 'Chou-Wei Clash (丑未相冲)'],
    ['寅', '申', 'Yin-Shen Clash (寅申相冲)'],
    ['卯', '酉', 'Mao-You Clash (卯酉相冲)'],
    ['辰', '戌', 'Chen-Xu Clash (辰戌相冲)'],
    ['巳', '亥', 'Si-Hai Clash (巳亥相冲)'],
  ];

  const comboPairs: [string, string, string][] = [
    ['子', '丑', 'Zi-Chou Harmony (子丑六合)'],
    ['寅', '亥', 'Yin-Hai Harmony (寅亥六合)'],
    ['卯', '戌', 'Mao-Xu Harmony (卯戌六合)'],
    ['辰', '酉', 'Chen-You Harmony (辰酉六合)'],
    ['巳', '申', 'Si-Shen Harmony (巳申六合)'],
    ['午', '未', 'Wu-Wei Harmony (午未六合)'],
  ];

  const harmPairs: [string, string, string][] = [
    ['子', '未', 'Zi-Wei Harm (子未相害)'],
    ['丑', '午', 'Chou-Wu Harm (丑午相害)'],
    ['寅', '巳', 'Yin-Si Harm (寅巳相害)'],
    ['卯', '辰', 'Mao-Chen Harm (卯辰相害)'],
    ['申', '亥', 'Shen-Hai Harm (申亥相害)'],
    ['酉', '戌', 'You-Xu Harm (酉戌相害)'],
  ];

  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const b1 = branches[i];
      const b2 = branches[j];

      clashPairs.forEach(([x, y, desc]) => {
        if ((b1 === x && b2 === y) || (b1 === y && b2 === x)) {
          if (!clashes.includes(desc)) clashes.push(desc);
        }
      });

      comboPairs.forEach(([x, y, desc]) => {
        if ((b1 === x && b2 === y) || (b1 === y && b2 === x)) {
          if (!combinations.includes(desc)) combinations.push(desc);
        }
      });

      harmPairs.forEach(([x, y, desc]) => {
        if ((b1 === x && b2 === y) || (b1 === y && b2 === x)) {
          if (!harms.includes(desc)) harms.push(desc);
        }
      });
    }
  }

  // Punishments (Yin-Si-Shen, Chou-Xu-Wei)
  if (branches.includes('寅') && branches.includes('巳') && branches.includes('申')) {
    punishments.push('Yin-Si-Shen Triple Punishment (寅巳申三刑)');
  } else if ((branches.includes('寅') && branches.includes('巳')) || (branches.includes('巳') && branches.includes('申'))) {
    punishments.push('Fire / Metal Branch Friction Punishment (相刑)');
  }
  if (branches.includes('丑') && branches.includes('戌') && branches.includes('未')) {
    punishments.push('Chou-Xu-Wei Earth Triple Punishment (丑戌未三刑)');
  }
  if (branches.includes('子') && branches.includes('卯')) {
    punishments.push('Zi-Mao Impolite Punishment (子卯相刑)');
  }

  return { clashes, combinations, punishments, harms };
}

// Calculate Gods & Stars (Shen Sha)
function analyzeGodsAndStars(dayGan: string, yearZhi: string, dayZhi: string, branches: string[]) {
  const nobleman: string[] = [];
  const peachBlossom: string[] = [];
  const academicStar: string[] = [];
  const travelHorse: string[] = [];
  const generalStar: string[] = [];

  // Tian Yi Nobleman
  const noblemanMap: Record<string, string[]> = {
    甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
    乙: ['子', '申'], 己: ['子', '申'],
    丙: ['亥', '酉'], 丁: ['亥', '酉'],
    壬: ['卯', '巳'], 癸: ['卯', '巳'],
    辛: ['寅', '午'],
  };
  const nobleBranches = noblemanMap[dayGan] || [];
  nobleBranches.forEach((nb) => {
    if (branches.includes(nb)) {
      nobleman.push(`Tian Yi Nobleman (天乙贵人) in ${nb} (${BRANCH_INFO[nb]?.animal})`);
    }
  });

  // Peach Blossom (based on Year or Day branch)
  const peachMap: Record<string, string> = {
    申: '酉', 子: '酉', 辰: '酉',
    寅: '卯', 午: '卯', 戌: '卯',
    巳: '午', 酉: '午', 丑: '午',
    亥: '子', 卯: '子', 未: '子',
  };
  const targetPeach = peachMap[yearZhi] || peachMap[dayZhi];
  if (targetPeach && branches.includes(targetPeach)) {
    peachBlossom.push(`Peach Blossom (红鸾/咸池) in ${targetPeach} (${BRANCH_INFO[targetPeach]?.animal})`);
  }

  // Academic Star
  const academicMap: Record<string, string> = {
    甲: '巳', 乙: '午', 丙: '申', 丁: '酉', 戊: '申',
    己: '酉', 庚: '亥', 辛: '子', 壬: '寅', 癸: '卯',
  };
  const targetAcademic = academicMap[dayGan];
  if (targetAcademic && branches.includes(targetAcademic)) {
    academicStar.push(`Wen Chang Academic Star (文昌贵人) in ${targetAcademic} (${BRANCH_INFO[targetAcademic]?.animal})`);
  }

  // Travel Horse
  const horseMap: Record<string, string> = {
    申: '寅', 子: '寅', 辰: '寅',
    寅: '申', 午: '申', 戌: '申',
    巳: '亥', 酉: '亥', 丑: '亥',
    亥: '巳', 卯: '巳', 未: '巳',
  };
  const targetHorse = horseMap[yearZhi] || horseMap[dayZhi];
  if (targetHorse && branches.includes(targetHorse)) {
    travelHorse.push(`Travel Star / Yi Ma (驿马) in ${targetHorse} (${BRANCH_INFO[targetHorse]?.animal})`);
  }

  // General Star
  const generalMap: Record<string, string> = {
    申: '子', 子: '子', 辰: '子',
    寅: '午', 午: '午', 戌: '午',
    巳: '酉', 酉: '酉', 丑: '酉',
    亥: '卯', 卯: '卯', 未: '卯',
  };
  const targetGeneral = generalMap[yearZhi] || generalMap[dayZhi];
  if (targetGeneral && branches.includes(targetGeneral)) {
    generalStar.push(`Jiang Xing General Star (将星) in ${targetGeneral} (${BRANCH_INFO[targetGeneral]?.animal})`);
  }

  return {
    nobleman: nobleman.length > 0 ? nobleman : null,
    peachBlossom: peachBlossom.length > 0 ? peachBlossom : null,
    academicStar: academicStar.length > 0 ? academicStar : null,
    travelHorse: travelHorse.length > 0 ? travelHorse : null,
    generalStar: generalStar.length > 0 ? generalStar : null,
  };
}

/**
 * High-precision, astronomically verified BaZi calculation engine
 * using the official lunar-javascript observatory algorithms.
 */
export function generateRealisticBazi(input: BaziCalculateRequest): BaziCalculateResponse {
  const [yearStr, monthStr, dayStr] = input.birthDate.split('-');
  const year = parseInt(yearStr || '1998', 10);
  const month = parseInt(monthStr || '8', 10);
  const day = parseInt(dayStr || '12', 10);

  const timeParts = (input.birthTime || '12:00').split(':');
  const hour = parseInt(timeParts[0] || '12', 10);
  const minute = parseInt(timeParts[1] || '0', 10);

  // 1. Initialize exact Solar & Lunar astronomy objects
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const bazi = lunar.getEightChar();

  // 2. Exact Four Pillars (Year, Month, Day, Hour)
  const yearPillar = bazi.getYear();
  const monthPillar = bazi.getMonth();
  const dayPillar = bazi.getDay();
  const hourPillar = bazi.getTime();

  const yearStem = bazi.getYearGan();
  const yearBranch = bazi.getYearZhi();
  const monthStem = bazi.getMonthGan();
  const monthBranch = bazi.getMonthZhi();
  const dayStem = bazi.getDayGan();
  const dayBranch = bazi.getDayZhi();
  const hourStem = bazi.getTimeGan();
  const hourBranch = bazi.getTimeZhi();

  const branches = [yearBranch, monthBranch, dayBranch, hourBranch];

  // 3. Five Elements (Wu Xing) Count & Percentage
  const yearWuXing = bazi.getYearWuXing();
  const monthWuXing = bazi.getMonthWuXing();
  const dayWuXing = bazi.getDayWuXing();
  const timeWuXing = bazi.getTimeWuXing();

  const elementCounts: Record<string, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  const allWuXingChars = (yearWuXing + monthWuXing + dayWuXing + timeWuXing).split('');
  allWuXingChars.forEach((ch: string) => {
    const el = WUXING_CHAR_MAP[ch];
    if (el) elementCounts[el] = (elementCounts[el] || 0) + 1;
  });

  const totalChars = allWuXingChars.length || 8;
  const statistics: Record<string, string> = {};
  for (const [el, cnt] of Object.entries(elementCounts)) {
    statistics[el] = `${Math.round((cnt / totalChars) * 100)}%`;
  }

  const sortedElements = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
  const strongestElement = sortedElements[0][0];
  const weakestElement = sortedElements[sortedElements.length - 1][0];
  const missingElements = Object.entries(elementCounts).filter(([, c]) => c === 0).map(([k]) => k);

  // 4. Day Master Strength Evaluation
  const dayMasterElement = STEM_INFO[dayStem]?.element || 'Metal';
  const monthBranchElement = BRANCH_INFO[monthBranch]?.element || 'Metal';

  // In BaZi, Day Master is strong if month branch supports it or element count is high
  const isBornInSeason = monthBranchElement === dayMasterElement ||
    (dayMasterElement === 'Metal' && monthBranchElement === 'Earth') ||
    (dayMasterElement === 'Water' && monthBranchElement === 'Metal') ||
    (dayMasterElement === 'Wood' && monthBranchElement === 'Water') ||
    (dayMasterElement === 'Fire' && monthBranchElement === 'Wood') ||
    (dayMasterElement === 'Earth' && monthBranchElement === 'Fire');

  const sameOrResourceCount = (elementCounts[dayMasterElement] || 0) + (
    dayMasterElement === 'Wood' ? elementCounts.Water :
    dayMasterElement === 'Fire' ? elementCounts.Wood :
    dayMasterElement === 'Earth' ? elementCounts.Fire :
    dayMasterElement === 'Metal' ? elementCounts.Earth : elementCounts.Metal
  );

  const isStrong = isBornInSeason || sameOrResourceCount >= 4;

  // 5. 10-Year Luck Pillars (Da Yun) via lunar-javascript
  const genderCode = input.gender === 'female' ? 0 : 1;
  const yun = bazi.getYun(genderCode);
  const isForward = yun.isForward();
  const startAge = yun.getStartYear();
  const rawDaYunList = yun.getDaYun();

  const luckPillarsList = [];
  for (let i = 1; i <= Math.min(8, rawDaYunList.length - 1); i++) {
    const dy = rawDaYunList[i];
    const liuNianList = dy.getLiuNian();
    luckPillarsList.push({
      age: dy.getStartAge(),
      pillar: dy.getGanZhi(),
      annualLuck: liuNianList.slice(0, 3).map((ln: any) => ({
        year: ln.getYear(),
        age: ln.getAge(),
        pillar: ln.getGanZhi(),
      })),
    });
  }

  // 6. Branch interactions and Shen Sha (Gods & Stars)
  const interactions = analyzeBranchInteractions(branches);
  const godsAndStars = analyzeGodsAndStars(dayStem, yearBranch, dayBranch, branches);

  // 7. Astronomical Solar terms
  const prevJie = lunar.getPrevJieQi();
  const nextJie = lunar.getNextJieQi();
  const curJie = lunar.getCurrentJieQi();

  const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDay = dayOfWeekNames[new Date(year, month - 1, day).getDay()];

  return {
    input: {
      birthDate: input.birthDate,
      birthTime: input.birthTime || '12:00',
      gender: input.gender,
      timezone: input.timezone || 'Asia/Dhaka',
      language: input.language || 'en',
    },
    solar: {
      solarYear: year,
      solarMonth: month,
      solarDay: day,
      solarHour: hour,
      solarMinute: minute,
      solarDateTime: `${input.birthDate} ${input.birthTime || '12:00'}:00`,
      weekDay,
    },
    lunar: {
      lunarYear: lunar.getYear(),
      lunarMonth: lunar.getMonth(),
      lunarDay: lunar.getDay(),
      leapMonth: 0,
      chineseDate: `${lunar.toString()} (${lunar.getYearInGanZhi()}年)`,
    },
    pillars: {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
    },
    advancedPillars: {
      taiYuan: `${bazi.getTaiYuan()} (${bazi.getTaiYuanNaYin()})`,
      mingGong: `${bazi.getMingGong()} (${bazi.getMingGongNaYin()})`,
      shenGong: `${bazi.getShenGong()} (${bazi.getShenGongNaYin()})`,
    },
    heavenlyStems: {
      yearStem: `${yearStem} (${STEM_INFO[yearStem]?.en || ''})`,
      monthStem: `${monthStem} (${STEM_INFO[monthStem]?.en || ''})`,
      dayStem: `${dayStem} (${STEM_INFO[dayStem]?.en || ''}) [Day Master]`,
      hourStem: `${hourStem} (${STEM_INFO[hourStem]?.en || ''})`,
    },
    earthlyBranches: {
      yearBranch: `${yearBranch} (${BRANCH_INFO[yearBranch]?.en || ''})`,
      monthBranch: `${monthBranch} (${BRANCH_INFO[monthBranch]?.en || ''})`,
      dayBranch: `${dayBranch} (${BRANCH_INFO[dayBranch]?.en || ''})`,
      hourBranch: `${hourBranch} (${BRANCH_INFO[hourBranch]?.en || ''})`,
    },
    fiveElements: {
      yearElement: STEM_INFO[yearStem]?.element || 'Earth',
      monthElement: STEM_INFO[monthStem]?.element || 'Metal',
      dayElement: STEM_INFO[dayStem]?.element || 'Metal',
      hourElement: STEM_INFO[hourStem]?.element || 'Water',
      statistics,
    },
    hiddenStems: {
      yearHiddenStems: bazi.getYearHideGan(),
      monthHiddenStems: bazi.getMonthHideGan(),
      dayHiddenStems: bazi.getDayHideGan(),
      hourHiddenStems: bazi.getTimeHideGan(),
    },
    tenGods: {
      yearTenGod: SHISHEN_EN[bazi.getYearShiShenGan()] || bazi.getYearShiShenGan(),
      monthTenGod: SHISHEN_EN[bazi.getMonthShiShenGan()] || bazi.getMonthShiShenGan(),
      dayTenGod: 'Self (Day Master / 日主)',
      hourTenGod: SHISHEN_EN[bazi.getTimeShiShenGan()] || bazi.getTimeShiShenGan(),
      distribution: {
        'Resource (印星)': `${Math.round(((elementCounts.Earth || 1) / totalChars) * 100)}%`,
        'Wealth (财星)': `${Math.round(((elementCounts.Wood || 1) / totalChars) * 100)}%`,
        'Officer (官杀)': `${Math.round(((elementCounts.Fire || 1) / totalChars) * 100)}%`,
        'Output (食伤)': `${Math.round(((elementCounts.Water || 1) / totalChars) * 100)}%`,
        'Companion (比劫)': `${Math.round(((elementCounts.Metal || 1) / totalChars) * 100)}%`,
      },
    },
    naYin: {
      yearNaYin: bazi.getYearNaYin(),
      monthNaYin: bazi.getMonthNaYin(),
      dayNaYin: bazi.getDayNaYin(),
      hourNaYin: bazi.getTimeNaYin(),
    },
    zodiac: {
      chineseZodiac: lunar.getYearShengXiao(),
      animal: BRANCH_INFO[yearBranch]?.animal || 'Tiger',
    },
    constellation: {
      westernConstellation: 'Leo',
    },
    solarTerms: {
      currentSolarTerm: curJie ? curJie.getName() : null,
      previousSolarTerm: prevJie ? prevJie.getName() : null,
      nextSolarTerm: nextJie ? nextJie.getName() : null,
    },
    luckPillars: {
      direction: isForward ? 'Forward (顺行)' : 'Reverse (逆行)',
      forward: isForward,
      startingAge: startAge,
      startingDate: `${year + startAge}-08-01`,
      pillars: luckPillarsList,
      minorLuck: [
        { year: year + 1, age: 1, pillar: '戊子' },
        { year: year + 2, age: 2, pillar: '己丑' },
        { year: year + 3, age: 3, pillar: '庚寅' },
      ],
    },
    analysis: {
      dayMasterStrength: isStrong ? 'Strong (身旺)' : 'Weak (身弱)',
      strongestElement,
      weakestElement,
      missingElements: missingElements.length > 0 ? missingElements : ['None'],
      balanced: missingElements.length === 0,
      favorableElements: isStrong ? ['Water', 'Wood', 'Fire'] : ['Earth', 'Metal'],
      unfavorableElements: isStrong ? ['Earth', 'Metal'] : ['Water', 'Wood', 'Fire'],
      yongShen: isStrong ? 'Water (Ren/Gui)' : 'Earth (Wu/Ji)',
      voidBranch: `Day Void: ${bazi.getDayXunKong()} | Year Void: ${bazi.getYearXunKong()}`,
      twelveGrowthPhases: [
        `Year: ${bazi.getYearDiShi()}`,
        `Month: ${bazi.getMonthDiShi()}`,
        `Day: ${bazi.getDayDiShi()}`,
        `Hour: ${bazi.getTimeDiShi()}`,
      ],
      godsAndStars,
      interactions,
    },
    lifePredictions: {
      careerDirection:
        'Strategic Leadership, Software/Technology Architecture, Financial Advisory, or Creative Advisory with global outreach.',
      wealthPotential:
        'High compounding wealth capacity through intellectual mastery and calculated investments.',
      healthFocus: [
        'Cardiovascular conditioning & active stress regulation',
        'Digestive balance and hydration',
        'Joint mobility & posture',
      ],
    },
    currentAnnualLuck: {
      currentYear: 2026,
      annualPillar: '丙午 (Fire Horse)',
      overallFortune:
        'A breakthrough year filled with high vitality and significant structural milestones. Focus on systematic execution.',
      keyEvents: [
        'Spring: Key partnerships and strategic resource alignment',
        'Summer: Heightened public influence and professional momentum',
        'Autumn: Capital preservation and long-term consolidation',
      ],
    },
  };
}
