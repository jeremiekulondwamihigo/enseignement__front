import React from 'react'

function AnneeScolaire(props) {

    const { data } = props

  return (
    <div>AnneeScolaire {data[0].denomination}</div>
  )
}

export default AnneeScolaire