Number.prototype.isBetween = function(a, b, inclusive) {
    let min = Math.min(a, b),
      max = Math.max(a, b)
  
    return inclusive ? this >= min && this <= max : this > min && this < max
}

$.fn.extend({
    moveX: function(x = 0) {
        updatePlayerVars(this)
        this.css({left: this.position().left + x})
        updatePlayerVars(this)
        for (let i = 0; i < solidX.length; i++) {
            if((playerY.isBetween(solidY[i], solidY[i] + solidHeight[i]) || (playerY + playerHeight).isBetween(solidY[i], solidY[i] + solidHeight[i])) && ((playerX + playerWidth).isBetween(solidX[i], solidX[i] + solidWidth[i]) || playerX.isBetween(solidX[i], solidX[i] + solidWidth[i])) && this.data("checkX")){
                if(x > 0 && (playerX + playerWidth).isBetween(solidX[i], solidX[i] + solidWidth[i])){
                    this.css({left: solidX[i] - playerWidth})
                }
                else if (x < 0 && playerX.isBetween(solidX[i], solidX[i] + solidWidth[i])){
                    this.css({left: solidX[i] + solidWidth[i] + 0.02})
                } 
                updatePlayerVars(this)
            }
        }
        return this
    },
    moveY: function(y = 0) {
        updatePlayerVars(this)
        this.css({top: this.position().top + y})
        updatePlayerVars(this)
        for (let i = 0; i < solidX.length; i++){
            if((playerX.isBetween(solidX[i], solidX[i] + solidWidth[i]) || (playerX + playerWidth).isBetween(solidX[i], solidX[i] + solidWidth[i])) && ((playerY + playerHeight).isBetween(solidY[i], solidY[i] + solidHeight[i]) || playerY.isBetween(solidY[i], solidY[i] + solidHeight[i]))){
                if((playerY + playerHeight).isBetween(solidY[i], solidY[i] + solidHeight[i])){
                    if(this.data("deltaY") > 0)this.data("deltaY", 0)
                    this.css({top: solidY[i] - playerHeight})
                    updatePlayerVars(this)
                }
                else if (playerY.isBetween(solidY[i], solidY[i] + solidHeight[i])){
                    if(this.data("deltaY") < 0)this.data("deltaY", 0)
                    if(this.data("jumped"))this.data("fallingAfterJump", true)
                    this.data("checkX", false)
                    this.css({top: solidY[i] + solidHeight[i]})
                    updatePlayerVars(this)
                }
            }
        }
        return this
    }
})

function updatePlayerVars(player){
    playerPos = player.position()
    playerX = playerPos.left
    playerY = playerPos.top
    playerWidth = player.width()
    playerHeight = player.height()
}
