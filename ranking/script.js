var lists = [];
lists.push('rebeccapurple')
lists.push('red')
lists.push('lightgreen')
lists.push('orange')
lists.push('tomato')
lists.push('teal')
lists.push('yellow')

const rank = document.querySelector('.rank')
var height = rank.clientHeight
var full_value = 0
function make_bar({color}) {
    var height = (rank.clientHeight / lists.length) - 10;
    var state = {
        value: 0,
        growth: 0
    }

    var bar = document.createElement('div')
    bar.className = "bar"
    // bar.style.left = "0px"
    bar.style.height = `${height}px`
    bar.style.borderRadius = `${height / 2}px`
    bar.style.background = color;
    // bar.style.transition = 'top 1s'
    rank.appendChild(bar)

    var label = document.createElement('div')
    label.className = "label"
    bar.appendChild(label);

    var pointer = {
        set value(val) {
            state.value = val;
            var percent = (state.value / full_value) * 100;
            bar.style.width = `${percent}%`;
            label.textContent = state.value;
        },
        get value() {
            return state.value
        },
        set rank(val) {
            state.rank = val;
            bar.style.top = `${state.rank * (height + 20)}px`
        },
        get rank() {
            return state.rank
        },
        set growth(val) {
            state.growth = val
        },
        get growth() {
            return state.growth
        },
    }
    return pointer;
}

var bar_list = lists.map(list => {
    return make_bar({color: list});
})


var limit = 5000;
var spent = 0;
var start = performance.now()
var hs;
function time() {
    var p = performance.now();
    var dt = p - start;
    start = p;
    spent += dt;
    if(spent > limit) {
        spent = limit
    }
    if( spent < limit) {
        requestAnimationFrame(time)
    }
    
    let max = -1;
    bar_list.forEach(bar => {
        let cv = bar.value + bar.growth;
        if (max < cv) {
            max = cv;
        }
    })
    full_value = max;

    bar_list.forEach(bar => {
        bar.value += bar.growth;
    })

    bar_list.sort(function(bar1, bar2) {
        if(bar1.value > bar2.value){
            return -1
        } else if (bar1.value < bar2.value) {
            return 1
        } else return 0
    })

    bar_list.forEach((bar, idx) => {
        bar.rank = idx;
    })

    var div = 1;
    var fl = Math.floor((spent/limit) * 100)
    if((fl%div) === 0) {
        if(hs !== fl) {
            hs = fl;
            bar_list.forEach(bar => {
                if( fl === 0 || Math.random() < 0.5) {
                    bar.growth = Math.round(Math.random() * 100);
                    if(!bar.growth) {bar.growth = 1;}
                }
            })
        }
    }
}
time()