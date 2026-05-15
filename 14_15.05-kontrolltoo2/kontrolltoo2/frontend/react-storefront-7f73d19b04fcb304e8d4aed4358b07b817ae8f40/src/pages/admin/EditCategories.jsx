import React from 'react'
import { X } from "lucide-react"

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

function EditCategories() {
  const { categories, deleteCategory } = useStore()

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Edit categories</h1>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Date created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="whitespace-normal break-all">
                  <Button
                    onClick={() => deleteCategory(category.id)}
                    size="icon"
                    variant="outline"
                    aria-label="Submit"
                  >
                    <X />
                  </Button>
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell className="whitespace-normal break-words">
                  {category.name}
                </TableCell>
                <TableCell>{category.image}</TableCell>
                <TableCell className="whitespace-normal break-words">
                  {category.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

  )
}

export default EditCategories
