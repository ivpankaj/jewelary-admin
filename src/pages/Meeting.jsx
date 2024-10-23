import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/product/getall'); // Ensure this is the correct endpoint
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('quantity', data.quantity);

        // Append images if available
        images.forEach((image) => {
            formData.append('pictures', image);
        });

        try {
            if (editingProduct) {
                // Update product
                await axios.put(`http://localhost:5000/api/products/update/${editingProduct._id}`, formData);
                alert('Product updated successfully!');
            } else {
                // Create product
                await axios.post('http://localhost:5000/api/products/create', formData);
                alert('Product created successfully!');
            }
            reset();
            setImages([]);
            setEditingProduct(null);
            fetchProducts(); // Refresh product list
        } catch (error) {
            console.error('Error creating/updating product:', error);
            alert('Error creating/updating product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        reset(product); // Reset the form with product data
        setImages([]); // Clear images
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
                alert('Product deleted successfully!');
                fetchProducts(); // Refresh product list
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product');
            }
        }
    };

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setImages(selectedFiles);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: true })}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    placeholder="Description"
                    {...register('description')}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Price"
                    {...register('price', { required: true })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Category"
                    {...register('category', { required: true })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    {...register('quantity', { required: true })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 mb-2 w-full"
                />
                <div className="mb-2">
                    {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-full h-24 object-cover"
                                    onLoad={() => URL.revokeObjectURL(image)} // Clean up the URL object after use
                                />
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
            </form>

            <h2 className="text-xl font-bold mb-2">Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="border rounded-lg shadow-md p-4 flex flex-col">
                            <img
                                src={product.pictures.length > 0 ? product.pictures[0] : '/path/to/default/image.jpg'} // Default image path
                                alt={product.title}
                                className="w-full h-48 object-cover mb-2"
                            />
                            <h3 className="text-lg font-semibold">{product.title}</h3>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-xl font-bold">${product.price}</p>
                            <div className="mt-auto">
                                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-1 mx-1">Edit</button>
                                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-1 mx-1">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
