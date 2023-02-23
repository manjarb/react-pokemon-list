import { config } from "../data/config";

export function getPaginationPayload(page: number, limit: number) {
  return {
    limit,
    offset: (page - 1) * limit,
  };
}

export function convertDeciToCentiMeter(decimeter: number): number {
  return decimeter * 10;
}

export function convertHectoToKiloGrams(hectoGram: number): number {
  return hectoGram / 10;
}

export function toggleArrayIfValueExist<T>(
  list: T[],
  results: T[],
  key: keyof T,
  value: string
) {
  const index = list.findIndex((l) => l[key] === value);
  if (index !== -1) {
    list.splice(index, 1);
    return list;
  } else {
    const findResult = results.find((r) => r[key] === value);
    if (findResult) {
      return [...list, findResult];
    }
  }

  return list;
}

export function removeArrayIfValueExist<T>(
  list: T[],
  key: keyof T,
  value: string,
  data: T
) {
  const index = list.findIndex((l) => l[key] === value);
  if (index !== -1) {
    list.splice(index, 1);
    return list;
  } else {
    return [
      ...list,
      data,
    ];
  }
}
