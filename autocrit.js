const CritsRequireConfirmation = false;

const CritSuc = [
    {flavor:"You feel accomplished, but nothing remarkable happens.", effect: "Regular critical hit."},
    {flavor:"You feel it is imperative to press the advantage no matter the cost.", effect: "You can choose to gain advantage on all attacks against your target until the end of your next turn, but if you do all enemies have advantage on their attack rolls against you until the end of your next turn."},
    {flavor:"You feel it is imperative to press the advantage, but maintain awareness of your surroundings.", effect: "You can choose to gain advantage on all attacks against your target next turn, your target has advantage on their attack rolls against you until the end of your next turn."},
    {flavor:"You know how to press the advantage.", effect: "You gain advantage on all attacks against your target until the end of your next turn."},
    ];
const CritFail = [
    {flavor:"You are embarassed by your poor showing, but nothing remarkable happens.", effect: "You miss your attack."},
    {flavor:"You lose your combat footing, exposing yourself to your target.", effect: "Your target has advantage on their first attack roll against you next round."},
    {flavor:"You lose your combat footing, exposing yourself to your enemies.", effect: "Your enemies have advantage on their first attack roll against you next round."},
    {flavor:"You lose your combat footing, and have difficulty recovering.", effect: "Your enemies have advantage on their attack rolls against you until the end of your next turn."},
    ];


//DO NOT MODIFY ANYTHING BELOW THIS LINE


function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }

let critDC = (CritsRequireConfirmation)?1:0;

on("chat:message", function(msg)
{
    log(msg);
    if(msg.type == "general" && msg.rolltemplate == "atk")
    {
        let crit_s = 0;
        let crit_f = 0;
        msg.inlinerolls.forEach(function(iroll, i)
        {
            iroll.results.rolls.forEach(function(roll, j)
            {
                if(roll.dice !== undefined)
                {
                    roll.results.forEach(function(res, k)
                    {
                        if(res.v == 20)
                        {
                            crit_s++
                        }
                        else if (res.v == 1)
                        {
                            crit_f++
                        }
                    });
                }
            });
        });
        
        if(crit_s > critDC)
        {
            critCount = crit_s / (critDC + 1) - (crit_s % (critDC + 1));
            for(var i = 0; i < critCount; i++)
            {
                var result = CritSuc[getRandomInt(CritSuc.length - 1)];
                sendChat("CRITICAL SUCCESS!", result.flavor + "\n**Effect** " + result.effect);
            }
        }
        if(crit_f > critDC)
        {
            critCount = crit_f / (critDC + 1) - (crit_f % (critDC + 1));
            for(var i = 0; i < crit_f; i++)
            {
                var result = CritFail[getRandomInt(CritFail.length - 1)];
                sendChat("CRITICAL FAILURE!", result.flavor + "\n**Effect** " + result.effect);
            }
        }
        
    }
});