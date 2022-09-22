export const isSignedIn = () => {
  let res = localStorage.getItem('token');
  if (res !== null) {
    return res;
  }
  return false;
};

export const setItem = async (name, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await localStorage.removeItem(name);
      await localStorage.setItem(name, JSON.stringify(data));
      resolve();
    } catch (error) {
      resolve();
    }
  });
};

export const getItem = async (name) => {
  return new Promise(async (resolve, reject) => {
    let res = await localStorage.getItem(name);
    if (res !== null) {
      resolve(res);
    } else {
      resolve(false);
    }
  });
};

export const removeItem = async (name) => {
  try {
    await localStorage.removeItem(name);
  } catch (error) {}
};
