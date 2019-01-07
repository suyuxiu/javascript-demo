// 圆括号运算符，return 语句和递归
function add(x,y){
	return x+y;
}

console.log(add(1,1))
//函数可以调用自身,这就是递归
function fib(num){
    if(num === 0) return 0;
    if(num === 1) return 1;
    return fib(num - 2)+fib(num - 1);
}
console.log(fib(6));
//上述代码中,fib函数内部又调用了fib

// 1.4第一等公民
//JavaScript语言将函数看作一种值,与其他值(数值.字符串.布尔值等等)地位相同.凡是可以使用
//值的地方,就能使用函数.比如,可以把函数付给变量和对象的属性,也可以当做参数传入其他函数,或者
//作为函数的结果返回.函数只是一个可以执行的值,此外并无特殊之处.
//由于函数与其他数据类型地位平等,所以在JavaScript中右称函数为第一等公民

function add(x,y){
    return x+y;
}
//将函数赋值给一个变量
var operator = add;
//将函数作为参数或返回值
function a(op){
    return op;
}
console.log(a(add)(1,1));
// function add(x,y){
//     return x+y;
// }
// var operator = add;
// function a(op){
//     return op;
// }
// a(add)(1,1);

// function add(x,y){
//     return x+y;
// }

// var operator = add;
// function a(op){
//     return op;
// }
// a(add)(1,1);

//1.5函数名的提升
// javascript 引擎将函数名视同变量名,所以采用function命令声明函数时,整个函数像变量声明一样,
// 被提升到代码的头部.

f();
function f(){}

//表面上,上面的代码好像在声明之前就调用了函数f.但是实际上,由于"变量提升",函数f被提升到了代码头部
//,也就是在调用之前已经声明了.但是,如果采用了赋值语句定义了函数,JavaScript就会报错.

f();
var f = function(){};// TypeError: undefined is not a function
//上面的代码等同于下面的形式.
var f;
f();
f = function () {};
//上面代码第二行,调用f的时候,f只是被声明了还没有被赋值,等于undefind,所以会报错,因此,如果
//采用function 命令和赋值语句声明同一个函数,最后总是采用赋值语句的定义.

var fu = function (){
    console.log("1");
}

function fu(){
    console.log('2');
}
fu()

// 2.函数的属性和方法 

// 2.1 name 属性
// 函数的name属性返回函数的名字.

function f1(){}
f1.name //'f1'

// 如果是通过变量赋值定义的函数,那么name 属性返回变量名.

var f2 = function (){};
f2.name //'f2'

//但是,上面这种情况,只有在变量的值是一个匿名函数时才是如此.如果变量的值是一个具名函数
//那么name属性返回function关键字之后的那个函数名.

var f3 = function myName(){};
f3.name //'myName'

//上面代码中,f3.name返回函数表达式的名字.注意,真正的函数名还是f3,而myName这个名字只在
//函数体内部可用. 

//name 属性的一个用处,就是获取参数函数的名字.

var myFunc = function(){};
function test(f){
    console.log(f.name);
}
test(myFunc) //myFunc
//上面的代码中,函数test内部通过name属性,就可以知道传入的参数是什么函数

// 2.2 length 属性

// 函数的length属性返回函数预期传入的参数个数,即函数定义之中的参数个数.
// function f(a,b){}
f.length //2
//上面代码定义了空函数f,它的length属性就是定义时的参数个数.不管调用时输入了多少个参数,
//length属性始终等于2

//length属性提供了一种机制,判断定义时调用时参数的差异,以便实现面对对象编程的"方法重载"(overload)

// 2.3 toString()

//函数的tostring方法返回一个字符串,内容是函数的源码.
function f(){
    a();
    b();
    c();
}
f.toString()
// function f() {
//  a();
//  b();
//  c();
// }

//函数内部的注释也可以返回

function f(){
    // 我是注释
}

f.toString()
// function f(){
//     // 我是注释
// }

//利用这一点,可以变相实现多行字符串
// split() 方法用于把一个字符串分割成字符串数组
// slice() 方法可从已有的数组中返回选定的元素
// join() 方法用于把数组中的所有元素放入一个字符串
var multiline = function (fn){
    var arr = fn.toString().split('\n');
    return arr.slice(1,arr/length - 1).join('\n');
};
function f(){/*
    这是一个
    多行注释
    */}

multiline(f);
// " 这是一个
//   多行注释"

