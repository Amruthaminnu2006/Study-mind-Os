export function getUser() {

  const storedUser = localStorage.getItem("studyos_user");

  if (!storedUser) return null;

  return JSON.parse(storedUser);

}