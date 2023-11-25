export const getCurrentSettings = () => {
  const betaUser = localStorage.betaUserData
    ? JSON.parse(localStorage.betaUserData)
    : null;

  return betaUser;
};
