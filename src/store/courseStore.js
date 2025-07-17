import { atom } from "nanostores";

export const courseTitle = atom("");

export function setCourseTitle(title) {
  courseTitle.set(title);
}
