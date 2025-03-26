export const boardColors: Record<string, { default: string, hover: string, menu: string, header: string }> = {
    purple: {
        default: "linear-gradient(140deg, rgb(204, 0, 250),rgb(104, 0, 168))",
        hover: "linear-gradient(140deg, rgb(152, 0, 186),rgb(70, 0, 114))",
        menu: "linear-gradient(140deg, rgb(152, 0, 186),rgb(98, 0, 136))",
        header: "linear-gradient(140deg, rgb(152, 0, 186),rgb(98, 0, 136))",
    },
    pink: {
        default: "linear-gradient(140deg, rgb(252, 0, 118),rgb(130, 0, 106))",
        hover: "linear-gradient(140deg, rgb(217, 0, 101),rgb(113, 0, 92))",
        menu: "linear-gradient(140deg, rgb(219, 0, 102),rgb(113, 0, 92))",
        header: "linear-gradient(140deg, rgb(219, 0, 102),rgb(113, 0, 92))",
    },
    sunrise: {
        default: "linear-gradient(140deg, rgb(255, 0, 157), rgb(250, 242, 0))",
        hover: "linear-gradient(140deg, rgb(226, 0, 139), rgb(208, 201, 0))",
        menu: "linear-gradient(140deg, rgb(226, 0, 139), rgb(183, 164, 0))",
        header: "linear-gradient(360deg,  rgb(147, 0, 91),  rgb(202, 0, 125))",
    },
    orange: {
        default: "linear-gradient(140deg, rgb(250, 196, 0),rgb(218, 91, 0))",
        hover: "linear-gradient(140deg, rgb(227, 178, 0),rgb(192, 80, 0))",
        menu: "linear-gradient(140deg, rgb(227, 178, 0),rgb(192, 80, 0))",
        header: "linear-gradient(140deg, rgb(227, 178, 0),rgb(192, 80, 0))",
        
    },
   
    tropical: {
        default: "linear-gradient(140deg, rgb(117, 250, 0),rgb(218, 0, 164))",
        hover: "linear-gradient(140deg, rgb(101, 217, 0),rgb(192, 0, 144))",
        menu: "linear-gradient(140deg, rgb(95, 205, 0),rgb(98, 178, 0))",
        header: "linear-gradient(360deg, rgb(81, 174, 0),rgb(182, 0, 136))",
    },
    green: {
        default: "linear-gradient(140deg, rgb(231, 252, 0),rgb(0, 161, 16))",
        hover: "linear-gradient(140deg, rgb(180, 196, 0),rgb(0, 133, 13))",
        menu: "linear-gradient(140deg, rgb(174, 189, 1),rgb(0, 161, 16))",
        header: "linear-gradient(140deg, rgb(174, 189, 1),rgb(0, 161, 16))",
    },
    seaGrass: {
        default: "linear-gradient(140deg, rgb(0, 221, 255), rgb(187, 250, 0))",
        hover: "linear-gradient(140deg, rgb(0, 193, 222), rgb(162, 216, 0))",
        menu: "linear-gradient(140deg, rgb(0, 193, 222), rgb(162, 216, 0))",
        header: "linear-gradient(140deg, rgb(0, 193, 222), rgb(162, 216, 0))",
    },
        yellow: {
        default: "linear-gradient(140deg, rgb(250, 250, 0),rgb(211, 151, 0))",
        hover: "linear-gradient(140deg, rgb(168, 168, 0),rgb(188, 138, 0))",
        menu: "linear-gradient(140deg, rgb(220, 220, 0),rgb(196, 141, 2))",
        header: "linear-gradient(140deg, rgb(220, 220, 0),rgb(196, 141, 2))",
    },
    blue: {
        default: "linear-gradient(140deg, rgb(0, 252, 239),rgb(2, 83, 110))",
        hover: "linear-gradient(140deg, rgb(3, 232, 198),rgb(0, 36, 79))",
        menu: "linear-gradient(140deg, rgb(3, 212, 215),rgb(0, 95, 122))",
        header: "linear-gradient(140deg, rgb(3, 212, 215),rgb(0, 95, 122))",
    },
}

export const getBoardBackground = (color: string, isHovered: boolean) => {
    return isHovered ? boardColors[color]?.hover || color :
        boardColors[color]?.default || color;
}