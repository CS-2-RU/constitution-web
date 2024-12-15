import Rule1p1 from "../components/Rules/1.1";
import Rule1p2 from "../components/Rules/1.2";
import Rule1p3 from "../components/Rules/1.3";
import Rule1p4 from "../components/Rules/1.4";
import Rule1p5 from "../components/Rules/1.5";
import Rule1p6 from "../components/Rules/1.6";
import Rule1p7 from "../components/Rules/1.7";
import Rule1p8 from "../components/Rules/1.8";
import Rule1p9 from "../components/Rules/1.9";
import Rule1p10 from "../components/Rules/1.10";
import Rule1p11 from "../components/Rules/1.11";
import Rule1p12 from "../components/Rules/1.12";
import Rule2p1 from "../components/Rules/2.1";
import Rule2p2 from "../components/Rules/2.2";
import Rule2p3 from "../components/Rules/2.3";
import Rule2p4 from "../components/Rules/2.4";
import Rule3p1 from "../components/Rules/3.1";
import Rule3p2 from "../components/Rules/3.2";
import Rule3p3 from "../components/Rules/3.3";
import Rule3p4 from "../components/Rules/3.4";
import Rule4p1 from "../components/Rules/4.1";
import Rule4p2 from "../components/Rules/4.2";
import Rule4p3 from "../components/Rules/4.3";
import Rule4p4 from "../components/Rules/4.4";
import Profiles from "../components/Rules/Profiles";
import CheatCheck from "../components/Rules/CheatCheck";
import NavigationMap from "../components/Rules/NavigationMap";

export const rules = {
    "Основные": {
        "1.1": {
            short_description: "Оскорбление участников сервера",
            element: Rule1p1,
            keywords: ['1.1']
        },
        "1.2": {
            short_description: "КАПС, флуд и оффтоп",
            element: Rule1p2,
            keywords: ['1.2']
        },
        "1.3": {
            short_description: "Непингуемые никнеймы",
            element: Rule1p3,
            keywords: ['1.3']
        },
        "1.4": {
            short_description: "Сторонние программы и проверки",
            element: Rule1p4,
            keywords: ['1.4']
        },
        "1.5": {
            short_description: "Обман/скам участников сервера",
            element: Rule1p5,
            keywords: ['1.5']
        },
        "1.6": {
            short_description: "Твинк аккаунты",
            element: Rule1p6,
            keywords: ['1.6']
        },
        "1.7": {
            short_description: "Обход блокировки",
            element: Rule1p7,
            keywords: ['1.7']
        },
        "1.8": {
            short_description: "Оскорбление родных",
            element: Rule1p8,
            keywords: ['1.8']
        },
        "1.9": {
            short_description: "Политические и религиозные темы",
            element: Rule1p9,
            keywords: ['1.9']
        },
        "1.10": {
            short_description: "Распространение личной информации",
            element: Rule1p10,
            keywords: ['1.10']
        },
        "1.11": {
            short_description: "Нарушение правил сообщества Discord",
            element: Rule1p11,
            keywords: ['1.11']
        },
        "1.12": {
            short_description: "Вредоносные действия по отношению к серверу",
            element: Rule1p12,
            keywords: ['1.12']
        },
    }, "Реклама": {
        "2.1": {
            short_description: "Рекламная и предпринимательская деятельность",
            element: Rule2p1,
            keywords: ['2.1']
        },
        "2.2": {
            short_description: "Попрошайничество",
            element: Rule2p2,
            keywords: ['2.2']
        },
        "2.3": {
            short_description: "Покупка/продажа/обмен скинов, ключей, аккаунтов и т.п.",
            element: Rule2p3,
            keywords: ['2.3']
        },
        "2.4": {
            short_description: "Переманивание участников сервера",
            element: Rule2p4,
            keywords: ['2.4']
        },
    }, "Администрация": {
        "3.1": {
            short_description: "Выдача себя за администрацию",
            element: Rule3p1,
            keywords: ['3.1']
        },
        "3.2": {
            short_description: "Оскорбление администрации",
            element: Rule3p2,
            keywords: ['3.2']
        },
        "3.3": {
            short_description: "Несоблюдение прочих правил, указанных администрацией",
            element: Rule3p3,
            keywords: ['3.3']
        },
        "3.4": {
            short_description: "Обман администрации",
            element: Rule3p4,
            keywords: ['3.4']
        },
    }, "Голосовые каналы": {
        "4.1": {
            short_description: "Помехи в голосовом канале",
            element: Rule4p2,
            keywords: ['4.1']
        },
        "4.2": {
            short_description: "Трансляция звуков и голоса",
            element: Rule4p1,
            keywords: ['4.2']
        },
        "4.3": {
            short_description: "Порча игры находясь в голосовом канале",
            element: Rule4p3,
            keywords: ['4.3']
        },
        "4.4": {
            short_description: "Препятствие нормальной игре",
            element: Rule4p4,
            keywords: ['4.4']
        },
    },
    "Прочее": {
        "Профили пользователей": {
            short_description: "Все, что связано с профилями",
            element: Profiles,
            keywords: ['4.4']
        },
        "Проверка на читы": {
            short_description: "Все, что нужно знать про проверки",
            element: CheatCheck,
            keywords: ['4.4']
        },
        "Карта Навигация": {
            short_description: "Прочие важные моменты",
            element: NavigationMap,
            keywords: ['4.4']
        }
    }
}