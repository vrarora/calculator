class Calculator {
    constructor(existOperandTextElement, ongoOperandTextElement){
        this.existOperandTextElement = existOperandTextElement
        this.ongoOperandTextElement = ongoOperandTextElement
        this.clear();
    }

    clear () {
        this.existOperand = '';
        this.ongoOperand = '';
        this.operation = undefined;

    }

    delete () {
        this.ongoOperand = this.ongoOperand.toString().slice(0,-1);

    }

    appendNum(number) {
        if(number === '.' && this.ongoOperand.includes('.')) return
        this.ongoOperand = this.ongoOperand.toString() + number.toString()

    }

    chooseOperation(operation) {
        if(this.ongoOperand ==='') return
        if(this.existOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.existOperand = this.ongoOperand;
        this.ongoOperand = '';

    }

    compute() {
        let computation
        const prev = parseFloat(this.existOperand)
        const current = parseFloat(this.ongoOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }
        this.ongoOperand = computation;
        this.operation = undefined;
        this.existOperand = '';

    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const integerDigs = parseFloat(stringNum.split('.')[0])
        const deciDigs = stringNum.split('.')[1]
        let intDisplay
        if(isNaN(integerDigs)) {
            intDisplay = ''
        } else {
            intDisplay = integerDigs.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(deciDigs != null) {
            return `${intDisplay}.${deciDigs}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.ongoOperandTextElement.innerText = this.getDisplayNumber(this.ongoOperand)
        if(this.operation != null) {
            this.existOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.existOperand)} ${this.operation}`;
        } else {
            this.existOperandTextElement.innerText = ''
        }
        

    }
}


const numButs = document.querySelectorAll('[data-number]');
const operateButs = document.querySelectorAll('[data-operation]');
const equalsBut = document.querySelector('[data-equals]')
const delBut = document.querySelector('[data-delete]');
const allClearBut = document.querySelector('[data-all-clear]')
const existOperandTextElement = document.querySelector('[data-existing-operand]');
const ongoOperandTextElement = document.querySelector('[data-ongoing-operand]');

const calculator = new Calculator(existOperandTextElement, ongoOperandTextElement)

numButs.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    });
});

operateButs.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    });
});

equalsBut.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBut.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
delBut.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})