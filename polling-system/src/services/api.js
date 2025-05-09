// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitPollResponses = async (responses) => {
  try {
    const response = await fetch(`${API_URL}/poll/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit poll responses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting poll:', error);
    throw error;
  }
};

export const fetchPollResults = async () => {
  try {
    const response = await fetch(`${API_URL}/poll/results`);

    if (!response.ok) {
      throw new Error('Failed to fetch poll results');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching poll results:', error);
    throw error;
  }
};

export const fetchPollStats = async () => {
  try {
    const response = await fetch(`${API_URL}/poll/stats`);

    if (!response.ok) {
      throw new Error('Failed to fetch poll stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching poll stats:', error);
    throw error;
  }
};