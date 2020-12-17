function Manipulator(gap){

    this.gap = gap;
    this.which = 1;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');

    this.get_width = function(size, canvas_width){
        let total_gap = (this.gap * size) + this.gap + this.gap;
        let remaining = canvas_width - total_gap;
        return (remaining / size);
    }

    this.draw_bars = function(values, color, orient){
        var width = this.get_width(values.length, this.canvas.width);
        var x = this.gap * 2;

        this.ctx.fillstyle = color;
        for(var i = 0; i < values.length; i++){
            var h = values[i];
            if(orient == 1) this.ctx.fillRect(x, this.canvas.height - h, width, h + 10);
            else this.ctx.fillRect(x, 0, width, h + 10);
            x += width + this.gap;
        }
        this.which = (this.which + 1) % 2;
    }

    this.draw = function(values, color){
        // alert(this.which);
        this.clear_all();
        this.draw_bars(values, color, this.which);
    }

    this.clear_all = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.clear_at = function(values, i){
        // var ctx = canvas.getContext('2d');
        var width = this.get_width(values.length, this.canvas.width);
        var x = this.gap * 2;
        for(var j = 0; j < values.length && j < i; j++)
            x += width + this.gap;
        if(this.which == 0) this.ctx.clearRect(x - 1, this.canvas.height - values[i], width + this.gap + 1, values[i] + 10);
        else this.ctx.clearRect(x - 1, 0, width + this.gap + 1, values[i] + 10 + 1);
    }

    this.update_at = function(values, color, i, val){
        // this.ctx.fillstyle = color;
        this.clear_at(values, i);
        this.ctx.fillstyle = color;
        var width = this.get_width(values.length, this.canvas.width);
        var x = this.gap * 2;
        for(var j = 0; j < values.length && j < i; j++) x += width + this.gap;
        // alert(this.which);
        if(this.which == 0) this.ctx.fillRect(x, this.canvas.height - val, width, val + 10);
        else this.ctx.fillRect(x, 0, width, val + 10);
    }

    this.update_bars = function(values, values2, color){
        for(var i = 0; i < values.length; i++){
            this.update_at(values, color, i, values2[i]);
        }
    }
}

function Sorter(){

    this.man = new Manipulator(0.5);

    this.arr = [[]];

    this.initialize = function(values){
        this.man.draw(values, 'black');
    }

    this.SelectionSort = function(values, i){
        if(i == values.length){
            console.log(values);
            this.man.update_bars(values);
            return;
        }
        let small = i;
        for(let j = i + 1; j < values.length; j++){
            if(values[j] < values[small]) small = j;
        }
        var values2 = values.slice();
        let temp = values[i];
        values[i] = values[small];
        values[small] = temp;
        // console.log(values);
        this.man.update_bars(values2, values, 'black');
        let that = this;
        setTimeout(function(){
            that.SelectionSort(values, i + 1);
        }, 100);
    }

    this.InsertionSort = function(values, i, j){
        if(j >= 0 && values[i] < values[j]){
            let values2 = values.slice();
            let temp = values[i];
            values[i] = values[j];
            values[j] = temp;
            this.man.update_bars(values2, values, 'black');
            let that = this;
            setTimeout(function(){
                that.InsertionSort(values, i - 1, j - 1);
            }, 100);
        }
    }

    this.InsertionSortMain = function(values){
        for(let i = 1; i < values.length; i++){
            this.InsertionSort(values, i, i - 1);
        }
        // console.log(values);
    }

    this.merge = function(values, left, right, index, i, j){
        if(i >= left.length){
            if(j >= right.length) return;
            let values2 = values.slice();
            values[index] = right[j];
            this.man.update_bars(values2, values, 'black');
            let that = this;
            // that.merge(values, left, right, index + 1, i, j + 1);
            return new Promise(function(resolve, reject){
                setTimeout(async function(){
                    await that.merge(values, left, right, index + 1, i, j + 1);
                    resolve();
                }, 100);
            });
            return;
        }
        else if(j >= right.length){
            let values2 = values.slice();
            values[index] = left[i];
            this.man.update_bars(values2, values, 'black');
            let that = this;
            return new Promise(function(resolve, reject){
                setTimeout(async function(){
                    await that.merge(values, left, right, index + 1, i + 1, j);
                    resolve();
                }, 100);
            });
            return;
        }
        if(left[i] <= right[j]){
            let values2 = values.slice();
            values[index] = left[i];
            this.man.update_bars(values2, values, 'black');
            let that = this;
            // that.merge(values, left, right, index + 1, i + 1, j);
            return new Promise(function(resolve, reject){
                setTimeout(async function(){
                    await that.merge(values, left, right, index + 1, i + 1, j);
                    resolve();
                }, 100);
            });
        }
        else{
            let values2 = values.slice();
            values[index] = right[j];
            this.man.update_bars(values2, values, 'black');
            let that = this;
            // that.merge(values, left, right, index + 1, i, j + 1);
            return new Promise(function(resolve, reject){
                setTimeout(async function(){
                    await that.merge(values, left, right, index + 1, i, j + 1);
                    resolve();
                }, 100);
            });
        }
    }

    this.MergeSort = async function(values, i, j){
        if(i >= j) return;
        let size = j - i + 1;
        let that = this;
        return new Promise(async function(resolve, reject){
            await that.MergeSort(values, i, i + Math.floor(size / 2) - 1);
            await that.MergeSort(values, i + Math.floor(size / 2), j);
            let left = values.slice(i, i + Math.floor(size / 2));
            let right = values.slice(i + Math.floor(size / 2), j + 1);
            await that.merge(values, left, right, i, 0, 0);
            resolve();
        });
    }

    this.Partition = async function(values, i, j, left){
        if(i >= j){
            left++;
            let values2 = values.slice();
            let temp = values[j];
            values[j] = values[left];
            values[left] = temp;
            // this.arr.push(values2);
            this.man.update_bars(values2, values, 'black');
            // return left;
            return new Promise(function(resolve, reject){
                setTimeout(function(){
                    resolve(left);
                }, 100);
                // resolve(left);
            });
        }
        if(values[i] <= values[j]){
            left++;
            let values2 = values.slice();
            let temp = values[i];
            values[i] = values[left];
            values[left] = temp;
            // this.arr.push(values2);
            this.man.update_bars(values2, values, 'black');
            // let res = this.Partition(values, i + 1, j, left);
            // return res;
            let that = this;
            return new Promise(function(resolve, reject){
                // let res = await that.Partition(values, i + 1, j, left);
                // resolve(res);
                setTimeout(async function(){
                    let res = await that.Partition(values, i + 1, j, left);
                    resolve(res);
                }, 100);
            });
        }
        else{
            // let res = this.Partition(values, i + 1, j, left);
            // return res;
            let that = this;
            return new Promise(async function(resolve, reject){
                let res = await that.Partition(values, i + 1, j, left);
                resolve(res);
            });
        }
         
        // let left = i - 1;
        // for(let k = i; k < j; k++){
        //     if(values[k] <= values[j]){
        //         left++;
        //         let temp = values[left];
        //         values[left] = values[k];
        //         values[k] = temp;
        //     }
        // }
        // left++;
        // let temp = values[left];
        // values[left] = values[j];
        // values[j] = temp;
        // return left;
    }

    this.QuickSort = async function(values, i, j){
        if(i >= j) return;
        let that = this;
        // let pivot = this.Partition(values, i, j, i - 1);
        // this.QuickSort(values, i, pivot - 1);
        // this.QuickSort(values, pivot + 1, j);
        return new Promise(async function(resolve, reject){
            let pivot = await that.Partition(values, i, j, i - 1);
            await that.QuickSort(values, i, pivot - 1);
            await that.QuickSort(values, pivot + 1, j);
            resolve();
        });
    }

    // this.viz = function(i){
    //     // console.log(i);
    //     if(i == this.arr.length) return;
    //     // console.log(i);
    //     let that = this;
    //     setTimeout(function(){
    //         that.man.update_bars(that.arr[i - 1], that.arr[i], 'black');
    //         that.viz(i + 1);
    //     }, 100);
    // }

    // this.quick = function(values, i, j){
    //     // console.log("here");
    //     // this.arr.push(values);
    //     this.QuickSort(values, i, j);
    //     this.viz(1);
    //     // console.log(this.arr.length);
    //     // for(let i = 1; i < this.arr.length; i++) this.man.update_bars(values[0], values[1], 'black');
    // }
}

