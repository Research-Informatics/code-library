document.addEventListener("DOMContentLoaded", function () {
    const preBlocks = document.querySelectorAll("pre");

    preBlocks.forEach((block) => {
        // Create the copy button
        const button = document.createElement("button");
        button.innerText = "Copy";
        button.classList.add("copy-button"); // Add the button's class

        // Wrap the code block in a relative container
        const wrapper = document.createElement("div");
        wrapper.classList.add("code-container"); // Add the wrapper's class

        wrapper.appendChild(block.cloneNode(true)); // Add the <pre> block to the wrapper
        wrapper.appendChild(button); // Add the button to the wrapper

        // Replace the original <pre> block with the wrapper
        block.parentNode.replaceChild(wrapper, block);

        // Add the click event for the copy button
        button.addEventListener("click", function () {
            const text = block.textContent.trim(); // Copy only the text content of <pre>
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
