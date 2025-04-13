const API_URL = 'https://react-fast-pizza-api.jonas.io/api';

async function handleFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}/${endpoint}`, options);

  if (!res.ok) {
    const errorMessage = options.errorMessage || 'Something went wrong';
    throw new Error(errorMessage);
  }

  const { data } = await res.json();
  return data;
}

export async function getMenu() {
  return handleFetch('menu', { errorMessage: 'Failed getting menu' });
}

export async function getOrder(id) {
  return handleFetch(`order/${id}`, {
    errorMessage: `Couldn't find order #${id}`,
  });
}

export async function createOrder(newOrder) {
  try {
    return await handleFetch('order', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
      errorMessage: 'Failed creating your order',
    });
  } catch (error) {
    throw new Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    await handleFetch(`order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
      errorMessage: 'Failed updating your order',
    });
  } catch (error) {
    throw new Error('Failed updating your order');
  }
}
