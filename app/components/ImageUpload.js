"use client"
import { useState } from "react"

export default function ImageUpload({ currentImage, onImageChange, type = "profile", className = "" }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Mostrar preview inmediatamente
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)

    setUploading(true)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/upload/${type}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${data.imageUrl}`
        setPreview(fullImageUrl)
        onImageChange(fullImageUrl)
      } else {
        alert("Error subiendo imagen: " + data.message)
        setPreview(currentImage) // Revertir preview
      }
    } catch (error) {
      alert("Error subiendo imagen")
      setPreview(currentImage) // Revertir preview
    }

    setUploading(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img src={preview || "/placeholder-image.jpg"} alt="Preview" className="w-full h-full object-cover" />
      </div>

      <label className="absolute bottom-2 right-2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full cursor-pointer transition-colors">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        {uploading ? "⏳" : "📷"}
      </label>

      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-white font-medium">Subiendo...</div>
        </div>
      )}
    </div>
  )
}
