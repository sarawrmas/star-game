import React from 'react';
import { mathOp } from '../utils/helpers';

const StarsDisplay = (props) => (
  <>
    {mathOp.range(1, props.count).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
)

export default StarsDisplay;