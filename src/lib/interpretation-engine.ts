import type { BaziCalculateResponse } from './types';

export interface HumanReport {
  archetypeTitle: string;
  archetypeTagline: string;
  personalitySummary: string;
  strengths: string[];
  blindSpots: string[];
  careerGuidance: {
    headline: string;
    bestRoles: string[];
    workStyle: string;
    wealthStrategy: string;
  };
  relationshipInsights: {
    romanticStyle: string;
    partnerProfile: string;
    advice: string;
  };
  currentCycleRoadmap: {
    currentDecadeTheme: string;
    currentYearFocus: string;
    milestones: string[];
  };
  practicalRemedies: {
    favorableColors: string[];
    favorableEnvironments: string[];
    dailyHabits: string[];
  };
}

const DAY_MASTER_ARCHETYPES: Record<string, {
  title: string;
  tagline: string;
  overview: string;
  strengths: string[];
  blindspots: string[];
  careerTone: string;
}> = {
  '甲': {
    title: 'The Pioneering Oak (Yang Wood)',
    tagline: 'Principled Visionary, Resolute Leader & Architect of New Paths',
    overview: 'You possess the majestic nature of a tall, deep-rooted forest tree. You stand tall on personal principles, dislike being micromanaged, and have an innate urge to grow, expand, and lead from the front.',
    strengths: ['Natural leader with unshakeable moral compass', 'Relentless persistence and forward drive', 'Protective of team and family', 'Direct, honest, and visionary'],
    blindspots: ['Can be rigid or stubborn when compromise is needed', 'Prone to burnout by refusing to bend before breaking', 'Impatience with slow or indecisive peers'],
    careerTone: 'Executive Leadership, Entrepreneurship, Forestry/Green Tech, Strategic Development, Architectural Design',
  },
  '乙': {
    title: 'The Resilient Blossom (Yin Wood)',
    tagline: 'Strategic Diplomat, Network Weaver & Agile Problem-Solver',
    overview: 'Like bamboo or climbing vines, you thrive through adaptability, charm, and strategic alliances. Where others face walls, you gracefully find paths around obstacles.',
    strengths: ['Exceptional interpersonal diplomacy and networking', 'Supreme resilience under unpredictable circumstances', 'Artistic sensitivity and refined presentation', 'Intuitive collaborator'],
    blindspots: ['Can overthink and change course too frequently', 'May depend overly on external validation', 'Hesitation when decisive confrontation is needed'],
    careerTone: 'PR & Media Relations, Software Consulting, Creative Direction, Bio-Pharma, Education, Strategic Alliances',
  },
  '丙': {
    title: 'The Radiant Sun (Yang Fire)',
    tagline: 'Charismatic Inspirer, Generous Visionary & Beacon of Energy',
    overview: 'You radiate warmth, vitality, and enthusiasm like the midday sun. You hate shadows, secrecy, and petty politics; you inspire others through openness and sheer presence.',
    strengths: ['Infectious enthusiasm and natural public speaking', 'Boundless energy and passion for innovation', 'Magnanimous, generous, and transparent', 'Fast-paced execution'],
    blindspots: ['Energy can fluctuate rapidly like summer storms', 'Impatience with administrative minutiae', 'Prone to taking on too many commitments at once'],
    careerTone: 'Media & Entertainment, Tech Evangelism, Public Speaking, Renewable Energy, Marketing Leadership',
  },
  '丁': {
    title: 'The Guiding Lantern (Yin Fire)',
    tagline: 'Insightful Mentor, Strategic Illuminator & Master of Focus',
    overview: 'Unlike the roaring sun, you are the focused flame of a candle or torch. You possess sharp intuition, deeply illuminate intricate details, and act as a wise guide to others.',
    strengths: ['Uncanny psychological intuition and analytical depth', 'Meticulous attention to quality and craft', 'Patient, empathetic mentor and advisor', 'Steadfast concentration'],
    blindspots: ['Can harbor hidden anxieties or take criticism personally', 'May over-analyze and become emotionally exhausted', 'Prone to holding quiet grudges'],
    careerTone: 'Research & Development, Data Science, Medical Diagnostics, Philosophy, Psychology, Specialized Engineering',
  },
  '戊': {
    title: 'The Majestic Mountain (Yang Earth)',
    tagline: 'Grounded Protector, Rock-Solid Pillar & Patient Stabilizer',
    overview: 'You are like a grand mountain range: solid, unshakeable, and reliable. People naturally lean on you during crises because of your patience, gravitas, and calm reassurance.',
    strengths: ['Exceptional emotional stability and reliability', 'Huge capacity for handling heavy responsibility', 'Wise long-term perspective and loyalty', 'Steadfast crisis management'],
    blindspots: ['Can be slow to initiate change or embrace new trends', 'May appear emotionally reserved or unapproachable', 'Reluctance to discard outdated routines'],
    careerTone: 'Real Estate & Infrastructure, Corporate Governance, Banking, Supply Chain Logistics, Long-term Asset Management',
  },
  '己': {
    title: 'The Fertile Soil (Yin Earth)',
    tagline: 'Pragmatic Cultivator, Versatile Architect & Empathetic Nurturer',
    overview: 'You possess the rich, nurturing qualities of cultivated farm soil. You are extraordinarily observant, flexible, productive, and possess the rare ability to bring latent potential to life.',
    strengths: ['Highly observant with practical, common-sense execution', 'Natural ability to absorb knowledge and synthesize multiple skills', 'Deep empathy and supportive team player', 'Discreet, trustworthy, and adaptable'],
    blindspots: ['Can be prone to overthinking and worry', 'May struggle with setting firm personal boundaries', 'Tendency to internalize stress and absorb others’ problems'],
    careerTone: 'Software Architecture, Technology Infrastructure, Financial Planning, Operations Management, Product Cultivation',
  },
  '庚': {
    title: 'The Tempering Steel (Yang Metal)',
    tagline: 'Decisive Warrior, System Overhauler & Resolute Achiever',
    overview: 'You are raw mineral steel that becomes a legendary blade under fire and challenge. You value directness, justice, and swift action above polite hesitation.',
    strengths: ['Unrivaled decisiveness, bravery, and grit', 'High tolerance for difficult challenges and conflict', 'Clarity of thought and straightforward communication', 'Exceptional loyalty to allies'],
    blindspots: ['Can be overly blunt or unintentionally sharp with words', 'Impatient with emotional hesitation or slowness', 'May view life as an endless battle'],
    careerTone: 'Fintech, Engineering & Hardware, Corporate Law, Cybersecurity, Turnaround Operations, Military/Security',
  },
  '辛': {
    title: 'The Polished Gem (Yin Metal)',
    tagline: 'Refined Perfectionist, Eloquent Aesthetician & Sharp Mind',
    overview: 'You embody the clarity and radiance of a polished diamond or jewel. You have high self-standards, appreciate beauty, and excel in eloquent communication and precision.',
    strengths: ['Sophisticated aesthetic taste and perfectionist standards', 'Eloquent speaker and persuasive communicator', 'Sharp, incisive intellect and quick wit', 'High sense of self-respect'],
    blindspots: ['Hypersensitive to perceived slights or loss of face', 'Can be overly critical of self and others', 'Tendency to discard things that are imperfect'],
    careerTone: 'Luxury Goods & Design, High-Precision Tech, Precision Finance, Public Speaking, Branding, Legal Strategy',
  },
  '壬': {
    title: 'The Unstoppable Ocean (Yang Water)',
    tagline: 'Expansive Visionary, Dynamic Pioneer & Global Connector',
    overview: 'Like the surging ocean, your mind is vast, constantly moving, and full of depths. You thrive on freedom, global horizons, and large-scale visionary pursuits.',
    strengths: ['Tremendous strategic imagination and macro vision', 'Natural global explorer who breaks boundaries', 'Highly adaptable with fluid, progressive thinking', 'Charismatic motivator'],
    blindspots: ['Can lack discipline when tasks become routine', 'Restless energy that changes focus before finishing', 'Overwhelming intensity when emotionally stirred'],
    careerTone: 'International Trade, Global Tech Platforms, Maritime & Transport, Venture Capital, Macro Economics',
  },
  '癸': {
    title: 'The Morning Mist (Yin Water)',
    tagline: 'Intuitive Sage, Empathic Innovator & Master of Subtlety',
    overview: 'You are like gentle rain or mystical morning mist: subtle, deeply intuitive, and capable of penetrating where brute force fails. You sense undercurrents before they surface.',
    strengths: ['Unmatched emotional and strategic intuition', 'Creative, inventive, and unconventional problem-solving', 'Deep capacity for wisdom, spirituality, and empathy', 'Fluid adaptability'],
    blindspots: ['Can be enigmatic, moody, or secretive', 'Tendency to escape into fantasy when reality is harsh', 'Vulnerable to mental exhaustion from sensory overload'],
    careerTone: 'AI & Data Algorithms, Psychology & Counseling, Creative Writing & Arts, Research Philosophy, Spiritual/Wellness Leadership',
  },
};

