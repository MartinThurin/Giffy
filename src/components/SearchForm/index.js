import React, { useReducer } from 'react'
import { useLocation } from "wouter"
import css from "./SearchForm.module.css"

const RATING = ['g', 'pg', 'pg-13', 'r']

const ACTIONS = {
    UPDATE_KEYWORD: 'update_keyword',
    UPDATE_RATING: 'update_rating'
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_KEYWORD:
            return {
                ...state,
                keyword: action.payload,
                times: state.times + 1
            } 
        
        case ACTIONS.UPDATE_RATING:
            return {
                ...state,
                rating: action.payload
            }
    
        default:
            return state
    }
}


export default function SearchForm({ initialKeyword = '', initialRating = 'g'}) {
    //const [rating, setRating] = useState(initialRating)

    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        rating: initialRating,
        times: 0
    })

    const {keyword, rating, times} = state

    const [, pushLocation] = useLocation()


    const handleSubmit = (event) => {
        event.preventDefault()
        // navergar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`)
    }

    const handleChange = (event) => {
        dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: event.target.value })
    }

    const handleChangeRating = (event) => {
        dispatch({type: ACTIONS.UPDATE_RATING, payload: event.target.value })
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