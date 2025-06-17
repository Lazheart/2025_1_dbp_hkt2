import axios from 'axios';

// Link to deployed backend
const URL = "http://198.211.105.95:8080";

function saveToken(token) {
    localStorage.setItem('token', token);
    console.log(token);
}

function getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
}

// Auth endpoints
export const fetchLogin = async (body) => {
    const response = await axios.post(`${URL}/authentication/login`, body);
    saveToken(response.data.data.token);
    return response.data;
}

export const fetchRegister = async (body) => {
    const response = await axios.post(`${URL}/authentication/register`, body);
    return response.data;
}

// Expenses endpoints
export const fetchExpensesSummary = async () => {
    const response = await axios.get(`${URL}/expenses_summary`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

export const fetchExpensesDetail = async (year, month, categoryId) => {
    const response = await axios.get(`${URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

export const fetchCreateExpense = async (body) => {
    const response = await axios.post(`${URL}/expenses`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

export const fetchDeleteExpense = async (id) => {
    const response = await axios.delete(`${URL}/expenses/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

// Categories endpoint
export const fetchExpenseCategories = async () => {
    const response = await axios.get(`${URL}/expenses_category`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

// Goals endpoints
export const fetchGoals = async () => {
    const response = await axios.get(`${URL}/goals`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

export const fetchCreateGoal = async (body) => {
    const response = await axios.post(`${URL}/goals`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}

export const fetchUpdateGoal = async (id, body) => {
    const response = await axios.patch(`${URL}/goals/${id}`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return response.data;
}