const counter = function() {
    
    let a = 0;

    return function() {
      return ++a;
    }

  }();


console.log(counter());