export function generateHumanReadableReport(data: BaziCalculateResponse): HumanReport {
  const dayStem = data.heavenlyStems?.dayStem?.charAt(0) || '己';
  const archetype = DAY_MASTER_ARCHETYPES[dayStem] || DAY_MASTER_ARCHETYPES['己'];
  const strength = data.analysis?.dayMasterStrength?.includes('Strong') ? 'Strong' : 'Weak';
  const favorableElements = data.analysis?.favorableElements || ['Water', 'Wood', 'Fire'];
  const stars = data.analysis?.godsAndStars;

  // Custom highlights based on specific stars
  const starHighlights: string[] = [];
  if (stars?.academicStar && stars.academicStar.length > 0) {
    starHighlights.push('Gifted with Wen Chang Academic Star: Exceptional speed for learning coding, languages, and technical concepts.');
  }
  if (stars?.generalStar && stars.generalStar.length > 0) {
    starHighlights.push('Commanding General Star (将星): Innate leadership presence and ability to rally teams under pressure.');
  }
  if (stars?.nobleman && stars.nobleman.length > 0) {
    starHighlights.push('Tian Yi Nobleman Present: Consistent guardian benefactors and timely mentors appearing during crossroads.');
  }
  if (stars?.travelHorse && stars.travelHorse.length > 0) {
    starHighlights.push('Travel Star (驿马) Active: Strong affinity for international collaboration, relocation, and remote expansion.');
  }

  // Career Guidance
  const careerHeadline = strength === 'Strong'
    ? 'Independent Creator & High-Value Strategic Builder'
    : 'Synergistic Specialist & Collaborative Leadership';

  const bestRoles = [
    archetype.careerTone,
    'Software Engineering & System Architecture',
    'Tech Entrepreneurship & Digital Products',
    'Strategic Advisory & Investment Strategy',
  ];

  const workStyle = strength === 'Strong'
    ? 'You perform at your absolute best when given autonomy and end-to-end ownership of your domain. You prefer measuring results over tracking hours, and you thrive under challenging, goal-oriented deliverables.'
    : 'You excel in environments with high-caliber mentors and structured collaborative teams. You leverage shared resources to magnify your creative and technical intelligence.';

  const wealthStrategy = 'Your chart strongly favors building equity and intellectual assets (code, platforms, businesses, investments) rather than relying exclusively on a fixed salary. Multiple income streams and calculated risks will multiply your net worth exponentially.';

  // Relationship Insights
  const romanticStyle = 'You look for deep intellectual resonance, mutual respect, and emotional reliability. Casual superficial chatter quickly tires you; you bond over shared dreams, mutual growth, and honest loyalty.';
  const partnerProfile = 'A partner who is intellectually vibrant, emotionally grounded, and supportive of your personal ambition will bring out the finest qualities in your chart.';
  const relAdvice = 'Ensure you articulate your emotional thoughts out loud rather than expecting your partner to intuitively deduce what is in your mind. Celebrate micro-milestones together.';

  // 10-Year Roadmap
  const currentDecadeTheme = data.luckPillars?.pillars?.[1]
    ? `Current Decade (${data.luckPillars.pillars[1].age}-${data.luckPillars.pillars[1].age + 9} yrs): Era of Skill Acceleration & Foundation Laying`
    : 'Era of Skill Mastery & Professional Foundation';

  const currentYearFocus = data.currentAnnualLuck
    ? `2026 (${data.currentAnnualLuck.annualPillar}): A transformative resource year. Focus on mastering high-leverage technical skills, publishing projects, and formalizing strategic partnerships.`
    : 'Focus on aggressive skill development and expanding your personal brand.';

  const milestones = [
    'Immediate (Next 12 Months): Ship and showcase practical digital products or technical milestones.',
    'Late 20s (Ages 27–30): Crucial career breakthrough window; transition from specialist to owner/leader.',
    'Early 30s & Beyond: Significant capital compounding, institutional authority, and lifestyle freedom.',
  ];

  // Practical Remedies based on favorable elements
  const favorableColors = favorableElements.map((el) => {
    switch (el) {
      case 'Water': return 'Deep Navy Blue, Black, Cyan (Water Element)';
      case 'Wood': return 'Emerald Green, Mint, Forest Tones (Wood Element)';
      case 'Fire': return 'Crimson Red, Purple, Coral, Warm Amber (Fire Element)';
      case 'Metal': return 'White, Silver, Platinum, Gold (Metal Element)';
      default: return 'Sand Yellow, Terracotta, Earth Brown (Earth Element)';
    }
  });

  const favorableEnvironments = [
    'Well-lit, clean workspaces with plenty of natural daylight and plants',
    'Environments that encourage continuous intellectual curiosity and technical experimentation',
    'Open collaborative circles with high-performing, forward-thinking builders',
  ];

  const dailyHabits = [
    'Execute your highest-priority creative or coding task in the morning before checking notifications',
    'Maintain daily hydration and deliberate physical movement to keep energy moving smoothly',
    'Keep a digital decision journal: reflect on what generated high leverage versus what caused friction',
  ];

  return {
    archetypeTitle: archetype.title,
    archetypeTagline: archetype.tagline,
    personalitySummary: archetype.overview,
    strengths: [...archetype.strengths, ...starHighlights],
    blindSpots: archetype.blindspots,
    careerGuidance: {
      headline: careerHeadline,
      bestRoles,
      workStyle,
      wealthStrategy,
    },
    relationshipInsights: {
      romanticStyle,
      partnerProfile,
      advice: relAdvice,
    },
    currentCycleRoadmap: {
      currentDecadeTheme,
      currentYearFocus,
      milestones,
    },
    practicalRemedies: {
      favorableColors,
      favorableEnvironments,
      dailyHabits,
    },
  };
}
