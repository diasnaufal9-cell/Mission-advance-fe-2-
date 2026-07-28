import axios from 'axios';

const API_URL = 'https://be-video-belajar-production.up.railway.app/api/courses';
export const getCourses = async () => {
    const response = await axios.get(API_URL);
    return response.data.data || [];
};
export const addCourse = async (courseData) => {
    const response = await axios.post(API_URL, courseData);
    return response.data.data || response.data;
};
export const editCourse = async (id, courseData) => {
    const response = await axios.put(`${API_URL}/${id}`, courseData);
    return response.data.data || response.data;
};
export const deleteCourse = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data || id;
};