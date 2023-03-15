const axios = require("axios");

const sendRequestGetDatail = async (URL) => {
  const response = await axios.get(URL);
  return response.data;
};

const sendRequestGetJson = async (URL) => {
  customConfig = {
    headers: {
    }, responseType: 'json',
};
  const response = await axios.get(URL,customConfig);
 
  return response.data;
};
//Export เพื่อให้ file หน้าอื่นๆ ใช้งาน
module.exports = {
  sendRequestGetDatail
,sendRequestGetJson
};
