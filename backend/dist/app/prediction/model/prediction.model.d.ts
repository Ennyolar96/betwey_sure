import { Document } from 'mongoose';
import { IPrediction } from '../interface';
export declare class PredictionModel implements IPrediction {
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
    '1x2': string;
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
    '1x_odds': string;
    '12_odds': string;
    '2x_odds': string;
    bttshomeform?: string;
    bttsawayform?: string;
    btts_yes_odds?: string;
    btts_no_odds?: string;
}
export type PredictionDocument = PredictionModel & Document;
export declare const PredictionSchema: import("mongoose").Schema<PredictionModel, import("mongoose").Model<PredictionModel, any, any, any, Document<unknown, any, PredictionModel, any, {}> & PredictionModel & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PredictionModel, Document<unknown, {}, import("mongoose").FlatRecord<PredictionModel>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PredictionModel> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
