const setItem = (key, value) => {
  localStorage.removeItem(key);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getItem = (key) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export { getItem as g, setItem as s };
