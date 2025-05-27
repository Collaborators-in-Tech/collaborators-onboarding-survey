// const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_URL = "http://127.0.0.1:8000/api";

export const API = {
  FORM_LINK:"http://localhost:5173/",
  LOGIN: `${BASE_URL}/admin/login`,
  REGISTER: `${BASE_URL}/admin/register`,
  LOGOUT: `${BASE_URL}/admin/logout`,
  UPDATE_PASSWORD: `${BASE_URL}/admin/update-password`,
  GET_QUESTIONS: `${BASE_URL}/form/questions`,
  GET_ADMINS: `${BASE_URL}/admin/admin-list`,
  GET_QUESTION: (formId,questionId) => `${BASE_URL}/form/question/${formId}/${questionId}`,
  UPDATE_QUESTION:(formId,questionId) => `${BASE_URL}/form/question/${formId}/${questionId}`,
  POST_ANSWERS: `${BASE_URL}/form/answers`,
  GET_ANSWERS: `${BASE_URL}/form/answers`,
  DELETE_USER: (id) =>`${BASE_URL}/admin/delete-user/${id}`,

};
