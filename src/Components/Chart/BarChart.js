import React from 'react'
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts"

function BarCharts({
    data,
    title,
    cle,
    largeur,
    hauteur
}) {

    return (
        <BarChart width={largeur}
            height={hauteur}
            data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={
                `${title}`
            }/>
            <YAxis/>
            <Tooltip/>

            <Bar dataKey={
                    `${cle}`
                }
                fill="#82ca9d"/>
        </BarChart>

    )
}

export default BarCharts
