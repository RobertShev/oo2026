import React from 'react'
import { Star, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useStore } from "@/context/StoreContext"

const CART_STORAGE_KEY = "cart"

function EditProducts() {
  const { products, deleteProduct } = useStore()

  const removeProduct = async (id) => {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []
    const syncedCart = cart.filter((cartProduct) => String(cartProduct.id) !== String(id))
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(syncedCart))

    await deleteProduct(id)
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Edit products</h1>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="whitespace-normal break-all">
                  <Button onClick={() => removeProduct(product.id)} size="icon" variant="outline" aria-label="Submit">
                    <X />
                  </Button>
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell className="whitespace-normal break-words">{product.title}</TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell className="whitespace-normal break-words">{product.category}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center gap-1 whitespace-nowrap">
                    {product.rating?.rate ?? product.rating}
                    <Star className="h-4 w-4 text-primary" strokeWidth={2.25} />
                    ({product.rating?.count ?? product.count ?? 0})
                  </div>
                </TableCell>
                <TableCell className="whitespace-normal break-all">{product.image}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EditProducts