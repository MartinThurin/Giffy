import React, { useReducer, useState } from 'react'
import { useLocation } from "wouter"
import css from "./SearchForm.module.css"

const RATING = ['g', 'pg', 'pg-13', 'r']

const reducer = (state, param) => {
    return {
        ...state,
        keyword: param,
        times: state.times + 1
    }
}


export default function SearchForm({ initialKeyword = '', initialRating = 'g'}) {
    const [rating, setRating] = useState(initialRating)

    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        times: 0
    })

    const {keyword, times} = state

    const [, pushLocation] = useLocation()

    const updateKeyword = (keyword) => {
        dispatch(keyword)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        // navergar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
    }

    const handleChange = (event) => {
        updateKeyword(event.target.value)
    }

    const handleChangeRating = (event) => {
        setRating(event.target.value)
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