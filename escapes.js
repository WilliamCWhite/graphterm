const e = "\x1b["
const escapes = {
    "r": e + "0m",
    "b": e + "1m",
    "d": e + "2m",
    "u": e + "4m",
    "v": e + "7m",
    "h": e + "8m",
    "rb": e + "22m",
    "rd": e + "22m",
    "ru": e + "24m",
    "rv": e + "27m",
    "rh": e + "28m",
    "cb": e + "30m",
    "cr": e + "31m",
    "cg": e + "32m",
    "cy": e + "33m",
    "cb": e + "34m",
    "cm": e + "35m",
    "cc": e + "36m",
    "cw": e + "37m",
    "cg": e + "90m",
    "rc": e + "39m"
}
export {escapes};