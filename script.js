import { Stack } from './stack.js';  // Ensure stack.js is correctly imported

document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();  // Prevent copying/pasting
    }
};

onload = function() {
    const textbox = document.getElementById('comment');  // Text area for input
    const undo = document.getElementById('undo');  // Undo button
    const clear = document.getElementById('clear');  // Clear button
    const temptext = document.getElementById('temptext');  // Output container

    textbox.value = "";
    let text = "";
    let stack = new Stack();

    // Handle the cursor position
    textbox.onclick = function() {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };

    // Clear function
    clear.onclick = function() {
        stack.clear();
        text = "";
        textbox.value = "";
        temptext.innerHTML = "LIFO REAL WORLD EXAMPLE<br>First In (Bottom): None<br>Last In (Top): None<br>Current Stack: []";  // Reset output
    };

    // Update output and handle stack operations when typing
    textbox.oninput = function(event) {
        switch (event.inputType) {
            case "insertText":
                stack.push(0, event.data);  // Push the inserted character onto the stack
                break;
            case "deleteContentBackward":
                if (text.length > 0) {
                    stack.push(1, text[text.length - 1]);  // Push the deleted character onto the stack
                }
                break;
        }

        // Update output text
        let firstIn = stack.isEmpty() ? 'None' : stack.stack[0][1];  // First In (bottom of stack)
        let lastIn = stack.isEmpty() ? 'None' : stack.top()[1];  // Last In (top of stack)
        temptext.innerHTML = `LIFO REAL WORLD EXAMPLE<br>First In (Bottom): ${firstIn}<br>Last In (Top): ${lastIn}<br>Current Stack: ${JSON.stringify(stack.stack)}`;
        text = textbox.value;  // Keep track of the input text
    };

    // Undo function
    undo.onclick = function() {
        let operation = stack.pop();
        if (operation && operation[0] !== -1) {
            temptext.innerHTML = "UNDO Operation in progress...<br>" + temptext.innerHTML;

            if (operation[0] === 1) {  // Undo delete operation
                textbox.value += operation[1];
            } else if (operation[0] === 0) {  // Undo insert operation
                textbox.value = textbox.value.substring(0, textbox.value.length - operation[1].length);
            }

            // Update output after undo
            let firstIn = stack.isEmpty() ? 'None' : stack.stack[0][1];  // First In (bottom of stack)
            let lastIn = stack.isEmpty() ? 'None' : stack.top()[1];  // Last In (top of stack)
            temptext.innerHTML = `LIFO REAL WORLD EXAMPLE<br>First In (Bottom): ${firstIn}<br>Last In (Top): ${lastIn}<br>Current Stack: ${JSON.stringify(stack.stack)}`;
            text = textbox.value;  // Update the text
        }
    };
};
