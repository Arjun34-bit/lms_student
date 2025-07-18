import { timeStamp } from "../store/courseStore";

export function formatDate(date) {
  return new Date(date).toLocaleString();
}

export function getStatusColor(status) {
  return status === "approved" ? "text-green-600" : "text-orange-500";
}

export function checkIfLiveClass(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
}

export function updateKey(key, value) {
  timeStamp.set({
    ...timeStamp.get(),
    [key]: value,
  });
}
