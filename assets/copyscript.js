document.addEventListener("DOMContentLoaded", function () {
    // Find all <pre> blocks
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((block, index) => {
        // Create the copy button
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.style.position = "absolute";
        button.style.top = "5px";
        button.style.right = "5px";
        button.style.zIndex = "10";

        // Style the button (you can customize this)
        button.style.padding = "5px 10px";
        button.style.background = "#007bff";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.fontSize = "0.8rem";
        button.style.borderRadius = "4px";

        // Wrap the code block in a relative container
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.appendChild(block);
        wrapper.appendChild(button);

        // Replace the original <pre> with the wrapper
        block.parentNode.replaceChild(wrapper, block);

        // Add click event for the copy button
        button.addEventListener("click", function () {
            const text = block.innerText;
            navigator.clipboard.writeText(text).then(
                () => {
                    button.innerText = "Copied!";
                    setTimeout(() => (button.innerText = "Copy"), 2000);
                },
                () => {
                    button.innerText = "Failed";
                    setTimeout(() => (button.innerText = "Copy"), 2000);
                }
            );
        });
    });
});
