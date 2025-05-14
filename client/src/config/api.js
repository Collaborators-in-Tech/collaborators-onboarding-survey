// const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_URL = "http://127.0.0.1:8000/api";

export const API = {
  FORM_LINK:"http://localhost:5173/",
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  LOGOUT: `${BASE_URL}/logout`,
  UPDATE_PASSWORD: `${BASE_URL}/update-password`,
  GET_QUESTIONS: `${BASE_URL}/form/questions`,
  POST_ANSWERS: `${BASE_URL}/form/answers`,
  GET_ANSWERS: `${BASE_URL}/form/answers`,
  DELETE_USER: (id) =>`${BASE_URL}/delete-user/${id}`,

};
