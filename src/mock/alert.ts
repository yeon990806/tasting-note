const MockingAlert = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 2000);
  });
};