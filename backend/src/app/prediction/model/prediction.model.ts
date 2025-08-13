import { COLLECTIONS } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { IPrediction } from '../interface';

@Schema({ collection: COLLECTIONS.predict, timestamps: true })
export class PredictionModel implements IPrediction {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: Date, index: 1 })
  date: Date;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Number })
  home_goals: number;

  @Prop({ type: Number })
  away_goals: number;

  @Prop({ type: Number })
  homeID: number;

  @Prop({ type: String, index: 1 })
  homeTeam: string;

  @Prop({ type: String })
  homeLogo: string;

  @Prop({ type: Number })
  awayID: number;

  @Prop({ type: String, index: 1 })
  awayTeam: string;

  @Prop({ type: String })
  awayLogo: string;

  @Prop({ type: String, index: 1 })
  country: string;

  @Prop({ type: String })
  countryCode: string;

  @Prop({ type: String, index: 1 })
  competition: string;

  @Prop({ type: String })
  competition_full: string;

  @Prop({ type: String, index: 1 })
  home_win: string;

  @Prop({ type: String })
  away_win: string;

  @Prop({ type: String })
  '1x2': string;

  @Prop({ type: String })
  draw: string;

  @Prop({ type: String })
  both_teams: string;

  @Prop({ type: String })
  both_teams_to_score: string;

  @Prop({ type: String })
  over15goals: string;

  @Prop({ type: String })
  over25goals: string;

  @Prop({ type: String })
  over35goals: string;

  @Prop({ type: String })
  correctscore: string;

  @Prop({ type: String })
  homeform: string;

  @Prop({ type: String })
  awayform: string;

  @Prop({ type: String })
  home_win_odds: string;

  @Prop({ type: String })
  away_win_odds: string;

  @Prop({ type: String })
  draw_odds: string;

  @Prop({ type: String })
  '1x_odds': string;

  @Prop({ type: String })
  '12_odds': string;

  @Prop({ type: String })
  '2x_odds': string;

  @Prop({ type: String })
  bttshomeform?: string;

  @Prop({ type: String })
  bttsawayform?: string;

  @Prop({ type: String })
  btts_yes_odds?: string;

  @Prop({ type: String })
  btts_no_odds?: string;
}

export type PredictionDocument = PredictionModel & Document;
export const PredictionSchema = SchemaFactory.createForClass(PredictionModel);
PredictionSchema.plugin(paginate);
