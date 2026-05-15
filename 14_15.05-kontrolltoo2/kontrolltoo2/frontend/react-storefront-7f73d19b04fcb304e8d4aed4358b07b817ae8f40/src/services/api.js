const API_BASE_URL = import.meta.env.VITE_APP_API_URL

async function request(path, { method = 'GET', body, headers } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    let message = `${method} ${path} failed with ${response.status}`
    if (text) {
      try {
        const json = JSON.parse(text)
        message = json.message || text
      } catch {
        message = text
      }
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

export const productService = {
  getAll: () => request('/products'),
  getById: (id) => request(`/products/${id}`),
  create: (product) => request('/products', { method: 'POST', body: product }),
  update: (product) => request('/products', { method: 'PUT', body: product }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
}

export const categoryService = {
  getAll: () => request('/categories'),
  create: (category) => request('/categories', { method: 'POST', body: category }),
  update: (category) => request('/categories', { method: 'PUT', body: category }),
  delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
}
