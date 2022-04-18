export interface IExtendedPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: IColor[][];
}
interface IColor {
  [key: string]: string;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
  id: string;
}