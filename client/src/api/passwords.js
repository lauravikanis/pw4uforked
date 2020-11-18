export const getPassword = async (passwordName) => {
  const response = await fetch(`/passwords/${passwordName}`);
  const password = await response.text();
  return password;
};
// export const postPassword = async (passwordName) => {

// }
