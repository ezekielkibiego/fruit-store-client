import { useState, useEffect } from "react";
import { getFruits, createFruit, updateFruit, deleteFruit } from "../api/fruits";


export const useFruits = () => {
    const [fruits, setFruits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFruits = async () => {
        try {
            setLoading(true);
            const { data } = await getFruits();
            setFruits(data);
        } catch (err) {
            setError(err.message || "Failed to fetch fruits");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  
        fetchFruits();
    }, []);

    const addFruit = async (data) => {
        try {
            const { data: newFruit } = await createFruit(data);
            setFruits((prev) => [...prev, newFruit]);
        } catch (err) {
            setError(err.message || "Failed to add fruit");
        }
    };

    const editFruit = async (_id, data) => {
        try {
            const { data: updatedFruit } = await updateFruit(_id, data);
            setFruits((prev) => prev.map((fruit) => (fruit._id === _id ? updatedFruit : fruit)));
        } catch (err) {
            setError(err.message || "Failed to update fruit");
        }
    };

    const removeFruit = async (_id) => {
        try {
            await deleteFruit(_id);
            setFruits((prev) => prev.filter((fruit) => fruit._id !== _id));
        } catch (err) {
            setError(err.message || "Failed to delete fruit");
        }
    };

    return { fruits, loading, error, addFruit, editFruit, removeFruit };
}
