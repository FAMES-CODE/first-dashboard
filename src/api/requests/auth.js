import axiosConfig from "../axiosConfig";

export async function getAuth() {
  return axiosConfig.get("/auth");
}

export async function login(data) {
  // pre validation of data
  return axiosConfig.post("/auth/login", data);
}

export async function register(data) {
  // pre validation of data
  return axiosConfig.post("/auth/register", data);
}

export async function getSessions() {
  return axiosConfig.get("/sessions");
}

export async function getSession(id) {
  return axiosConfig.get(`/sessions/${id}`);
}

export async function createSession(data) {
  return axiosConfig.post("/sessions", data);
}

export async function updateSession(id, data) {
  return axiosConfig.put(`/sessions/${id}`, data);
}

export async function getParticipant(id) {
  return axiosConfig.get(`/participants/${id}`);
}

export async function createParticipant(data) {
  return axiosConfig.post("/participants", data);
}
