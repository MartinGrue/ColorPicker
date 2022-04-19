export interface IPaletteLevels {
  paletteName: string;
  id: string;
  emoji: string;
  levels: IColor[][];
}
export interface IColor {
  [key: string]: string | number;
  levelVolume: number;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
  id: string;
}
