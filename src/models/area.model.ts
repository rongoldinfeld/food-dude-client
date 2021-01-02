export enum Areas {
  Center = 'center',
  South = 'south',
  North = 'north',
  None = '',
}

export const areaToDisplayName: { [key in Areas]: string } = {
  [Areas.Center]: 'Center',
  [Areas.South]: 'South',
  [Areas.North]: 'North',
  [Areas.None]: 'All',
};
