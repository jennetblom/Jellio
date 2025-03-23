export const boardColors: Record<string, {default: string, hover: string, header: string}> = {
    purple: {
        default: "linear-gradient(140deg, rgb(252, 0, 201), #66005f)",
        hover: "linear-gradient(140deg, rgb(223, 1, 179), #4e0049)",
        header: "#940077",
    },
    blue: {
        default: "linear-gradient(140deg, rgb(0, 239, 252), #002566)",
        hover: "linear-gradient(140deg, rgb(1, 213, 224), #011c4a)",
        header: "#0088A8"
    },
    green: {
        default: "linear-gradient(140deg, rgb(231, 252, 0), #01710c)",
        hover: "linear-gradient(140deg, rgb(203, 221, 1), #005e0a)",
        header: "#228B22", 
    },
    yellow: {
        default: "linear-gradient(140deg, rgb(250, 250, 0), #bc8a00)",
        hover: "linear-gradient(140deg, rgb(230, 230, 1), #a67a01)",
        header: "#D4AF37", 
    },
    orange: {
        default: "linear-gradient(140deg, rgb(250, 196, 0), #da2100)",
        hover: "linear-gradient(140deg, rgb(220, 172, 2), #ba1d01)",
        header: "#CC5500", 
    },
}

export const getBoardBackground = (color: string, isHovered: boolean) => {
    return isHovered ? boardColors[color]?.hover ||color :
    boardColors[color]?.default || color;
}