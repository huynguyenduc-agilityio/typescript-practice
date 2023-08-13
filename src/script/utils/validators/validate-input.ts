const validateRequired = (value = '', field: string): string | undefined => {
  return value ? undefined : `${field} is required`;
};

export const validateEmail = (email = ''): string | undefined => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //if email is blank or undefined
  if (!email) {
    return validateRequired(email, 'Email');
  }

  //if email not match regex email
  if (!email.match(regex)) {
    return 'Email is not valid';
  }

  return;
};

export const validatePassword = (password = ''): string | undefined => {
  const characterRegex = /^(?=.*\d)[0-9a-zA-Z]{8,}$/;
  const uppercaseRegex = /^(?=.*[A-Z]).*$/;
  const lowercaseRegex = /^(?=.*[a-z]).*$/;
  const numberRegex = /^(?=.*\d).*$/;

  //if password is blank or undefined
  if (!password) {
    return validateRequired(password, 'Password');
  }

  //if password not match at least 8 characters for password
  if (!password.match(characterRegex)) {
    return 'Please enter at least 8 characters for password';
  }

  //if password not match at least 1 uppercase letter
  if (!password.match(uppercaseRegex)) {
    return 'Please enter at least 1 uppercase letter';
  }

  //if password not match at least 1 lowercase letter
  if (!password.match(lowercaseRegex)) {
    return 'Please enter at least 1 lowercase letter';
  }

  //if password not match at least 1 number character
  if (!password.match(numberRegex)) {
    return 'Please enter at least 1 number character';
  }

  return;
};

export const validateConfirmPassword = (pass1 = '', pass2 = ''): string | undefined => {
  //if password confirmation is blank or undefined
  if (!pass2) {
    return validateRequired(pass2, 'Password confirmation');
  }

  //if password confirmation do not match password
  if (pass2 !== pass1) {
    return 'Password confirmation do not match password';
  }

  return;
};
