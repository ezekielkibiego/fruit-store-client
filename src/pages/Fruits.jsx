import React from 'react'
import API from '../api/axios'
import Loader from '../components/Loader'
import FruitCard from '../components/FruitCard'
import { useState, useEffect } from 'react'

export const Fruits = () => {
    const [fruits, setFruits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFruits = async () => {
            try {
                const response = await API.get('/api/fruits')
                setFruits(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchFruits()
    }, [])

    if (loading) return <Loader />
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h2>Fresh Fruits</h2>
            <p>Discover the best selection of fresh fruits delivered straight to your doorstep.</p>
            <p >{fruits.length} fruits available</p>
            <div className="fruits-grid">
                {fruits.map((fruit) => (
                    <FruitCard key={fruit._id} fruit={fruit} />
                ))}
            </div>
        </div>
    )
}