let man = new Manipulator(5);
let sorter = new Sorter();

let get_started = document.getElementById('get_started_button');
let clear_button = document.getElementById('clear_button');
let update_button = document.getElementById('update_button');

get_started.addEventListener("click", function(){
    var values = [100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289,425,299,338,100,228,289];
    // values.sort(function(a, b){ return a - b });
    man.draw(values, 'black');
});

clear_button.addEventListener('click', function(){
    man.clear_at(values, 1);
});

update_button.addEventListener('click', async function(){
    // var values = [100,228,289,425,299,338,100];
    let values = [17,3,9,1,9,1,5,20,34,28,50,35,33,41,23,6,22,16,36,48,44,10,32,5,19,8,40,18,42,47,9,31,7,13,21,49,43,37,27,26,11,30,2,46,45,1,4,12,24,3,17,17,3,9,1,9,1,5,20,34,28,50,35,33,41,23,6,22,16,36,48,44,10,32,5,19,8,40,18,42,47,9,31,7,13,21,49,43,37,27,26,11,30,2,46,45,1,4,12,24,3,17,17,3,9,1,9,1,5,20,34,28,50,35,33,41,23,6,22,16,36,48,44,10,32,5,19,8,40,18,42,47,9,31,7,13,21,49,43,37,27,26,11,30,2,46,45,1,4,12,24,3,17,17,3,9,1,9,1,5,20,34,28,50,35,33,41,23,6,22,16,36,48,44,10,32,5,19,8,40,18,42,47,9,31,7,13,21,49,43,37,27,26,11,30,2,46,45,1,4,12,24,3,17,17,3,9,1,9,1,5,20,34,28,50,35,33,41,23,6,22,16,36,48,44,10,32,5,19,8,40,18,42,47,9,31,7,13,21,49,43,37,27,26,11,30,2,46,45,1,4,12,24,3,17];
    for(let i = 0; i < values.length; i++) values[i] = values[i] * 10;
    // var values = [5,7,1,8,3,7,6];
    
    // var values2 = values.slice();
    // values2.sort(function(a, b){ return a - b });
    // // console.log(values);
    // man.update_bars(values, values2, "black");
    // man.clear_at(values, 3);
    // for(var i = 0; i < values.length; i++) man.update_at(values, 'black', i, values);
    sorter.initialize(values);
    sorter.SelectionSort(values, 0);
    // sorter.initialize(values);
    // sorter.InsertionSortMain(values);
    // await sorter.MergeSort(values, 0, values.length - 1);
    // await sorter.MergeSort(values, 0, values.length - 1);
    // await sorter.QuickSort(values, 0, values.length - 1);
    // console.log(values);
});

// check();
