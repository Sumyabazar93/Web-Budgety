var uiController = (function () {

})();

var financeController = (function () { })();

var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        console.log('Delgetsnees ugugdul avah heseg');
    }
    document.querySelector('.add__btn').addEventListener('click', function () {
        ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            ctrlAddItem();
        }
    });
})(uiController, financeController);