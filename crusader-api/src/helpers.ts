const toCamelCase = (input: string) => input.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

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
