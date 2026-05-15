import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { ArrowDown, ArrowUp, Check, ShoppingBag } from "lucide-react"
import { Link } from 'react-router-dom'
import { useStore } from '@/context/StoreContext'

function Home() {
  const {
    productsPage,
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
  } = useStore()

  const { content, totalPages, totalElements } = productsPage
  const isFirst = page <= 0
  const isLast = page >= totalPages - 1 || totalPages === 0

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">React Storefront</h1>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setSort("title,asc")} variant={sort === "title,asc" ? "default" : "outline"}>A-Z</Button>
        <Button onClick={() => setSort("title,desc")} variant={sort === "title,desc" ? "default" : "outline"}>Z-A</Button>
        <Button onClick={() => setSort("price,asc")} variant={sort === "price,asc" ? "default" : "outline"}>Price <ArrowUp /></Button>
        <Button onClick={() => setSort("price,desc")} variant={sort === "price,desc" ? "default" : "outline"}>Price <ArrowDown /></Button>
        <Button onClick={() => setSort(null)} variant="outline">Clear sort</Button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="page-size">Page size</label>
        <select id="page-size" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div>{totalElements} items currently in stock.</div>

      {content.map((product, index) =>
        <div key={product.id} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
          <div className="text-right">{page * pageSize + index + 1}.</div>
          <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />
          <div className="min-w-0">
            <div>{product.title}</div>
            <div>{product.price}€</div>
          </div>
          <div className="justify-self-end flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/product/${product.id}`}>
                View product
              </Link>
            </Button>
            <Button size="icon"
              onClick={() => {
                addToCart(product)
                toast("Product has been added to the cart.", {
                  icon: <Check className="h-4 w-4" />,
                })
              }}
            >
              <ShoppingBag />
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => setPage(page - 1)} disabled={isFirst}>Previous</Button>
        <span className="text-sm">Page {totalPages === 0 ? 0 : page + 1} of {totalPages}</span>
        <Button variant="outline" onClick={() => setPage(page + 1)} disabled={isLast}>Next</Button>
      </div>

      <Toaster position="top-center" />
    </div>
  )
}

export default Home
