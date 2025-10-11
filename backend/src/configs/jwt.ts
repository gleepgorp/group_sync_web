export default {
  secret: process.env.JWT_SECRET || "secret-key-ni-bins",
  sign: {
    expiresIn: "1h"
  }
};
