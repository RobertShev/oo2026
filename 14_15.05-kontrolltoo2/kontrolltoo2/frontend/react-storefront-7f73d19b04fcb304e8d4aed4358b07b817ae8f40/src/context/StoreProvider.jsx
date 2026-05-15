import { useCallback, useEffect, useState } from 'react'
import { productService, categoryService } from '../services/api'
import { StoreContext } from './StoreContext'

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const clearError = useCallback(() => setError(null), [])

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('Failed to load categories.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchProduct = useCallback(async (id) => {
    try {
      return await productService.getById(id)
    } catch (err) {
      console.error('Error fetching product:', err)
      return null
    }
  }, [])

  const addProduct = useCallback(async (product) => {
    setIsLoading(true)
    setError(null)
    try {
      await productService.create(product)
      await fetchProducts()
    } catch (err) {
      console.error('Error adding product:', err)
      setError('Failed to add product.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [fetchProducts])

  const deleteProduct = useCallback(async (id) => {
    setError(null)
    try {
      await productService.delete(id)
      await fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('Failed to delete product.')
    }
  }, [fetchProducts])

  const deleteCategory = useCallback(async (id) => {
    setError(null)
    try {
      await categoryService.delete(id)
      await fetchCategories()
    } catch (err) {
      console.error('Error deleting category:', err)
      setError('Failed to delete category.')
    }
  }, [fetchCategories])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      isLoading,
      error,
      clearError,
      fetchProducts,
      fetchCategories,
      fetchProduct,
      addProduct,
      deleteProduct,
      deleteCategory,
    }}>
      {children}
    </StoreContext.Provider>
  )
}
