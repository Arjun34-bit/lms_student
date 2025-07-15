export const setItem = (key, value) => {
  localStorage.removeItem(key);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeItem = (key) => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const clearStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
  }
};
