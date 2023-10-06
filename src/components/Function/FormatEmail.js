const formatEmail = (email) => {
  return email.replace("@", "").replace(".", "");
};

export default formatEmail;
