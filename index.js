const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('id-depressed'))
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKey = 'number'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' && previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0'
            }
            calculator.dataset.previousKey = 'decimal'
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
    if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }
})

const calculate = (num1, operator, num2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(num1) + parseFloat(num2)
    } else if (operator === 'subtract') {
        result = parseFloat(num1) - parseFloat(num2)
    } else if (operator === 'multiply') {
        result = parseFloat(num1) * parseFloat(num2)
    } else if (operator === 'divide') {
        result = parseFloat(num1) / parseFloat(num2)
    }

    return result
}