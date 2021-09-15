import {useContext, useEffect, useState} from "react";
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs ({ keyword, rating } = {keyword: null}) {
    const [loading, setLoading] = useState(false)
    const [loadingNextPage, setLoadingoNextPage] = useState(false)
    const [page, setPage] = useState(INITIAL_PAGE)
    const {gifs, setGifs} = useContext(GifsContext)

    // recuperamos la keyword del localstorage
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

    useEffect(function () {
        setLoading(true)

        getGifs({ keyword: keywordToUse, rating })
            .then(gifs => {
                setGifs(gifs)
                setLoading(false)
                // guardamos la keyword en el localstorage
                localStorage.setItem('lastKeyword', keyword)
            })
    }, [keyword, keywordToUse, rating, setGifs])

    useEffect(function () {
        if (page === INITIAL_PAGE) return

        setLoadingoNextPage(true)

        getGifs({ keyword: keywordToUse, rating, page })
            .then(nextGifs => {
                setGifs(prevGifs => prevGifs.concat(nextGifs))
                setLoadingoNextPage(false)
            })
    }, [keywordToUse, rating, page, setGifs])

    return {loading,loadingNextPage, gifs, setPage}
}