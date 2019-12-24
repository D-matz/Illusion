var cards = document.getElementsByClassName("card");
var on = 0;
var placing = 0;
var cardAt = [];
var players = 0;
var cardSizes=[[9438,9665,10750,9633],[19779,8010,0,6050],[7227,30000,38406,11492],[5920,8679,9939,9060],[4699,5623,9135,12968],[3943,5045,10524,0],[8768,15263,3,4024],[3395,7777,6918,20727],[26009,267,15622,356],[39385,1567,1623,44925],[27810,24019,0,4410],[27927,2709,34616,22248],[32906,3396,33332,1820],[7839,8094,10409,18163],[17224,4672,10182,6537],[6524,5747,7013,5592],[4386,10352,6390,11656],[26525,6079,2728,6675],[5476,12256,13839,7744],[2868,17376,11932,2402],[11929,33718,17238,8175],[10158,7692,9552,6874],[2610,5613,8504,4102],[8367,14531,8370,17204],[3605,38063,20883,5383],[23452,9185,19896,8445],[15904,27067,6660,13879],[3184,7030,2349,2306],[5610,10686,39527,12973],[11627,7758,18101,17433],[9649,9872,10780,17306],[10755,9740,6453,15055],[264,10289,2643,64172],[8840,10198,6832,7735],[3267,2417,4420,14031],[979,18955,1625,2865]];
var colors = ["red","green","blue","yellow"];
var color = 0;
var sizeOrder = [];
var playerPoints = [];
var turn = 0;
var changing = false;
var gameStarted = false;
var sizes = [];
function shuffleCards(n)
{
    var order = [];
    for(var o=0;o<=n;o++)
    {
        order.push(o);
    }
    var ret = [];
    for(var o=n;o>=0;o--)
    {
        var rand = Math.floor(Math.random()*o);
        ret.push(order[rand]);
        for(var j=rand;j<=n;j++)
        {
            order[j] = order[j+1];
        }
    }
    for(var i=0;i<=n;i++)
    {
        cards[i].style.backgroundImage = "url('"+"cards/"+ret[i]+".png"+"')";
        //console.log(i+" "+cards[i].style.backgroundImage);
        sizes.push(cardSizes[ret[i]]);
    }
}
shuffleCards(35);


function swap(n){
    var place = Number(n);
    var temp = cardAt[place];
    cardAt[place] = cardAt[place+1];
    cardAt[place+1] = temp;
    temp = sizeOrder[place];
    sizeOrder[place] = sizeOrder[place+1];
    sizeOrder[place+1] = temp;
    console.log("sizes: ");
    for(var i=0;i<on;i++)
    {
        console.log(i+" "+sizeOrder[i]);
    }
    cards[cardAt[place]].style.order = place;
    cards[cardAt[place+1]].style.order = place+1;
}

window.addEventListener("keydown", function (e) {
if(gameStarted)
{
    console.log("sizes: ");
    for(var i=0;i<on;i++)
    {
        console.log(sizeOrder[i]);
    }
    if(e.keyCode == 40 && changing) //down
    {
    console.log(placing+" "+on);
        if(placing+1<on)
        {
            e.preventDefault();
            swap(placing);
            placing++;
        }
    }
    else if(e.keyCode == 38 && changing) //up
    {
        if(placing>=1)
        {
            e.preventDefault();
            swap(placing-1);
            placing--;
        }
    }
    else if(e.keyCode == 13 && changing) //enter
    {
        nextTurn();
    }
    else if(e.keyCode == 75 && !changing) //k
    {
        addcard();
        changing = true;
        document.getElementById("inst").innerHTML = "move up/down then enter";
    }
    else if(e.keyCode == 88 && !changing) //x
    {
       if(inOrder())
       {
           console.log("in order");
           var last = turn-1;
           if(turn==0)
           {
               last = players-1;
           }
           playerPoints[last]++;
           if(playerPoints[last]==3)
           {
                alert("player "+(last+1)+" wins!");
                location.reload();
           }
       }
       else
       {
           console.log("not in order");
           playerPoints[turn]++;
           if(playerPoints[turn]==3)
           {
                alert("player "+(turn+1)+" wins!");
                location.reload();
           }
       }
       writeScores();
       clearcards();
       shuffleCards(35);
       addcard();
       nextTurn();
    }
}
})

function addcard(){
    //console.log(on+" "+cards[on]);
    cards[on].style.display = "block";
    cards[on].style.order = on;
    cardAt.push(on);
    placing = on;
    sizeOrder.push(sizes[on][color]);
    cards[on].scrollIntoView();
    on++;
}

function clearcards(){
    for(var i=0;i<on;i++)
    {
        cards[i].style.display = "none";
    }
    cardAt = [];
    on = 0;
}

function inOrder(){
    var order = true;
    for(var i=0;i<on-1;i++)
    {
        console.log(sizeOrder[i]+" "+sizeOrder[i+1]);
        if(sizeOrder[i]<sizeOrder[i+1])
        {
            console.log("NOT IN ORDER");
            order = false;
            i = on;
        }
    }
    return order;
}

function nextTurn(){
    turn++;
    if(turn==players)
    {
        turn = 0;
    }
    document.getElementById("turn").innerHTML = "turn: player "+(turn+1);
    changing = false;
    document.getElementById("inst").innerHTML = "x to doubt, k to accept";
}

function startGame() {
document.getElementById("inst").innerHTML = "x to doubt, k to accept"; //???
  gameStarted = true;
  var p = document.getElementById("players").value;
  if(p>1&&p<6)
  {
    clearcards();
    console.log(p+" "+on);
    players = p;
    playerPoints = [];
    for(var i=0;i<players;i++)
    {
        playerPoints.push(0);
    }
    writeScores();
    turn = 0;
    document.getElementById("turn").innerHTML = "turn: player 1";
    addcard();
    color = Math.floor(Math.random()*4);
    document.getElementById("header").style.backgroundColor = colors[color];
    document.getElementById("header").style.backgroundImage = "linear-gradient("+colors[color]+", white)";
  }
}

function writeScores(){
    var scorelist = "score: ";
    for(var i=0;i<players;i++)
    {
        scorelist = scorelist+playerPoints[i]+" ";
    }
    document.getElementById("score").innerHTML = scorelist;
}
//start with a card and color
//on player turn, x to doubt or up/down -> enter to order
//if doubt
        //if right color order, preceding player gets point
        //if wrong color order, player gets point
    //reset with card and color
//play until a player has 3 points


//each image has 4 values, one for each color