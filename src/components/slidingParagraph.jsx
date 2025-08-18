import React from "react";

const SlidingParagraph = ({ characterArray, linesArray, currentLineIndex }) => {
  const startCharIndex = linesArray
    .slice(0, currentLineIndex)
    .join(" ")
    .length + (currentLineIndex > 0 ? 1 : 0);

  const endCharIndex = linesArray
    .slice(0, currentLineIndex + 3)
    .join(" ")
    .length;

  const visibleChars = characterArray.slice(startCharIndex, endCharIndex);

  return (
    <div className="sliding-container flex justify-center">
      <div
        className="sliding-wrapper"
        style={{
          transform: `translateY(-${currentLineIndex * 40}px)`, // line slide karegi
        }}
      >
        {linesArray.map((line, lineIndex) => {
          const start =
            linesArray.slice(0, lineIndex).join(" ").length +
            (lineIndex > 0 ? 1 : 0);
          const end = start + line.length;
          const lineChars = characterArray.slice(start, end);

          return (
            <p key={lineIndex} className="sliding-line text-center text-xl">
              {lineChars.map((item, index) => (
                <span
                  key={index + start}
                  className={
                    item.status === "correct"
                      ? "text-gray-100"
                      : item.status === "incorrect"
                        ? "text-red-500"
                        : "text-gray-500"
                  }
                >
                  {item.char}
                </span>
              ))}
            </p>
          );
        })}
      </div>
    </div>

  );
};

export default SlidingParagraph;
