import React from 'react';
import { Link } from 'wouter';

import "./style.css";

export default function category({ name, options = [] }) {
    return (
        <div className='Category'>
            <h3 className="Category-title">{name}</h3>
            <ul className="Category-list">
                {options.map((singleOptions) => (
                    <li key={singleOptions}>
                        <Link className="Category-link" to={`/search/${singleOptions}`}>
                            {singleOptions}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}