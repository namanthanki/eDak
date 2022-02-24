import cookie from "js-cookie";

export const setCookie = (key, val) => {
  if (window !== undefined) {
    cookie.set(key, val, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStroage = (key, val) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

export const removeLocalStroage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (res, next) => {
  setCookie("token", res.data.token);
  setLocalStroage("user", res.data.user);
  next();
};

export const logout = (next) => {
  removeCookie("token");
  removeLocalStroage("user");
  next();
};

export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (res, next) => {
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = res.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
