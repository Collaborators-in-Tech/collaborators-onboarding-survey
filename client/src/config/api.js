// const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_URL = "http://127.0.0.1:8000/api";

export const API = {
  FORM_LINK:"http://localhost:5173/",
  LOGIN: `${BASE_URL}/admin/login`,
  REGISTER: `${BASE_URL}/admin/register`,
  LOGOUT: `${BASE_URL}/admin/logout`,
  UPDATE_PASSWORD: `${BASE_URL}/admin/update-password`,
  UPDATE_NAME: `${BASE_URL}/admin/update-name`,
  DELETE_ACCOUNT: `${BASE_URL}/admin/delete-account`,
  GET_FORMS:`${BASE_URL}/form`,
  GET_QUESTIONS: (formId) => `${BASE_URL}/form/${formId}/questions`,
  GET_ADMINS: `${BASE_URL}/admin/admin-list`,
  GET_QUESTION: (formId,questionId) => `${BASE_URL}/form/question/${formId}/${questionId}`,
  DELETE_QUESTION: (formId,questionId) => `${BASE_URL}/form/question/${formId}/${questionId}`,
  CREATE_QUESTION: (formId) => `${BASE_URL}/form/question/${formId}`,
  UPDATE_QUESTION:(formId,questionId) => `${BASE_URL}/form/question/${formId}/${questionId}`,
  POST_ANSWERS:(formId) =>`${BASE_URL}/form/${formId}/answers`,
  GET_ANSWERS: `${BASE_URL}/form/answers`,
  DELETE_USER: (id) =>`${BASE_URL}/admin/delete-user/${id}`,
  DELETE_ADMIN: (id) =>`${BASE_URL}/admin/delete-admin/${id}`,
  CREATE_FORM: `${BASE_URL}/form/new-form`,
  DELETE_FORM:(formId) =>`${BASE_URL}/form/${formId}`,
};
