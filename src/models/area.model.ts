export enum Areas {
  Center = 'center',
  South = 'south',
  North = 'north',
  None = '',
}

export const areaToDisplayName: { [key in Areas]: string } = {
  [Areas.Center]: 'מרכז',
  [Areas.South]: 'דרום',
  [Areas.North]: 'צפון',
  [Areas.None]: 'כל הארץ',
};
