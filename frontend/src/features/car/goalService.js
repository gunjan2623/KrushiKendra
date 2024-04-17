import axios from 'axios'

const API_URL = 'http://localhost/5000/'

// Create new goal
const createCar = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get user cars
const getCars = async () => {
  try{
  const response = await axios.get(API_URL+'api/images')
  return response.data;
  }catch(error){
    throw error;

  }
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const goalService = {
  createCar,
  getCars,
  deleteGoal,
}

export default goalService;