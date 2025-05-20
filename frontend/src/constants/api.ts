const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/user/create`,
    verifyAccountInitiate: `${API_BASE_URL}/auth/initiate-email-verification`,
    verifyAccountConfirm: (code: string) =>
      `${API_BASE_URL}/auth/verify-email/${code}`,
    resetPasswordInitiate: `${API_BASE_URL}/auth/initiate-reset-password`,
    resetPasswordConfirm: `${API_BASE_URL}/auth/reset-password`,
  },
  user: {
    me: `${API_BASE_URL}/user/me`,
    all: `${API_BASE_URL}/user/all`,
  },
  vehicle:{
    all: `${API_BASE_URL}/vehicles/getMyVehicles`,
    create: `${API_BASE_URL}/vehicles/create`,
    update: (id: string) => `${API_BASE_URL}/vehicles/update`,
    delete: (id: string) => `${API_BASE_URL}/vehicles/delete`,
    getById: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
  },
parking: {
  create: `${API_BASE_URL}/parkingSession/create`,
  update: `${API_BASE_URL}/parkingSession/update`,
  delete: `${API_BASE_URL}/parkingSession/delete`,
  all: `${API_BASE_URL}/parkingSession`,
  getById: (id: string) => `${API_BASE_URL}/parkingSession/${id}`,
},
  parkingSlots:{
    all: `${API_BASE_URL}/parkingSlots`,
    create: `${API_BASE_URL}/parkingSlots`,
    update: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    delete: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    getById: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    available:`${API_BASE_URL}/parkingSlots/available`,
  },

    entry: {
    create: `${API_BASE_URL}/entry/create`,
  },
};
export default API_ENDPOINTS;