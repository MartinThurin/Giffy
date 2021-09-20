import React from 'react'
import { useLocation } from "wouter"
import css from "./SearchForm.module.css"
import useForm from './hook'

const RATING = ['g', 'pg', 'pg-13', 'r']

export default function SearchForm({ 
    initialKeyword = "", 
    initialRating = 'g',
}) {
    const { keyword, rating, times, updateKeyword, updateRating} = useForm({
        initialKeyword,
        initialRating
    });

    const [, pushLocation] = useLocation()


    const handleSubmit = (event) => {
        event.preventDefault()
        // navergar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
    }

    const handleChange = (event) => {
        updateKeyword(event.target.value)
    }

    const handleChangeRating = (event) => {
        updateRating(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className={css["c-search"]}>
            <button className={css["c-search-btn"]}>Buscar</button>
            <input className={css["c-search-input"]} placeholder="Search a gif here..." onChange={handleChange} type='text' value={keyword} />
            <select onChange={handleChangeRating} value={rating}>
                <option disabled>Rating type</option>
                {RATING.map((rating) => <option key={rating}>{rating}</option>)}
            </select>
            <small>{times}</small>
        </form>
    )
}