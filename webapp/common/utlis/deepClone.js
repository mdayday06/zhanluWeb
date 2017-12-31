function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') {
      return obj;
    }
  
    switch (Object.prototype.toString.call(obj)) {
      case '[object Array]': {
        var result = new Array(obj.length);
        for (var i=0; i<result.length; ++i) {
          result[i] = deepClone(obj[i]);
        }
        return result;
      }
  
      // Object.prototype.toString.call(new XxxError) returns '[object Error]'
      case '[object Error]': {
        var result = new obj.constructor(obj.message);
        result.stack = obj.stack; // hack...
        return result;
      }
  
      case '[object Date]':
      case '[object RegExp]':
      case '[object Int8Array]':
      case '[object Uint8Array]':
      case '[object Uint8ClampedArray]':
      case '[object Int16Array]':
      case '[object Uint16Array]':
      case '[object Int32Array]':
      case '[object Uint32Array]':
      case '[object Float32Array]':
      case '[object Float64Array]':
      case '[object Map]':
      case '[object Set]':
        return new obj.constructor(obj);
  
      case '[object Object]': {
        var keys = Object.keys(obj);
        var result = {};
        for (var i=0; i<keys.length; ++i) {
          var key = keys[i];
          result[key] = deepClone(obj[key]);
        }
        return result;
      }
  
      default: {
        throw new Error("Unable to copy obj! Its type isn't supported.");
      }
    }
  }
  
  var arr = [
    { a: 1, b: 2, c: 3},
    [ 4, 5, 6 ],
    { d: { e: { f: 7, g: 8 }, h: 9 } },
    0, null, undefined, new Date(2015, 5, 5),
    { "left" : [1, 2, 3, [4, 5, 6]], "right" : null, "data" : 3 }
  ];
  
  
  console.log(typeof arr);
  console.log(Object.prototype.toString.call(arr));
  var arrCopy = deepClone(arr);
  console.log(arrCopy);

  