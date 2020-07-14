input.onButtonPressed(Button.A, function () {
    set_sensitivity(false)
})
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
let sensitivity = 0
sensitivity = 1
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
    }
    led.plot(x, y)
})
