var uiCrtl = (function () {
    var x = 100;

    function add(y) {
        return x + y;
    }

    return {
        publicAdd: function (a) {
            a = add(a);
            console.log("Utga : " + a);
        }
    }
})();

var financecrtl = (function () {

});

var appCrtl = (function (uiCrtl, financecrtl) {
    uiCrtl.publicAdd(150);
})(uiCrtl, financecrtl);