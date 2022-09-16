const toCamelCase = (input: string) =>
  input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const mapFromPSQL = <T>(rows: TableRow[]) => {
  return rows.map((r) => {
    const result: any = {};

    Object.keys(r).forEach((k) => {
      const camelCaseKey = toCamelCase(k);
      const value = r[k];

      result[camelCaseKey] = value instanceof Date ? value.toISOString() : value;
    });

    return result as T;
  });
};
