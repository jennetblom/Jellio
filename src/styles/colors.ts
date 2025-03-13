export const boardColors: Record<string, {default: string, hover: string}> = {
    purple: {
        default: "linear-gradient(140deg, rgb(252, 0, 201), #66005f)",
        hover: "linear-gradient(140deg, rgb(223, 1, 179), #4e0049)",
    },
    blue: {
        default: "linear-gradient(140deg, rgb(0, 239, 252), #002566)",
        hover: "linear-gradient(140deg, rgb(1, 213, 224), #011c4a)",
    },
    green: {
        default: "linear-gradient(140deg, rgb(231, 252, 0), #01710c)",
        hover: "linear-gradient(140deg, rgb(203, 221, 1), #005e0a)",
    },
    yellow: {
        default: "linear-gradient(140deg, rgb(250, 250, 0), #bc8a00)",
        hover: "linear-gradient(140deg, rgb(230, 230, 1), #a67a01)",
    },
    orange: {
        default: "linear-gradient(140deg, rgb(250, 196, 0), #da2100)",
        hover: "linear-gradient(140deg, rgb(220, 172, 2), #ba1d01)",
    },
}

export const getBoardBackground = (color: string, isHovered: boolean) => {
    return isHovered ? boardColors[color]?.hover ||color :
    boardColors[color]?.default || color;
}