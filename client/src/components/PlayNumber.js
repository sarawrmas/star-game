import React from 'react';
import { colors } from '../utils/helpers';

const PlayNumber = (props) => {
  const handleChange = () => {
    props.onClick(props.number, props.status)
  }
  return (
    <button
      className="number"
      style={{backgroundColor: colors[props.status]}}
      onClick={handleChange}
    >
      {props.number}
    </button>
  )
}

export default PlayNumber;