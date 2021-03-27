import React from 'react'

const Box = ({ children, classes, styles, ...props }) => {
  return (
    <div className={classes} style={styles} {...props}>
      {children}
    </div>
  )
}

export default Box
