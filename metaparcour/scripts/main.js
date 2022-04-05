let solidY = []
let solidX = []
let solidHeight = []
let solidWidth = []
let pressedKeys = new Set()
let jumpPower = 3
const tps = 120
const mspt = 1000 / tps
const speed = 0.25
let player = $("#player")
let playerPos = player.position()
let playerX = playerPos.left
let playerY = playerPos.top
let playerWidth = player.width()
let playerHeight = player.height()

$("#player").data("deltaY", 0)

window.onload = () => {
    solidY = []
    solidX = []
    solidHeight = []
    solidWidth = []
    $(".solid").each((i, elem) =>{
        let jelem = $(elem)
        let elemPos = jelem.position()
        solidY.push(elemPos.top)
        solidX.push(elemPos.left)
        solidHeight.push(jelem.height())
        solidWidth.push(jelem.width())
    })
}

window.onresize = window.onload

$(document).keydown((e) => {
    pressedKeys.add(e.code)
})
$(document).keyup((e) =>{
    pressedKeys.delete(e.code)
})

setInterval(tick, mspt)