import localstorage from "../storage/localstorage";

const TOKEN_KEY = "digital_hospital_token";
const USER_INFO_KEY = "digital_hospital_user";

//获取
const getTokenCache = () => {
  const { token } = localstorage.get(TOKEN_KEY, { token: "" });
  return token;
};

const setTokenCache = (token: string) => {
  localstorage.set(TOKEN_KEY, { token });
};

const getUserInfoCache = () => {
  return localstorage.get(USER_INFO_KEY, {});
};

const setUserInfoCache = (info: object) => {
  localstorage.set(USER_INFO_KEY, info);
};

//console.log(JSON.parse(TOKEN_KEY));


export { getTokenCache, setTokenCache, getUserInfoCache, setUserInfoCache };
