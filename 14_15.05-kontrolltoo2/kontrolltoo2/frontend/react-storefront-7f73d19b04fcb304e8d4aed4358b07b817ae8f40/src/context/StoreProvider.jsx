import { useCallback, useEffect, useState } from 'react'
import { productService, categoryService, postService } from '../services/api'
import { StoreContext } from './StoreContext'

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([])
  const [productsPage, setProductsPage] = useState({ content: [], totalPages: 0, totalElements: 0 })
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [page, setPageState] = useState(0)
  const [pageSize, setPageSizeState] = useState(2)
  const [sort, setSortState] = useState(null)

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

  const fetchProductsPage = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await productService.getPage({ page, size: pageSize, sort })
      setProductsPage({
        content: data.content || [],
        totalPages: data.totalPages || 0,
        totalElements: data.totalElements || 0,
      })
    } catch (err) {
      console.error('Error fetching products page:', err)
      setError('Failed to load products.')
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, sort])

  const fetchCategories = useCallback(async () => {
    setError(null)
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('Failed to load categories.')
    }
  }, [])

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await postService.getAll()
      setPosts(data)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts.')
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
      await Promise.all([fetchProducts(), fetchProductsPage()])
    } catch (err) {
      console.error('Error adding product:', err)
      setError(err.message || 'Failed to add product.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [fetchProducts, fetchProductsPage])

  const deleteProduct = useCallback(async (id) => {
    setError(null)
    try {
      await productService.delete(id)
      await Promise.all([fetchProducts(), fetchProductsPage()])
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('Failed to delete product.')
    }
  }, [fetchProducts, fetchProductsPage])

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

  const setPage = useCallback((nextPage) => setPageState(nextPage), [])

  const setPageSize = useCallback((size) => {
    setPageSizeState(size)
    setPageState(0)
  }, [])

  const setSort = useCallback((nextSort) => {
    setSortState(nextSort)
    setPageState(0)
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  useEffect(() => {
    fetchProductsPage()
  }, [fetchProductsPage])

  return (
    <StoreContext.Provider value={{
      products,
      productsPage,
      categories,
      posts,
      isLoading,
      error,
      page,
      pageSize,
      sort,
      clearError,
      fetchProducts,
      fetchProductsPage,
      fetchCategories,
      fetchPosts,
      fetchProduct,
      addProduct,
      deleteProduct,
      deleteCategory,
      setPage,
      setPageSize,
      setSort,
    }}>
      {children}
    </StoreContext.Provider>
  )
}