// 3.函数作用域
/* 作用域指的是变量存在的范围.全局作用域:变量在整个程序中一直存在,所有地方都可以读取,另一种函数作用域,
变量只在函数内部存在.*/
 
var v = 1;
function f(){
    console.log(v);
}
f() //1
// 函数f内部可以读取全部变量v

function f(){
    var v=1;
}
v // ReferenceError: v is not defined
//变量v在函数内部定义，所以是一个局部变量，函数之外就无法读取。

// 函数内部定义的变量,会在该作用域内覆盖同名全局变量
var v = 1;
function f(){
    var v = 2;
    console.log(v)
}
f() //2
v //1

/* 注意,对于var 命令来说,局部变量只能在函数内部声明*/
if(true){
    var x = 5;
}
console.log(x); //5
//变量x在条件判断区块之中声明,结果就是一个全局变量,可以在区块之外读取

// 3.2 函数内部的变量提升
/* 与全局作用域一样,函数作用域内部也会产生'变量提升'现象.var 命令声明的变量,不管在什么位置,变量声明都会被提升到
函数体的头部*/

function foo(x){
    if(x>100){
        var tmp = x - 100;
    }
}

//等同于
function foo(x){
    var tmp;
    if(x > 100){
        tmp = x - 100;
    };
}

// 3.3 函数本身的作用域

// 函数本身也是一个值,也有自己的作用域.它的作用域与变量一样,就是其声明时所在的作用域,与其运行时所在的作用与无关
 var a = 1;
 var x = function(){
     console.log(a);
 };
 function f(){
     var a = 2;
     x();
 }
 f()  //1
 /* 函数x是在函数f的外部声明的,所以它的作用域绑定外层,内部变量a不会到函数f体内取值,所以输出1,而不是2.*/

//  很容易犯错的一点是，如果函数A调用函数B，却没考虑到函数B不会引用函数A的内部变量。
 var x = function (){
     console.log(a);
 };
 function y(f){
     var a = 2;
     f();
 }
 y(x)
 // ReferenceError: a is not defined
 /* 代码将函数x作为参数,传入函数y.但是函数x是在函数y体外声明的,作用域绑定外层,
 因此找不到函数y的内部变量a,导致报错*/
 
//  同样的，函数体内部声明的函数，作用域绑定函数体内部。
function foo(){
    var x=1;
    function bar(){
        console.log(x);
    }
    return bar;
}
 var x=2;
 var f=foo();
 f() //1
 /* 函数foo内部声明了一个函数bar,bar的作用域绑定foo.当我们在foo外部取出bar执行时,
 变量x指向的是foo内部的x,而不是foo外部的x.正是这种机制，构成了下文要讲解的“闭包”现象。*/

 //4. 参数
//4.1 概述
//  函数运行的时候,有时候需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。

function square(x){
    return x* x;
}
square(2) //4
square(3) //9
//上式的x就是square函数的参数。每次运行的时候，需要提供这个值，否则得不到结果。

//4.2 参数的省略 
//函数参数不是必需的,Javascript 允许省略参数。

function f(a,b){
    return a;
}
f(1,2,3) //1
f(1) //1
f() //undefined
f.length //2

//需要注意的是，函数的length属性与实际传入的参数个数无关，只反映函数预期传入的参数个数
//但是,没有办法只省略靠前的参数,而保留靠后的参数.如果一定要省略靠前的参数,只有显式传入undefined.

function f(a,b){
    return a;
}
//f( ,1)    SyntaxError: Unexpected token ,(…)
f(undefined,1) //undefind

// 4.3 传递方式
//函数参数如果是原始类型的值(数值,字符串,布尔值),传递方式是传值传递.这意味着,在函数体内修改参数值,
//不会影响到函数外部.

var p =2;
function f(p){
    p=3;
}
f(p);
p //2
//变量p是一个原始类型的值,传入函数f的方式是传值传递.因此,在函数内部,p的值是原始值的拷贝,无论怎么修改,
//都不会影响到原始值.

/* 但是,如果函数参数是复合类型的值(数组,对象,其他函数),传递方式是传址传递.也就是说,传入函数的原始值
的地址,因此在函数内部修改参数,将会影响到原始值.*/

var obj = {P : 1};
function f(o){
    o.p = 2;
}
f(obj);
obj.p //2

//注意,如果函数内部修改的,不是参数对象的某个属性,而是替换掉整个参数,这时不会影响到原始值.

var obj = [1,2,3];
function f(o){
    o=[2,3,4];
}
f(obj);
obj //[1,2,3]

