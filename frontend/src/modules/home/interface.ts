import { ChangeEvent } from "react";

export interface PredictionData {
  _id?: string;
  id: number;
  date: Date;
  status: string;
  home_goals: number;
  away_goals: number;
  homeID: number;
  homeTeam: string;
  homeLogo: string;
  awayID: number;
  awayTeam: string;
  awayLogo: string;
  country: string;
  countryCode: string;
  competition: string;
  competition_full: string;
  home_win: string;
  away_win: string;
  "1x2": string;
  draw: string;
  both_teams: string;
  both_teams_to_score: string;
  over15goals: string;
  over25goals: string;
  over35goals: string;
  correctscore: string;
  homeform: string;
  awayform: string;
  home_win_odds: string;
  away_win_odds: string;
  draw_odds: string;
  "1x_odds": string;
  "12_odds": string;
  "2x_odds": string;
  bttshomeform?: string;
  bttsawayform?: string;
  btts_yes_odds?: string;
  btts_no_odds?: string;
  createAt?: Date;
  updatedAt?: Date;
}

export interface PredictionResponse {
  hasNextPage: boolean;
  docs: PredictionData[];
}

export interface UseHomeReturn {
  date: string;
  search: string;
  data: PredictionData[];
  hasNext: boolean;
  loading: boolean;
  error: string | null;
  closeAlert: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}
