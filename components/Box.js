const Box = ({ children, classes, styles }) => {
  return (
    <div className={classes} style={styles}>
      {children}
    </div>
  );
};

export default Box;
