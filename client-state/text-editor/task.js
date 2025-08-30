const editor = document.getElementById('editor');
const clearButton = document.getElementById('clear-btn');

function saveText() {
    localStorage.setItem('editorContent', editor.value);
}

function loadText() {
    const saved = localStorage.getItem('editorContent');
    if (saved) {
        editor.value = saved;
    }
}

function clearText() {
    editor.value = '';
    localStorage.removeItem('editorContent');
}

loadText();

editor.addEventListener('input', saveText);

clearButton.addEventListener('click', clearText);