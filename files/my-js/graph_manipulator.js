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