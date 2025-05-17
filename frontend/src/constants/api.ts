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
    create: `${API_BASE_URL}/vehicles`,
    update: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
    getById: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
  },
  parkingRequests:{
    mine: `${API_BASE_URL}/parkingRequests/myRequests`,
    all: `${API_BASE_URL}/parkingRequests/allRequests`,
    create: `${API_BASE_URL}/parkingRequests`,
    update: (id: string) => `${API_BASE_URL}/parkingRequests/${id}`,
    delete: (id: string) => `${API_BASE_URL}/parkingRequests/${id}`,
    getById: (id: string) => `${API_BASE_URL}/parkingRequests/${id}`,
    approve: (id: string) => `${API_BASE_URL}/parkingRequests/approve/${id}`,
    reject: (id: string) => `${API_BASE_URL}/parkingRequests/reject/${id}`,
  },
  parkingSlots:{
    all: `${API_BASE_URL}/parkingSlots`,
    create: `${API_BASE_URL}/parkingSlots`,
    update: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    delete: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    getById: (id: string) => `${API_BASE_URL}/parkingSlots/${id}`,
    available:`${API_BASE_URL}/parkingSlots/available`,
  }
};

export default API_ENDPOINTS;
