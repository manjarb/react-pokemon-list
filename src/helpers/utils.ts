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
