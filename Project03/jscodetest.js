var game = {
    array:[],//save data
    score:0,//create a score
    gamemode:1,//if game is able to continue = 1
    gameend:0,//if game is unable to continue = 0
    gaming:1,//check if is 1 or 0, 1 means able to play, 0 means game is end

    begin:function(){//game start
        game.gaming = game.gamemode;//set game mode to playing
        game.score = 0;//start with 0 score
        game.array = [ //set = 0
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
        ]
        game.randomNum(); //create two random number
        game.randomNum();
        game.arrayView();  //pad views while game begin

    },
    randomNum:function(){
//     random number 2 or 4 and random position
        for(;;){
            var row = Math.floor(Math.random()*4);//create a row number
            var column = Math.floor(Math.random()*4);//create a column number
            if(game.array[row][column] == 0){//it has to be set 0
                var num = Math.random()>0.5?2:4;//random number 2 or 4
                game.array[row][column] = num;//give the number to set
                break;//
            }
        }
    },
    arrayView:function(){//      
        for(var row = 0;row<4;row++){
            for(var column = 0;column<4;column++){
                var div = document.getElementById("p" + row + column);//get each div value
                if(game.array[row][column] !=0){
                    div.innerHTML = game.array[row][column];//give the div value to set 
                    div.className = "main n" + game.array[row][column];//change color
                }else{//if no array in set
                    div.innerHTML = "";//if the set in array is 0, 
                    div.className = "main";//change the color back
                }
            }
        }

        document.getElementById("scores").innerText = game.score;//get score value and update

        if(game.gaming == game.gameend){
            var finalscore = document.getElementById("scores").innerHTML;
            alert("Your final score is " + finalscore)
            window.location.reload();
        }
    },

    howGameEnds:function(){//how game ends
//      1.When all the grids are not 0 and adjacent positions cannot have the same
//      give function a return value,if false means able to continue, true means game end
        for(var row = 0;row<4;row++){
            for(var column = 0;column<4;column++){
                if(game.array[row][column] == 0){//if set = 0, means able to continue to play
                    return false;
                }
                if(column<3){//check if there are same numbers
                    if(game.array[row][column] == game.array[row][column+1]){//check left right
                        return false;
                    };
                }
                if(row<3){
                    if(game.array[row][column] == game.array[row+1][column]){//check up and down
                        return false;
                    };
                }
            }
        }
        return true;//game end
    },

    left:function(){
        var stringA = String(game.array);//save to stringA before move
        for(var row = 0;row<4;row++){
            game.leftInRow(row);
        }
        var stringB = String(game.array);//save to stringB after move and do compare 
        if(stringA != stringB){//if there are not same
            game.randomNum();//creat a new random number
            if(game.howGameEnds()){
                game.gaming = game.gameend;//change game mode to ed
            }
            game.arrayView();//update array
        }
    },
    leftInRow:function(row){
        for(var column = 0;column<3;column++){
            var nextcolumn = game.leftNextRow(row,column);//find postion
            if(nextcolumn != -1){//if array[row][i] found value
                if(game.array[row][column] == 0){//replace it if value is 0
                    game.array[row][column] = game.array[row][nextcolumn];
                    game.array[row][nextcolumn] = 0;
                    column--;
                }else if(game.array[row][column] == game.array[row][nextcolumn]){
                    game.array[row][column] *= 2;
                    game.score += game.array[row][column];
                    game.array[row][nextcolumn] = 0;
                }
            }else{
                break;//nothing found
            }
        }
    },
    leftNextRow:function(row,column){//find positon
        for (var i = column+1;i<4;i++) {//start to search from current positon so that column+1(current is column，next will be column+1)
            if (game.array[row][i] != 0) {//if it not equal to 0 which means, it has value
                return i;//return it
            }
        }
        return -1;//otherwise return -1
    },

    right:function(){
        var stringA = String(game.array);
        for (var row = 0;row<4;row++) {//compare row by row
            game.rightInRow(row);
        }
        var stringB = String(game.array);
        if (stringA != stringB) {
            game.randomNum();//
            if(game.howGameEnds()){
                game.gaming = game.gameend;
            }
            game.arrayView();
        }
    },
    rightInRow:function(row){
        for(var column = 3;column>0;column--){
            var nextcolumn = game.rightNextRow(row,column);
            if (nextcolumn != -1) {//if array[row][i] found value
                if(game.array[row][column] == 0){
                    game.array[row][column] = game.array[row][nextcolumn];
                    game.array[row][nextcolumn] = 0;
                    column++;// when positon changed, the comparation needs to start over
                }else if (game.array[row][column] == game.array[row][nextcolumn]) {
                    game.array[row][column] *= 2;
                    game.score += game.array[row][column];
                    game.array[row][nextcolumn] = 0;
                }
            }else{
                break;
            }
        }
    },
    rightNextRow:function(row,column){//find positon
        for(var i = column-1;i>=0;i--){//start to search from current positon so that column-1
            if (game.array[row][i] != 0) {
                return i;
            }
        }
        return -1;
    },


    up:function(){
        var stringA = String(game.array);
        for(var column = 0;column<4;column++){//every column
            game.upInRow(column);
        }
        var stringB = String(game.array);

        if(stringA != stringB){//if there are not same, means moves
            game.randomNum();//create a random number
            if(game.howGameEnds()){
                game.gaming = game.gameend;//change game mode
            }
            game.arrayView();//update
        }

    },
    upInRow:function(column){//only one column
        for(var row = 0;row<4;row++){
            var nextrow = game.upNextRow(row,column);//get the number positons   1 2 3  -1
            if(nextrow != -1){//
                if(game.array[row][column] == 0){//if its 0, then replace it
                    game.array[row][column] = game.array[nextrow][column];
                    game.array[nextrow][column] = 0;
                    row--;//start over, keep searching
                }else if(game.array[row][column] == game.array[nextrow][column]){//if there are equal
                    game.array[row][column] *= 2;//valueInCurrentPositon*2
                    game.score += game.array[row][column];//addon score
                    game.array[nextrow][column] = 0;//postion = 0
                }
            }else{//cant find
                break;//end loop
            }
        }
    },
    upNextRow:function(row,column){
        for(var i = row + 1;i < 4;i++){
            //i is positon of grid
            if (game.array[i][column] != 0) {
                return i;
            }
        }
        return -1
    },

    down:function(){//move down
        var stringA = String(game.array);//change to string
        for(var column = 0;column<4;column++){
            game.downInRow(column);
        }
        var stringB = String(game.array);//change to string

        if(stringA != stringB){//if there are not same, means moves
            game.randomNum();//create a random number
            if(game.howGameEnds()){
                game.gaming = game.gameend;//change gamemode
            }
            game.arrayView();//update
        }

    },
    downInRow:function(column){
        for(var row = 3;row>=0;row--){
            var nextrow = game.downNextRow(row,column);//get the number positons   1 2 3  -1
            if(nextrow != -1){
                if(game.array[row][column] == 0){//if its 0, then replace it
                    game.array[row][column] = game.array[nextrow][column];
                    game.array[nextrow][column] = 0;
                    row++;//start over, keep searching
                }else if(game.array[row][column] == game.array[nextrow][column]){
                    game.array[row][column] *= 2;//valueInCurrentPositon*2
                    game.score += game.array[row][column];//addon score
                    game.array[nextrow][column] = 0;//postion = 0
                }
            }else{
                break;//break loop
            }
        }
    },
    downNextRow:function(row,column){
        for(var i = row - 1;i >= 0;i--){
            //i is positon of grid
            if (game.array[i][column] != 0) {
                return i;
            }
        }
        return -1
    }
}

window.onload = function(){
    game.begin();
    document.onkeydown = function(e){//keydown events
        var e = e || event || arguments[0];
        if(e.keyCode == 37){
            game.left();
        }else if (e.keyCode == 39) {
            game.right();
        }else if (e.keyCode == 38) {
            game.up();
        }else if (e.keyCode == 40) {
            game.down();
        }
    }
}
