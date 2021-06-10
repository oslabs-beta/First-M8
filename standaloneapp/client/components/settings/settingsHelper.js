const ipRegex = require("ip-regex");

module.exports = {
  nameHelper: (name) => {
    if (name === "new") return true;
  },
  ipHelper: (ip) => {
    if (ipRegex({ exact: true }).test(ip)) return false;
    return false;
  },
  portHelper: (port) => {
    const numPort = parseInt(port);
    if ((0 > numPort && numPort >= 65353) || numPort % 1 !== 0) return true;
    return false;
  },
};
