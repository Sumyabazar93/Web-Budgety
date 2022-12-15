var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: ".add__btn"
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();

var financeController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var i1 = new Income(1, 'Money', 12345678);

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }
    data.allItems.inc.push(i1);
    console.log(data.allItems.inc[0]);
})();

var appController = (function (uiController, financeController) {
    var DOM = uiController.getDOMstrings();

    var ctrlAddItem = function () {
        console.log('Delgetsnees ugugdul avah heseg');
        console.log(uiController.getInput());
    }
    document.querySelector(DOM.addBtn).addEventListener('click', function () {
        ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            ctrlAddItem();
        }
    });
})(uiController, financeController);