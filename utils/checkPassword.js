const bcrypt = require("bcrypt");

export default function isSamePassword(unPasswordHash, passwordHash) {
  return bcrypt.compare(unPasswordHash, passwordHash).then(function (result) {
    return result;
  });
}
