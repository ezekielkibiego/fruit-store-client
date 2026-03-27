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
    if (error) return <div className='error-state'>Error: {error}</div>

    return (
        <main className='fruits-page'>
            <section className='fruits-hero'>
                <p className='hero-kicker'>Farm to Basket</p>
                <h2>Fresh Fruits</h2>
                <p>Discover the best selection of fresh fruits delivered straight to your doorstep.</p>
                <p className='hero-count'>{fruits.length} fruits available</p>
            </section>

            <div className="fruits-grid">
                {fruits.map((fruit) => (
                    <FruitCard key={fruit._id} fruit={fruit} />
                ))}
            </div>
        </main>
    )
}
