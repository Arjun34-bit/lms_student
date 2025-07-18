import { atom } from "nanostores";

export const courseTitle = atom("");
export const courseDetails = atom("");
export const timeStamp = atom({
  token: "",
  courseId: "",
  lessionId: "",
  videoId: "",
  pos: "",
});

export function setCourseTitle(title) {
  courseTitle.set(title);
}

export function setCourseDetails(data) {
  courseDetails.set(data);
}

export function updateKey(key, value) {
  timeStamp.set({
    ...timeStamp.get(),
    [key]: value,
  });
}
