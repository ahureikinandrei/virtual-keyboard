const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        textArea: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        value: "",
        capsLock: false,
        language: "english"
    },

    init(language) {
        this.elements.textArea = document.createElement("textarea");
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.textArea.classList.add("use-keyboard-input");
        this.elements.textArea.setAttribute("autofocus","");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        document.body.appendChild(this.elements.textArea);
        document.body.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.keysContainer.appendChild(this._createKeys(language));

        document.querySelector(".use-keyboard-input").addEventListener("input", (element) => { 
                this.properties.value = element.path[0].value;
                });
    },

    _removeMain() {
        this.elements.main.remove();
        this.elements.textArea.remove();
    },

    _createKeys(language) {
        const fragment = document.createDocumentFragment();
        if (language === 'russian') {
            keyLayout = ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace',
        'Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", 'Delete',
        'CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter',
        "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ShiftRt",
        "Control", "ln", "Alt", "Space", "Alt", "ln", "Control"
        ];
            
        } else {
            keyLayout = ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace',
        'Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", 'Delete',
        'CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter',
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ShiftRt",
        "Control", "ln", "Alt", "Space", "Alt", "ln", "Control"
        ];
        }
        
        keyLayout.forEach(key => { 
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Delete", "Enter", "ShiftRt"].indexOf(key) !== -1;
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.textContent = key;
            
            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.addEventListener("click", () => {
                        this.elements.textArea.value = this.properties.value.slice(0,- 1);
                        this.properties.value = this.elements.textArea.value;
                    });
                    break;
                case "Enter":
                    keyElement.classList.add("keyboard__key--wide");    
                    keyElement.addEventListener("click", () => {
                        this.elements.textArea.value += "\n";
                    });
                    break;
                case "Space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.addEventListener("click", () => {
                        this.elements.textArea.value += " ";
                    });
                    break;
                case "Control":
                    keyElement.classList.add("keyboard__key--wide");
                    break;
                case "CapsLock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    break;

                    case "ln":
                        keyElement.addEventListener("click", () => {
                            this.toggleLanguage()
                        });
                        break;

                default:
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.elements.textArea.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    });
                    break;                            
            }
        fragment.appendChild(keyElement);
        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
        });
        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    toggleLanguage() {
        if (this.properties.language == "english") {
        this._removeMain();
        this.init('russian');
        this.properties.language = "russian";
        this.elements.textArea.value = this.properties.value;
        } else {
        this._removeMain();
        this.init('english');
        this.properties.language = "english";
        this.elements.textArea.value = this.properties.value; 
        }
    },

    addEventListnerKeybord() {
        document.addEventListener('keydown', (event) => this._keyDownHendler(event));
        document.addEventListener('keyup', (event) => this._keyUpHendler(event));
    },

    _keyDownHendler(event) {
        event.preventDefault();
        let eventclick = new Event ("click");
        const keybordCharCods = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,
        8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70,
        71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 18, 32];
        let arrKeysKeyboard = [...document.querySelectorAll('.keyboard__key')];
        let indexKeyPresed = keybordCharCods.indexOf(event.keyCode);
        if (event.keyCode == 20) {arrKeysKeyboard[indexKeyPresed].classList.toggle('keyboard__key--active');
        arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventclick);}
        else {
        arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventclick);
        arrKeysKeyboard[indexKeyPresed].classList.add('keyboard__key--active');
        }
    },

    _keyUpHendler(event) {
        event.preventDefault();
        const keybordCharCods = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,
        8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70,
        71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 18, 32];
        let arrKeysKeyboard = [...document.querySelectorAll('.keyboard__key')];
        let indexKeyPresed = keybordCharCods.indexOf(event.keyCode);
        if (event.keyCode == 20) {}
        else {
        arrKeysKeyboard[indexKeyPresed].classList.remove('keyboard__key--active');}
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    Keyboard.addEventListnerKeybord();
});