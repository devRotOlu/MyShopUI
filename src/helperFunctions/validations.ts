const patterns = {
  telephone: /^\d{11}$/,
  username: /^[a-z\d]{5,12}$/i,
  password: /^[\w@-]{8,20}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};

const validateInputs = (name: string, value: string) => {
  if (name === "firstName" || name === "lastName") {
    return patterns["username"].test(value);
  } else {
    return patterns[name].test(value);
  }
};
