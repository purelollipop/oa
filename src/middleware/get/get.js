export let getObj = {

}

export let getAdd = function (name,callback) {
    getObj[name] = callback
}
