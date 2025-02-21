import React, { useMemo } from 'react';

const TitleWrapper = ({ title, firstLine, secondLine, thirdLine }) => {
  const renderText = useMemo(() => (text) => {
    if (!text) return null;
    return text.split(/<br\s*\/?>|\n/).map((line, index) => (
      <div key={index} className="text-[#575757] font-light text-sm">
        {line}
      </div>
    ));
  }, []); 

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-normal mb-2">{title}</h2>
      {firstLine && <>{renderText(firstLine)}</>}
      {secondLine && <div className="text-[#575757] font-light text-sm">{secondLine}</div>}
      {thirdLine && <div className="text-[#575757] font-light text-sm">{thirdLine}</div>}
    </div>
  );
};

export default TitleWrapper;
