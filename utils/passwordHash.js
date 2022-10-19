const bcrypt = require("bcrypt");

export default function passwordHash(unPasswordHash) {
  return bcrypt.hash(unPasswordHash, 10).then(function (hash) {
    return hash;
  });
}
