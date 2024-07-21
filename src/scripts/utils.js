function groupWordsByLineAndWrap(parentSelector) {
  const parentElements = document.querySelectorAll(parentSelector);

  parentElements.forEach((parentElement) => {
    const lineMap = new Map();

    // Group words by their line index
    const wordElements = parentElement.querySelectorAll(".word");
    wordElements.forEach((wordElement) => {
      const lineIndex = wordElement.style.getPropertyValue("--line-index");
      if (!lineMap.has(lineIndex)) {
        lineMap.set(lineIndex, []);
      }
      lineMap.get(lineIndex).push(wordElement);
    });

    // Clear the parent element to append new line elements
    parentElement.innerHTML = "";

    // Wrap each line's words in a .line span
    lineMap.forEach((words, index) => {
      const lineWrapper = document.createElement("span");
      lineWrapper.classList.add("line");
      words.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.classList.add("word-wrapper");
        wrapper.classList.add("inline-block");
        wrapper.classList.add("leading-tight");
        wrapper.style.overflow = "hidden";
        wrapper.appendChild(word);
        lineWrapper.appendChild(wrapper);

        // Add a space after each word-wrapper
        const space = document.createTextNode(" ");
        lineWrapper.appendChild(space);
      });
      parentElement.appendChild(lineWrapper);
    });
  });
}

export default groupWordsByLineAndWrap;
