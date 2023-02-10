function myModule(){
    this.hello = function(){
        console.log('hello');
    };
    this.goodBye = function(){
        console.log('bye');
    };
}

module.exports = myModule;