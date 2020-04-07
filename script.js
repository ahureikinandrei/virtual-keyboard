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
        shift: false,
        ctrl: false,
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
        } 
        else if (language === 'russianShift'){
            keyLayout = ['Ё', '!', "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace',
        'Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", 'Delete',
        'CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", 'Enter',
        "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ShiftRt",
        "Control", "ln", "Alt", "Space", "Alt", "ln", "Control"
        ];
        }
        else if (language === 'englishShift') {
            keyLayout = ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace',
        'Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", 'Delete',
        'CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", 'Enter',
        "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "ShiftRt",
        "Control", "ln", "Alt", "Space", "Alt", "ln", "Control"
        ];
        }
        // if (language === 'english')
        else{
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
                case "Tab":
                    keyElement.addEventListener("click", () => {
                        this.elements.textArea.value += "   ";
                    });
                    break;
                case "Delete":
                    keyElement.addEventListener("click", () => {
                        this.elements.textArea.value = this.properties.value.slice(0,- 1);
                        this.properties.value = this.elements.textArea.value;
                    });
                    break;
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
                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.addEventListener("mousedown", () => {
                        this. _toggleShift();
                        this.toggleLanguage();
                    });
                    keyElement.addEventListener("mouseup", () => {
                        this. _toggleShift();
                        this.toggleLanguage();
                    });
                    break;
                case "ShiftRt":
                    keyElement.classList.add("keyboard__key--wide");    
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
                case "Alt":
                    keyElement.classList.add("keyboard__key--wide");
                    break;
                case "ln":
                        keyElement.addEventListener("click", () => {
                            this.toggleLanguage();
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
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
    },

    toggleLanguage() {
        if (this.properties.language == "english" && !this.properties.shift) {
        this._removeMain();
        this.init('russian');
        this.properties.language = "russian";
        this.elements.textArea.value = this.properties.value;
        } else if(this.properties.language == "russian" && !this.properties.shift) {
        this._removeMain();
        this.init('english');
        this.properties.language = "english";
        this.elements.textArea.value = this.properties.value; 
        }
        else if (this.properties.language == "english" && this.properties.shift){
        this._removeMain();
        this.init('englishShift');
        this.properties.language = "russian";
        this.elements.textArea.value = this.properties.value;
        }
        else if (this.properties.language == "russian" && this.properties.shift){
        this._removeMain();
        this.init('russianShift');
        this.properties.language = "russian";
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
        let eventmousedown = new Event ("mousedown");
        const keybordCharCods = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,
        8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70,
        71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 0, 18, 32];
        let arrKeysKeyboard = [...document.querySelectorAll('.keyboard__key')];
        let indexKeyPresed = keybordCharCods.indexOf(event.keyCode);
        if (event.keyCode == 20) {arrKeysKeyboard[indexKeyPresed].classList.toggle('keyboard__key--active');
        arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventclick);}
        else if (indexKeyPresed == -1) {}
        else if (event.keyCode == 16) { if (event.repeat) {} else {
            arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventmousedown);
            arrKeysKeyboard[indexKeyPresed].classList.add('keyboard__key--active');}
        }
        else if (event.keyCode == 17) {this.properties.ctrl = true;}
        else if (event.keyCode == 18) { (this.properties.ctrl == true) ? this.toggleLanguage(): this.properties.ctrl = true;}
        else {
        arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventclick);
        arrKeysKeyboard[indexKeyPresed].classList.add('keyboard__key--active');
        }
    },

    _keyUpHendler(event) {
        event.preventDefault();
        let eventmouseup = new Event ("mouseup");
        const keybordCharCods = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,
        8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46, 20, 65, 83, 68, 70,
        71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 17, 0, 18, 32];
        let arrKeysKeyboard = [...document.querySelectorAll('.keyboard__key')];
        let indexKeyPresed = keybordCharCods.indexOf(event.keyCode);
        if (event.keyCode == 20) {}
        else if (indexKeyPresed == -1) {}
        else if (event.keyCode == 16) {
            arrKeysKeyboard[indexKeyPresed].dispatchEvent(eventmouseup);
            arrKeysKeyboard[indexKeyPresed].classList.add('keyboard__key--active');   
        }
        else if (event.keyCode == 17) {this.properties.ctrl = false;}
        else {
        arrKeysKeyboard[indexKeyPresed].classList.remove('keyboard__key--active');}
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    Keyboard.addEventListnerKeybord();
});