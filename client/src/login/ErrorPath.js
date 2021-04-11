import React from "react"
import { Link } from 'react-router-dom'

export const ErrorPath = () => {
    return <>
    <h1>Invalid path</h1>
    <Link to='/' className='btn'>
        Back Home
    </Link>
    </>
};