export function getKey<T: any>(obj: any, key: string, defaultValue: any = undefined): T {
  return key in obj ? obj[key] : defaultValue;
}