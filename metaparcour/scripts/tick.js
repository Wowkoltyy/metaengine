function tick(){
    let player = $("#player")
    let playerPos = player.position()
    let playerX = playerPos.left
    let playerY = playerPos.top
    let playerWidth = player.width()
    let playerHeight = player.height()


    if(player.data("jumped")){
        player.moveY(speed * playerHeight * player.data("deltaY"))
        player.data("deltaY", player.data("deltaY") + speed * 0.1)
        if(player.data("deltaY") >= 0){
            player.data("jumped", false)
            player.data("fallingAfterJump", true)
        }
    }
    else {
        let selector = true
        let playerYN = playerY + speed * playerHeight * player.data("deltaY")
        for (let i = 0; i < solidX.length; i++) {
            
            if((playerX.isBetween(solidX[i], solidX[i] + solidWidth[i]) || (playerX + playerWidth).isBetween(solidX[i], solidX[i] + solidWidth[i])) && ((playerYN + playerHeight).isBetween(solidY[i], solidY[i] + solidHeight[i]) || playerYN.isBetween(solidY[i], solidY[i] + solidHeight[i]))){
                selector = false
                
                player.css({top: solidY[i] - playerHeight})
                if(player.data("deltaY") > 0){
                    player.data("deltaY", 0)
                    player.data("fallingAfterJump", false)
                }
                player.data("checkX", true)
                
                break
            }
        }
        if(selector || player.data("fallingAfterJump")){
            player.moveY(speed * playerHeight * player.data("deltaY"))
            if(speed * playerHeight * player.data("deltaY") > 0)player.data("checkX", true)
            player.data("deltaY", player.data("deltaY") + speed * 0.1)
            
        }
    }
    if(pressedKeys.has('KeyA')){
        player.moveX(-speed * playerWidth + +(pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight')) * 0.5 * speed * playerWidth)
    }
    if(pressedKeys.has('KeyD')){
        player.moveX(speed * playerWidth - +(pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight')) * 0.5 * speed * playerWidth)
    }
    if(pressedKeys.has('Space')){
        if(!player.data("jumped") && !player.data("fallingAfterJump")){
            player.data("deltaY", -speed * jumpPower)
            player.data("jumped", true)
        }
    }
}