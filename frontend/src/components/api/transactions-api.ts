
export const fetchTransactions = async (token: string) => {
  const response = await fetch(`http://localhost:3000/transactions`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch transactions.');
  }
  return response.json();
};
