export type AchievementResultType = "finalist" | "round2" | "participant";

export interface AchievementItem {
  event: string;
  result: string;
  resultType: AchievementResultType;
  org: string;
  detail: string;
}

export const achievements: AchievementItem[] = [
  {
    event: "Smart India Hackathon (SIH) 2026",
    result: "Finalist",
    resultType: "finalist",
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Built a Waste Management & Municipal Corporation Citizen Interaction Dashboard.",
  },
  {
    event: "Smart India Hackathon (SIH) 2025",
    result: "Finalist",
    resultType: "finalist",
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Built a Blockchain-based Document Verification Portal using OCR for document extraction and verification.",
  },
  {
    event: "Smart India Hackathon (SIH) 2024",
    result: "Finalist",
    resultType: "finalist",
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Developed an AI/ML-based solution as part of a collaborative team.",
  },
  {
    event: "Impactathon @ KSV 2026",
    result: "Finalist",
    resultType: "finalist",
    org: "KSV University",
    detail: 'Built "Apno Rasto", an AI/ML-based solution focused on solving a real-world civic infrastructure problem.',
  },
  {
    event: "Adobe Hackathon 2026",
    result: "Round 2",
    resultType: "round2",
    org: "LDRP-ITR",
    detail: "Team selected for Round 2, developing an AI/ML-based creative solution powered by Adobe technologies.",
  },
  {
    event: "ISRO Hackathon 2025",
    result: "Participant",
    resultType: "participant",
    org: "ISRO",
    detail: "Participated in a team-based AI/ML-focused technical initiative organized by the Indian Space Research Organisation.",
  },
  {
    event: "ISRO Hackathon 2024",
    result: "Participant",
    resultType: "participant",
    org: "ISRO",
    detail: "Participated in a team-based AI/ML-focused technical initiative organized by the Indian Space Research Organisation.",
  },
  {
    event: "Odoo Hackathon × KSV",
    result: "Participant",
    resultType: "participant",
    org: "KSV University",
    detail: 'Built "Vendor Vision", an AI/ML-based vendor analytics solution developed during the Odoo hackathon series.',
  },
  {
    event: "Odoo Hackathon × LDCE",
    result: "Participant",
    resultType: "participant",
    org: "LDCE Ahmedabad",
    detail: "Built a smart Trip Planner powered by AI/ML recommendations for personalized travel itineraries.",
  },
  {
    event: "Odoo Hackathon × NMIT Mangalore",
    result: "Participant",
    resultType: "participant",
    org: "NMIT Mangalore",
    detail: "Built an Employee Management System using AI/ML-based automation for HR workflows and analytics.",
  },
];
