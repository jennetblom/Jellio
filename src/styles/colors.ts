export const boardColors: Record<string, { default: string, hover: string, menu: string, header: string, sidebar: string }> = {
    purple: {
        default: "linear-gradient(140deg, rgb(162, 0, 250),rgb(255, 0, 170))",
        hover:  "linear-gradient(140deg, rgb(149, 0, 230),rgb(213, 0, 142))",
        menu: "linear-gradient(140deg, rgb(149, 0, 230),rgb(192, 0, 128))",
        header: "linear-gradient(140deg, rgb(152, 0, 186),rgb(98, 0, 136))",
        sidebar: "linear-gradient(140deg, rgb(138, 0, 169),rgb(80, 0, 112))",
    },    

    sunrise: {
        default: "linear-gradient(140deg, rgb(255, 0, 157), rgb(250, 242, 0))",
        hover: "linear-gradient(140deg, rgb(226, 0, 139), rgb(208, 201, 0))",
        menu: "linear-gradient(140deg, rgb(226, 0, 139), rgb(183, 164, 0))",
        header: "linear-gradient(360deg,  rgb(147, 0, 91),  rgb(202, 0, 125))",
        sidebar: "linear-gradient(360deg,  rgb(118, 0, 73),  rgb(173, 0, 107))",
    },
    orange: {
        default: "linear-gradient(140deg, rgb(189, 0, 218),rgb(250, 142, 0))",
        hover:  "linear-gradient(140deg, rgb(166, 0, 192),rgb(223, 126, 0))",
        menu: "linear-gradient(140deg, rgb(166, 0, 192),rgb(208, 118, 0))",
        header: "linear-gradient(140deg, rgb(137, 0, 159),rgb(163, 92, 0))",
        sidebar: "linear-gradient(140deg, rgb(118, 0, 136),rgb(138, 78, 0))",
    },
    blue: {
        default: "linear-gradient(140deg, rgb(0, 129, 172),rgb(0, 252, 239))",
        hover:  "linear-gradient(140deg, rgb(0, 72, 96),rgb(0, 225, 214))",
        menu:  "linear-gradient(140deg, rgb(0, 109, 145),rgb(1, 206, 196))",
        header:  "linear-gradient(140deg, rgb(0, 80, 106),rgb(0, 177, 169))",
        sidebar: "linear-gradient(140deg, rgb(0, 69, 92),rgb(0, 145, 138))",
    },
    yellow: {
        default: "linear-gradient(140deg, rgb(146, 0, 250),rgb(246, 255, 0))",
        hover: "linear-gradient(140deg, rgb(132, 0, 226),rgb(214, 222, 0))",
        menu: "linear-gradient(140deg, rgb(119, 0, 203),rgb(179, 185, 0))",
        header: "linear-gradient(140deg, rgb(97, 0, 166),rgb(127, 132, 0))",
        sidebar: "linear-gradient(140deg, rgb(76, 0, 131),rgb(93, 96, 0))",
    },
    pink: {
        default: "linear-gradient(140deg, rgb(140, 0, 114),rgb(252, 0, 118))",
        hover:  "linear-gradient(140deg, rgb(113, 0, 92),rgb(217, 0, 101))",
        menu: "linear-gradient(140deg, rgb(121, 0, 99),rgb(194, 0, 94))",
        header: "linear-gradient(140deg, rgb(113, 0, 92),rgb(113, 0, 92))",
        sidebar: "linear-gradient(140deg, rgb(92, 0, 75),rgb(92, 0, 75))",
    },
    tropical: {
        default: "linear-gradient(140deg, rgb(255, 0, 191),rgb(117, 250, 0))",
        hover: "linear-gradient(140deg, rgb(222, 0, 166),rgb(105, 226, 0))",
        menu: "linear-gradient(140deg, rgb(222, 0, 166),rgb(105, 226, 0))",
        header: "linear-gradient(140deg, rgb(193, 0, 145),rgb(91, 195, 0))",
        sidebar: "linear-gradient(140deg, rgb(168, 0, 126),rgb(77, 166, 0))",
    },
    green: {
        default: "linear-gradient(140deg, rgb(0, 155, 49),rgb(254, 250, 1))",
        hover: "linear-gradient(140deg, rgb(0, 140, 44),rgb(213, 210, 0))",
        menu: "linear-gradient(140deg, rgb(0, 140, 44),rgb(189, 186, 0))",
        header: "linear-gradient(140deg, rgb(0, 113, 36),rgb(164, 161, 0))",
        sidebar: "linear-gradient(140deg, rgb(0, 80, 25),rgb(135, 133, 0))",
    },
    seaGrass: {
        default: "linear-gradient(140deg, rgb(0, 221, 255), rgb(187, 250, 0))",
        hover: "linear-gradient(140deg, rgb(0, 181, 209), rgb(149, 199, 0))",
        menu: "linear-gradient(140deg, rgb(0, 164, 190), rgb(141, 188, 0))",
        header: "linear-gradient(140deg, rgb(0, 133, 153), rgb(109, 145, 0))",
        sidebar: "linear-gradient(140deg, rgb(0, 118, 136), rgb(93, 124, 0))",
    },
   
   
}

export const getBoardBackground = (color: string, isHovered: boolean) => {
    return isHovered ? boardColors[color]?.hover || color :
        boardColors[color]?.default || color;
}