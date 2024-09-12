// Reference the typedef from types.js
/**
 * @typedef {Object} RegisterFormData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 */
/**
 * @typedef {Object} SignInFormData
 * @property {string} email
 * @property {string} password
 */
/**
 * Some function that uses RegisterFormData
 * @param {RegisterFormData} formData
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const register = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/validate-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

/**
 * Some function that uses RegisterFormData
 * @param {SignInFormData} formmData
 */

export const signIn = async (formmData) => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formmData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
