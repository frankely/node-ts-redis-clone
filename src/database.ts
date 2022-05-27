const database = new Map<string, string>();

export function set(name: string, value: string) {
  database.set(name, value);
}
export function get(name: string) {
  return database.get(name);
}
export function unset(name: string) {
  database.delete(name);
}

export function countValueOccurrences(value: string) {
  return [...database.values()].filter((v) => v === value).length;
}