/* 在函数f内部,参数对象obj被整个替换成了另一个值.这时不会影响到原始值.因为,形式参数(o)的
值实际是参数obj的地址,重新对o赋值导致o指向另一个地址,保存在原地址上的值当然不会受影响.*/

// 4.4 同名参数
 //如果有同名的参数,则取最后出现的那个值.
 function f(a,a){
     console.log(a);
 }
 f(1,2) //2

 //调用函数f的时候,没有提供第二个参数,a的取值就变成了undefined.这时,如果要获取第一个a的值,
 //可以使用arguments对象.
 function f(a,a){
     console.log(arguments[0]);
 }
 f(1) //1

//  4.5 arguments 对象 
// （1）定义
/* 由于JavaScript允许函数有不定数目的参数,所以需要一种机制.可以在函数体内部读取所有参数.
*/
// arguments 对象包含了函数运行时的所有参数,arguments[0]就是第一个参数,arguments[1]就是第二个参数
// ,以此类推.这个对象只有在函数内部才可以使用

var f = function (one){
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}
f(1,2,3)
// 正常模式下,arguments对象可以在运行时修改.

var f = function(a,b){
    arguments[0] = 3;
    arguments[1] = 2;
    return a+b;
}
f(1,1) //5
// 上面代码中，函数f调用时传入的参数，在函数内部被修改成3和2。

//严格模式下,arguments对象是一个只读对象,修改它是无效的,但不会报错.

var f=function(a,b){
    'use strict';//开启严格模式
    arguments[0] = 3; //无效
    arguments[1] = 2; //无效
    return a + b;
}
f(1,1) //2
//上面代码中，函数体内是严格模式，这时修改arguments对象就是无效的。
//通过arguments对象的length属性，可以判断函数调用时到底带几个参数。

function f(){
    return arguments.length;
}
f(1,2,3)//3
f(1)//1
f()//0

// (2) 与数组的关系

//需要注意的是，虽然arguments很像数组，但它是一个对象。数组专有的方法（比如slice和forEach）,
//不能在arguments对象上直接使用。
var args = Array.prototype.slice.call(arguments);
 //或者
 var args = [];
 for(var i = 0;i < arguments.length;i++){
     args.push(arguments[i]);
 }
 //(3) callee属性
 //arguments 对象带有一个callee属性，返回它对应的原函数
 var f = function(){
     console.log(arguments.callee ===f);
 }
 f() //true
 //可以通过arguments.callee，达到调用函数自身的目的。这个属性在严格模式里面是禁用的，因此不建议使用。
//5.函数的其他知识点
//5.1 闭包
//如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

function f1(){
    var n = 999;
    function f2(){
        console.log(n); //999
    }
}
//上面的代码中，函数f2就在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行了，f2内部的局部变量，对f1就是不可见的。
// 这就是JavaScript语言特有的“链式作用域”结构，子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，
//反之则不成立。

//既然F2可以读取f1的局部变量，那么只要f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗？

//闭包就是函数f2，既能够读取其他函数内部变量的函数。由于JavaScript语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成
//“定义在一个函数内部的函数”。闭包最大的特点，就是它可以“记住”诞生的环境，比如f2记住了它诞生的环境f1，所以从f2可以得到f1的内部变量。
//本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

//闭包的最大用处就是有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。
//请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。

function createIntor(atart) {
  return function(){
      return start++;
  };   
}
var inc = createIntor(5);
inc() //5
inc() //6
inc() //7

/* 上面代码中，start是函数createIntor的内部变量。通过闭包，start的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。
从中可以看出，闭包Inc使得函数createIntor的内部环境，一直存在。所以，闭包可以看做是函数内部作用域的一个接口。*/

/* 为什么会这样呢？原因就在于inc始终在内存中，而inc的存在依赖于createIntor，因此也始终在内存中，不会在调用结束后，
被垃圾回收机制回收。*/

//闭包的另一个用处，是封装对象的私有属性和私有方法。
 
 function person(name) {
     var _age;
     function setAge(n){
         _age = n;
     }
     function getAge(){
         return _age;
     }
     return{
         name:name,
         getAge:getAge,
         setAge:setAge
     };
 }
 var p1 = person('张三');
 p1.setAge(25);
 p1.getAge() //25

 //上面代码中，函数person的内部变量_age，通过闭包getAge和setAge,变成了返回对象p1的私有变量。
//注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，
// 否则会造成网页的性能问题。