export const boardColors: Record<string, {default: string, hover: string, header: string}> = {
    purple: {
        default: "linear-gradient(140deg, rgb(252, 0, 118),rgb(130, 0, 106))",
        hover: "linear-gradient(140deg, rgb(232, 0, 108),rgb(113, 0, 92))",
        header: "linear-gradient(140deg, rgb(219, 0, 102),rgb(113, 0, 92))",
    },
    blue: {
        default: "linear-gradient(140deg, rgb(0, 252, 239),rgb(2, 83, 110))",
        hover: "linear-gradient(140deg, rgb(3, 232, 198),rgb(0, 36, 79))",
        header: "linear-gradient(140deg, rgb(3, 212, 215),rgb(0, 95, 122))",
    },
    green: {
        default: "linear-gradient(140deg, rgb(231, 252, 0),rgb(0, 161, 16))",
        hover: "linear-gradient(140deg, rgb(180, 196, 0),rgb(0, 133, 13))",
        header: "linear-gradient(140deg, rgb(174, 189, 1),rgb(0, 161, 16))",
    },
    yellow: {
        default: "linear-gradient(140deg, rgb(250, 250, 0),rgb(211, 151, 0))",
        hover: "linear-gradient(140deg, rgb(168, 168, 0),rgb(188, 138, 0))",
        header: "linear-gradient(140deg, rgb(220, 220, 0),rgb(196, 141, 2))",
    },
    orange: {
        default: "linear-gradient(140deg, rgb(250, 196, 0),rgb(218, 91, 0))",
        hover: "linear-gradient(140deg, rgb(227, 178, 0),rgb(192, 80, 0))",
        header:  "linear-gradient(140deg, rgb(227, 178, 0),rgb(192, 80, 0))",
    },
}

export const getBoardBackground = (color: string, isHovered: boolean) => {
    return isHovered ? boardColors[color]?.hover ||color :
    boardColors[color]?.default || color;
}