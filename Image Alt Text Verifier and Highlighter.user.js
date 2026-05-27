// ==UserScript==
// @name         iMathAS Image Alt Text Displayer & Highlighter
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  Displays image alt text as a tooltip (view by hovering with the mouse) by copying it to the title attribute for tooltips. This also adds a yellow shadow to images which are missing alt text to highlight them.
// @author       Gemini (in consultation with Kent Slack)
// @match        *://*/course/testquestion2.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Function to process images
    function checkAltText() {
        // Target only images that haven't been processed yet
        const images = document.querySelectorAll('img:not([data-alt-verified])');

        images.forEach(img => {
            const altText = img.getAttribute('alt');

            if (altText && altText.trim() !== '') {
                // If Alt Text exists, set it as the title attribute for the tooltip
                img.title = altText.trim();
            } else {
                // If Alt Text is missing or empty, apply a noticeable yellow glow
                img.style.boxShadow = '0 0 12px 6px rgba(255, 235, 59, 0.9)';
                img.style.outline = '2px solid #FFD700'; // Adds extra visibility on dark backgrounds
            }

            // Mark the image as processed so we don't waste resources re-checking it
            img.setAttribute('data-alt-verified', 'true');
        });
    }

    // Run immediately when the DOM is ready
    checkAltText();

    // Watch the page for dynamically loaded content/questions
    const observer = new MutationObserver((mutations) => {
        checkAltText();
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();