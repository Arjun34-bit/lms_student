import { atom } from "nanostores";

export const isLoading = atom(false);

export function setIsLoading(value) {
  isLoading.set(value);
}
