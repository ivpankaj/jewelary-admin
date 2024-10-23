import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TrashIcon, CheckCircleIcon, ClockIcon, PencilIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import Popup from './Popup';
import PopupMessage from './PopupMessage';

const Banners = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [offer, setOffer] = useState('');
    const [discount, setDiscount] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [banners, setBanners] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBanners, setFilteredBanners] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loader, setLoader] = useState(true);
    const [editingBannerId, setEditingBannerId] = useState(null);

    const formRef = useRef(null);

    const fetchBanners = async () => {
        try {
            const response = await axios.get('user/allbanners');
            setBanners(response.data.data);
            setFilteredBanners(response.data.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    useEffect(() => {
        const results = banners.filter(banner =>
            banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            banner.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBanners(results);
    }, [searchTerm, banners]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setErrorMessage('Please upload an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('offer', offer);
        formData.append('discount', discount);
        formData.append('type', type);
        formData.append('pictures', image);

        try {
            if (editingBannerId) {
                await axios.put(`user/admin/update/${editingBannerId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage('Banner updated successfully.');
            } else {
                await axios.post('user/admin/createBanner', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage('Banner created successfully.');
            }

            fetchBanners();
            resetForm();
        } catch (error) {
            setErrorMessage('Failed to save banner. Please try again.');
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setOffer('');
        setDiscount('');
        setType('');
        setImage(null);
        setErrorMessage('');
        setEditingBannerId(null);
    };

    const confirmDelete = (id) => {
        setConfirmAction(() => () => handleDelete(id));
        setShowPopup(true);
    };

    const handleDelete = async (id) => {
        setLoader(true);
        try {
            await axios.delete(`user/admin/banner/delete/${id}`);
            fetchBanners();
        } catch (error) {
            console.error('Error deleting banner:', error);
        } finally {
            setLoader(false);
        }
    };

    const handleEdit = (banner) => {
        setTitle(banner.title);
        setContent(banner.content);
        setOffer(banner.offer);
        setDiscount(banner.discount);
        setType(banner.type);
        setImage(null);
        setEditingBannerId(banner._id);
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-6 bg-gray-100">
            <div ref={formRef} className="max-w-6xl shadow-lg rounded-lg p-6 bg-white flex flex-col gap-6 justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                        {editingBannerId ? 'Edit Banner' : 'Create New Banner'}
                    </h2>

                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                Title
                            </label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none" placeholder="Enter banner title" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                                Content
                            </label>
                            <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none" placeholder="Enter banner content" required />
                        </div>

                        <div className="mb-4 flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="offer" className="block text-gray-700 font-semibold mb-2">
                                    Offer
                                </label>
                                <input type="text" id="offer" value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none" placeholder="Enter offer" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="discount" className="block text-gray-700 font-semibold mb-2">
                                    Discount (%)
                                </label>
                                <input type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none" placeholder="Enter discount" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
                                Type
                            </label>
                            <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none" placeholder="Enter banner type" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                                Upload Image
                            </label>
                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="w-full p-3 border rounded-lg focus:outline-none" required={!editingBannerId} />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        >
                            {editingBannerId ? 'Update Banner' : 'Create Banner'}
                        </button>
                    </form>
                </div>
                <div className="w-full mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">All Banners</h3>

                    <input
                        type="text"
                        placeholder="Search banners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-90 overflow-y-auto">
                        {filteredBanners.map((banner, index) => (
                            <motion.div
                                key={banner._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex flex-col"
                            >
                                <h4 className="text-lg font-semibold">{banner.title}</h4>
                                <p className="mb-2">{banner.content}</p>
                                <img src={banner.imageUrl} alt={banner.title} className="mb-2 h-32 w-full object-cover rounded-lg" />
                                <div className="flex justify-between">
                                    <button onClick={() => handleEdit(banner)} className="text-blue-600 hover:underline flex items-center">
                                        <PencilIcon className="h-5 w-5 mr-1" /> Edit
                                    </button>
                                    <button onClick={() => confirmDelete(banner._id)} className="text-red-600 hover:underline flex items-center">
                                        <TrashIcon className="h-5 w-5 mr-1" /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            {showPopup && (
                <PopupMessage
                    onClose={() => setShowPopup(false)}
                    title="Confirm Delete"
                    message="Are you sure you want to delete this banner?"
                    onConfirm={() => {
                        if (confirmAction) confirmAction();
                        setShowPopup(false);
                    }}
                    onCancel={() => setShowPopup(false)}
                />
            )}

            {successMessage && (
                <Popup message={successMessage} onClose={() => setSuccessMessage('')} />
            )}

        </div>
    );
};

export default Banners;