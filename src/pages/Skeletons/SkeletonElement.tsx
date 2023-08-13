import React from 'react'
import "./Skeleton.css"

const SkeletonElement = () => {
  const classes = `skeleton skeleton-text`;
  return (
    <div className={classes}></div>
  )
}

export default SkeletonElement