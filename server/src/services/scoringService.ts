interface ScoringResult {
  levelAchieved: string;
  unlocksNextStep: boolean;
  failed: boolean;
}

export const calculateScoreAndLevel = (
  step: number,
  score: number,
  previousLevel: string | null = null
): ScoringResult => {
  const result: ScoringResult = {
    levelAchieved: previousLevel || "Not Certified",
    unlocksNextStep: false,
    failed: false,
  };

  switch (step) {
    case 1: // A1 & A2
      if (score < 25) {
        result.failed = true;
      } else if (score < 50) {
        result.levelAchieved = "A1";
      } else if (score < 75) {
        result.levelAchieved = "A2";
      } else {
        result.levelAchieved = "A2";
        result.unlocksNextStep = true;
      }
      break;
    case 2: // B1 & B2
      result.levelAchieved = "A2"; // Default to previous level
      if (score >= 25 && score < 50) {
        result.levelAchieved = "B1";
      } else if (score >= 50 && score < 75) {
        result.levelAchieved = "B2";
      } else if (score >= 75) {
        result.levelAchieved = "B2";
        result.unlocksNextStep = true;
      }
      break;
    case 3: // C1 & C2
      result.levelAchieved = "B2"; // Default to previous level
      if (score >= 25 && score < 50) {
        result.levelAchieved = "C1";
      } else if (score >= 50) {
        result.levelAchieved = "C2";
      }
      break;
  }

  return result;
};
