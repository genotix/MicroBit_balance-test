input.onButtonPressed(Button.A, function () {
    set_sensitivity(false)
})
function blinkTarget () {
    if (control.millis() - blinktMillis > 500) {
        if (TargetOn == 1) {
            TargetOn = 0
            led.plot(target_x, target_y)
        } else {
            TargetOn = 1
            led.unplot(target_x, target_y)
        }
        blinktMillis = control.millis()
    }
}
function randomizeTarget () {
    target_x = randint(0, 4)
    target_y = randint(0, 4)
    if (target_x == 5 && target_y == 5) {
        randomizeTarget()
    }
}
function check_you_win () {
    if (control.millis() - last_movement >= 5000) {
        basic.showIcon(IconNames.SmallDiamond)
        basic.showIcon(IconNames.Diamond)
        basic.showIcon(IconNames.Chessboard)
        basic.showString("You win LEVEL " + sensitivity + "!")
        randomizeTarget()
    }
}
input.onButtonPressed(Button.B, function () {
    set_sensitivity(true)
})
function set_sensitivity (increase: boolean) {
    if (increase) {
        sensitivity += 1
    } else {
        sensitivity += -1
    }
    sensitivity = Math.constrain(sensitivity, 1, 32)
    basic.showString("" + (sensitivity))
    basic.clearScreen()
    led.plot(x, y)
}
let old_y = 0
let old_x = 0
let y = 0
let x = 0
let last_movement = 0
let target_y = 0
let target_x = 0
let TargetOn = 0
let blinktMillis = 0
let sensitivity = 0
sensitivity = 5
randomizeTarget()
blinktMillis = control.millis()
basic.forever(function () {
    x = pins.map(
    Math.constrain(input.acceleration(Dimension.X), -1023 / sensitivity, 1023 / sensitivity),
    -1023 / sensitivity,
    1023 / sensitivity,
    0,
    4
    )
    y = pins.map(
    Math.constrain(input.acceleration(Dimension.Y), -1023 / sensitivity, 1023 / sensitivity),
    -1023 / sensitivity,
    1023 / sensitivity,
    0,
    4
    )
    if (x != old_x || y != old_y) {
        led.unplot(old_x, old_y)
        old_x = x
        old_y = y
        last_movement = control.millis()
    } else {
        if (x == target_x && y == target_y) {
            check_you_win()
        }
    }
    led.plot(x, y)
    blinkTarget()
})
