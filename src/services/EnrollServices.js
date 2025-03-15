import axios from './customizeAxios';

// Fetch the most enrolled course
const apiGetMostEnrolledCourse = async () => {
  try {
    const response = await axios.get('/enrollment/most-enrolled');
    console.log('Most Enrolled Course Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching most enrolled course:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Enroll in a course
const apiEnrollCourse = async (id) => {
  try {
    const response = await axios.post(`/enrollment/enroll/${id}`);
    console.log('Enroll Course Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Unenroll from a course
const apiUnenrollCourse = async (id) => {
  try {
    const response = await axios.delete(`/enrollment/unenroll/${id}`); // Fixed typo
    console.log('Unenroll Course Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Fetch enrolled courses
const apiGetEnrolledCourse = async () => {
  try {
    const response = await axios.get('/enrollment/courses');
    console.log('Enrolled Courses Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export { apiGetMostEnrolledCourse, apiEnrollCourse, apiUnenrollCourse, apiGetEnrolledCourse };