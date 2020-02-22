import api from '@/api/api';

export default {
  getAllAvatars() {
    return api.get(`avatar`).then(response => response.data);

  },
    //patch anrop här där jag ändrar länk till avatar.
  };