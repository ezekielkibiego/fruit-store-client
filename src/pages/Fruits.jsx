import React from 'react'
import API from '../api/axios'
import Loader from '../components/Loader'
import FruitCard from '../components/FruitCard'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFruits } from '../hooks/useFruits'

const EMPTY_FORM = {
    name: '',
    price: '',
    quantity: 0
}

export const Fruits = () => {
    const { isAdmin } = useAuth();
    const { fruits, loading, error, addFruit, editFruit, removeFruit } = useFruits();

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editing, setEditing] = useState(null);
    const [formError, setFormError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const openAdd = () => {
        setForm(EMPTY_FORM);
        setEditing(null);
        setFormError(null);
        setShowModal(true);
    };
    
    const openEdit = (fruit) => {
        setForm({ name: fruit.name, price: fruit.price, quantity: fruit.quantity });
        setEditing(fruit._id);
        setFormError(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm(EMPTY_FORM);
        setEditing(null);
        setFormError(null);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setFormError(null);
        try {
            if (editing) {
                await editFruit(editing, form);
            } else {
                await addFruit(form);
            }
            closeModal();
        } catch (err) {
            setFormError(err.message || "Failed to save fruit");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (_id) => {
        setDeleteConfirm(_id);
    };

    const confirmDelete = async () => {
        if (deleteConfirm) {
            await removeFruit(deleteConfirm);
            setDeleteConfirm(null);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Fruit Store</h1>
                    <p className="text-gray-600 text-lg mb-2">Welcome to our fruit store! Browse our selection of fresh fruits.</p>
                    <p className="text-sm font-semibold text-orange-600">{fruits.length} fruits available</p>
                </div>

                {isAdmin && (
                    <div className="text-center mb-8">
                        <button
                            onClick={openAdd}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            + Add New Fruit
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fruits.map((fruit) => (
                        <FruitCard key={fruit._id} fruit={fruit} onEdit={openEdit} onDelete={handleDelete} />
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {editing ? "Edit Fruit" : "Add New Fruit"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Fruit Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="e.g., Apple"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Price (Ksh)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="0.00"
                                        step="0.01"
                                        value={form.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="0"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
                                    />
                                </div>
                                {formError && (
                                    <div className="p-3 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
                                        {formError}
                                    </div>
                                )}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        {saving ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Fruit?</h3>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete this fruit? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

            
            

    
}
