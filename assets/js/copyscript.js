document.addEventListener("DOMContentLoaded", function () {
    const preBlocks = document.querySelectorAll("pre");

    preBlocks.forEach((block) => {
        // Create the copy button
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.style.position = "absolute";
        button.style.top = "5px";
        button.style.right = "5px";
        button.style.padding = "5px 10px";
        button.style.backgroundColor = "#EBAB21"; /* Theme yellow */
        button.style.color = "#fff"; /* White font */
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.borderRadius = "4px";

        // Add hover effect using event listeners
        button.addEventListener("mouseover", function () {
            button.style.backgroundColor = "#FFD75C"; /* Lighter yellow on hover */
            button.style.color = "#553178"; /* Darker font (purple theme color) */
        });
        button.addEventListener("mouseout", function () {
            button.style.backgroundColor = "#EBAB21"; /* Original yellow */
            button.style.color = "#fff"; /* Original white font */
        });

        // Wrap the code block in a relative container
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative"; // Ensure the button is positioned relative to this block
        wrapper.style.display = "inline-block";
        wrapper.style.marginBottom = "20px";

        wrapper.appendChild(block.cloneNode(true));
        wrapper.appendChild(button);

        // Replace the original <pre> block with the wrapper
        block.parentNode.replaceChild(wrapper, block);

        // Add the click event for the copy button
        button.addEventListener("click", function () {
            // Copy only the text content of the <pre> block
            const text = block.textContent.trim(); // Ensure clean text
            navigator.clipboard.writeText(text).then(
                () => {
                    button.innerText = "Copied!";
                    setTimeout(() => (button.innerText = "Copy"), 2000);
                },
                () => {
                    button.innerText = "Failed!";
                    setTimeout(() => (button.innerText = "Copy"), 2000);
                }
            );
        });
    });
});
