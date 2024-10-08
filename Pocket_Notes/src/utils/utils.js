import moment from "moment";

export const getSavedFolders = () => {
  return JSON.parse(localStorage.getItem("folders")) || [];
};

export const saveFolders = (folders) => {
  localStorage.setItem("folders", JSON.stringify(folders));
};

export const formatDate = (date) => {
  return moment(date).format("DD MMM YYYY");
};

export const formatTime = (time) => {
  return moment(time).format("hh:mm A");
};
