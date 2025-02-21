import { useMemo } from "react";
import PropTypes from "prop-types";
import AllIcons from "./AllIcons";

const IconRenderer = ({ iconName, size }) => {
  
  const IconComponent = useMemo(() => AllIcons[iconName], [iconName]);

  if (!IconComponent) return null;

  return <IconComponent size={size} />;
};


IconRenderer.defaultProps = {
  size: 24,
};

IconRenderer.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default IconRenderer;
