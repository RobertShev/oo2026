import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Check, TriangleAlert } from "lucide-react"
import { useStore } from "@/context/StoreContext"

const INITIAL_PRODUCT = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
}

function AddProduct() {
  const { categories, addProduct } = useStore()
  const [product, setProduct] = useState(INITIAL_PRODUCT)

  const updateField = (key, value) => {
    setProduct((previousProduct) => ({
      ...previousProduct,
      [key]: value,
    }))
  }

  const submitProduct = async () => {
    const payload = {
      title: product.title,
      price: Number(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
    }

    await addProduct(payload)
    setProduct(INITIAL_PRODUCT)
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Add product</h1>
      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm">Title</label>
          <Input 
            required 
            value={product.title} 
            onChange={(event) => updateField("title", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Price</label>
          <Input 
            type="number"
            min="0"
            step="0.01"
            required 
            value={product.price}
            onChange={(event) => updateField("price", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Description</label>
          <Textarea
            required
            value={product.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Category</label>
          <Select
            value={product.category}
            onValueChange={(value) => updateField("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm">Image URL</label>
          <Input 
            required 
            value={product.image}
            onChange={(event) => updateField("image", event.target.value)}
          />
        </div>

        <Button
          type="button"
          onClick={async () => {
            try {
              await submitProduct()
              toast("Product has been added.", {
                icon: <Check className="h-4 w-4" />,
              })
            } catch (err) {
              toast(err.message || "Failed to add product.", {
                icon: <TriangleAlert className="h-4 w-4" />,
              })
            }
          }}
        >
          Add Product
        </Button>
      </form>
      <Toaster position="top-center" />
    </div>
  )
}

export default AddProduct