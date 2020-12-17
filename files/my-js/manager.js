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