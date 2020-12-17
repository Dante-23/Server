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
            this.man.update_bars(values2, values, 'black');
            return new Promise(function(resolve, reject){
                setTimeout(function(){
                    resolve(left);
                }, 100);
            });
        }
        if(values[i] <= values[j]){
            left++;
            let values2 = values.slice();
            let temp = values[i];
            values[i] = values[left];
            values[left] = temp;
            this.man.update_bars(values2, values, 'black');
            let that = this;
            return new Promise(function(resolve, reject){
                setTimeout(async function(){
                    let res = await that.Partition(values, i + 1, j, left);
                    resolve(res);
                }, 100);
            });
        }
        else{
            let that = this;
            return new Promise(async function(resolve, reject){
                let res = await that.Partition(values, i + 1, j, left);
                resolve(res);
            });
        }
    }

    this.QuickSort = async function(values, i, j){
        if(i >= j) return;
        let that = this;
        return new Promise(async function(resolve, reject){
            let pivot = await that.Partition(values, i, j, i - 1);
            await that.QuickSort(values, i, pivot - 1);
            await that.QuickSort(values, pivot + 1, j);
            resolve();
        });
    }

    
}