console.log("Copy script loaded and running!");


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
        button.style.background = "#007bff";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.borderRadius = "4px";

        // Wrap the code block in a relative container
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.marginBottom = "20px";

        wrapper.appendChild(block.cloneNode(true));
        wrapper.appendChild(button);

        // Replace the original <pre> block with the wrapper
        block.parentNode.replaceChild(wrapper, block);

        // Add the click event for the copy button
        button.addEventListener("click", function () {
            const text = block.innerText;
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
