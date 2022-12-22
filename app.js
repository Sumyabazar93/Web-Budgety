var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage"
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        clearFields: function () {
            var fields = document.querySelectorAll(
                DOMstrings.inputDescription + ", " + DOMstrings.inputValue
            );

            // Convert List to Array

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (el, index, array) {
                el.value = "";
            });

            fieldsArr[0].focus();
            // for(var i = 0; i < fieldsArr.length; i ++) {
            //     fieldsArr[i].value = "";
            // }
        },
        tusviigUzuuleh: function (tusuv) {
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;

            if (tusuv.huvi === 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
            }
        },
        addListItem: function (item, type) {
            var html, list;
            if (type === "inc") {
                list = DOMstrings.incomeList;
                html =
                    '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
            } else {
                list = DOMstrings.expenseList;
                html =
                    '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
})();

var financeController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function (type) {
        var sum = 0;
        data.items[type].forEach(function (el) {
            sum += el.value;
        });
        data.totals[type] = sum;
    }
    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        tusuv: 0,

        huvi: 0
    };

    return {
        tusuvTootsooloh: function () {
            calculateTotal('inc');
            calculateTotal('exp');

            data.tusuv = data.totals.inc - data.totals.exp;

            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        tusviigAvah: function () {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        addItem: function (type, desc, val) {
            var item, id;

            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },

        seeData: function () {
            return data;
        }
    };
})();
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        var input = uiController.getInput();

        if (input.description !== "" && input.value !== "") {
            var item = financeController.addItem(
                input.type,
                input.description,
                input.value
            );
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            financeController.tusuvTootsooloh();

            var tusuv = financeController.tusviigAvah();

            uiController.tusviigUzuuleh(tusuv);
            console.log(tusuv);
        }
    };

    var setupEventListeners = function () {
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function () {
            ctrlAddItem();
        });

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    return {
        init: function () {
            console.log("Application started...");
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListeners();
        }
    };
})(uiController, financeController);

appController.init();
