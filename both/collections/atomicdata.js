/**
 * @description
 * # Getting Data from AtomicData
 * ```javascript
 * var h = AtomicData.findOne{symbol: 'h'};
 * ```
 * ## Currently Available Data
 * * `number {int}`
 * * `name {string}`
 * * `symbol {string}`
 * * `color {hex}`
 * * `atomicRadius {float}`
 * ## Where did the data come from?
 * * [Wolfram Alpha][1], search: ''hydrogen atomic radius''
 * * [Wikipedia][2], search: ''hydrogen''
 * ## How did I choose the atomic radii? Moving down the list when unavailable
 * 1. Use calculated atomic radius from [Wolfram Alpha][1]
 * 2. Use empirical atomic radius from [Wolfram Alpha][1]
 * 3. Use covalent radius from [Wolfram Alpha][1]
 * 4. Use [Wikipedia][2], calculated, empirical, or covalent
 * 5. Use 2.00
 * ## To do:
 * * Hard code colors
 * ** Use CPK for standard elements
 * ** When unknown, use elements appearance (when possible)
 * [1]: http://www.wolframalpha.com
 * [2]: https://www.wikipedia.org
 */

AtomicData = new Mongo.Collection('atomicdata');
if (Meteor.isServer) {
    if (AtomicData.find().count() === 0) {
        // CPK color scheme
        var hydrogen = 0xffffff;
        var carbon = 0xc8c8c8;
        var oxygen = 0xf00000;
        var nitrogen = 0x8f8fff;
        var sulfur = 0xffc832;
        var phosphorus = 0xffa500;
        var chlorine = 0x00ff00;
        var bromine = 0xa52a2a;
        var sodium = 0x0000ff;
        var magnesium = 0x2a802a;
        var calcium = 0x808090;
        var unknown = 0xff1493;

        // Calculated Atomic Radius comes from WolframAlpha (converted to Angstrom)
        // --> If no calculated, use empirical
        // --> else if no empirical, use covalent
        // --> else if no data, use wikipedia
        // --> else if no wikipedia, use 2.00
        AtomicData.insert({
            number: 1,
            name: 'hydrogen',
            symbol: 'h',
            color: hydrogen,
            atomicRadius: 0.53
        });

        AtomicData.insert({
            number: 2,
            name: 'helium',
            symbol: 'he',
            color: unknown,
            atomicRadius: 0.31
        });

        AtomicData.insert({
            number: 3,
            name: 'lithium',
            symbol: 'li',
            color: unknown,
            atomicRadius: 1.67
        });

        AtomicData.insert({
            number: 4,
            name: 'beryllium',
            symbol: 'be',
            color: unknown,
            atomicRadius: 1.12
        });

        AtomicData.insert({
            number: 5,
            name: 'boron',
            symbol: 'b',
            color: unknown,
            atomicRadius: 0.87
        });

        AtomicData.insert({
            number: 6,
            name: 'carbon',
            symbol: 'c',
            color: carbon,
            atomicRadius: 0.67
        });

        AtomicData.insert({
            number: 7,
            name: 'nitrogen',
            symbol: 'n',
            color: nitrogen,
            atomicRadius: 0.56
        });

        AtomicData.insert({
            number: 8,
            name: 'oxygen',
            symbol: 'o',
            color: oxygen,
            atomicRadius: 0.48
        });

        AtomicData.insert({
            number: 9,
            name: 'fluorine',
            symbol: 'f',
            color: unknown,
            atomicRadius: 0.42
        });

        AtomicData.insert({
            number: 10,
            name: 'neon',
            symbol: 'ne',
            color: unknown,
            atomicRadius: 0.38
        });

        AtomicData.insert({
            number: 11,
            name: 'sodium',
            symbol: 'na',
            color: sodium,
            atomicRadius: 1.90
        });

        AtomicData.insert({
            number: 12,
            name: 'magnesium',
            symbol: 'mg',
            color: magnesium,
            atomicRadius: 1.45
        });

        AtomicData.insert({
            number: 13,
            name: 'aluminum',
            symbol: 'al',
            color: unknown,
            atomicRadius: 1.18
        });

        AtomicData.insert({
            number: 14,
            name: 'silicon',
            symbol: 'si',
            color: unknown,
            atomicRadius: 1.11
        });

        AtomicData.insert({
            number: 15,
            name: 'phosphorus',
            symbol: 'p',
            color: phosphorus,
            atomicRadius: 0.98
        });

        AtomicData.insert({
            number: 16,
            name: 'sulfur',
            symbol: 's',
            color: sulfur,
            atomicRadius: 0.88
        });

        AtomicData.insert({
            number: 17,
            name: 'chlorine',
            symbol: 'cl',
            color: chlorine,
            atomicRadius: 0.79
        });

        AtomicData.insert({
            number: 18,
            name: 'argon',
            symbol: 'ar',
            color: unknown,
            atomicRadius: 0.71
        });

        AtomicData.insert({
            number: 19,
            name: 'potassium',
            symbol: 'k',
            color: unknown,
            atomicRadius: 2.43
        });

        AtomicData.insert({
            number: 20,
            name: 'calcium',
            symbol: 'ca',
            color: calcium,
            atomicRadius: 1.94
        });

        AtomicData.insert({
            number: 21,
            name: 'scandium',
            symbol: 'sc',
            color: unknown,
            atomicRadius: 1.84
        });

        AtomicData.insert({
            number: 22,
            name: 'titanium',
            symbol: 'ti',
            color: unknown,
            atomicRadius: 1.76
        });

        AtomicData.insert({
            number: 23,
            name: 'vanadium',
            symbol: 'v',
            color: unknown,
            atomicRadius: 1.71
        });

        AtomicData.insert({
            number: 24,
            name: 'chromium',
            symbol: 'cr',
            color: unknown,
            atomicRadius: 1.66
        });

        AtomicData.insert({
            number: 25,
            name: 'manganese',
            symbol: 'mn',
            color: unknown,
            atomicRadius: 1.40
        });

        AtomicData.insert({
            number: 26,
            name: 'iron',
            symbol: 'fe',
            color: unknown,
            atomicRadius: 1.56
        });

        AtomicData.insert({
            number: 27,
            name: 'cobalt',
            symbol: 'co',
            color: unknown,
            atomicRadius: 1.35
        });

        AtomicData.insert({
            number: 28,
            name: 'nickel',
            symbol: 'ni',
            color: unknown,
            atomicRadius: 1.49
        });

        AtomicData.insert({
            number: 29,
            name: 'copper',
            symbol: 'cu',
            color: unknown,
            atomicRadius: 1.45
        });

        AtomicData.insert({
            number: 30,
            name: 'zinc',
            symbol: 'zn',
            color: unknown,
            atomicRadius: 1.42
        });

        AtomicData.insert({
            number: 31,
            name: 'gallium',
            symbol: 'ga',
            color: unknown,
            atomicRadius: 1.36
        });

        AtomicData.insert({
            number: 32,
            name: 'germanium',
            symbol: 'ge',
            color: unknown,
            atomicRadius: 1.25
        });

        AtomicData.insert({
            number: 33,
            name: 'arsenic',
            symbol: 'as',
            color: unknown,
            atomicRadius: 1.14
        });

        AtomicData.insert({
            number: 34,
            name: 'selenium',
            symbol: 'se',
            color: unknown,
            atomicRadius: 1.03
        });

        AtomicData.insert({
            number: 35,
            name: 'bromine',
            symbol: 'br',
            color: bromine,
            atomicRadius: 0.94
        });

        AtomicData.insert({
            number: 36,
            name: 'krypton',
            symbol: 'kr',
            color: unknown,
            atomicRadius: 0.88
        });

        AtomicData.insert({
            number: 37,
            name: 'rubidium',
            symbol: 'rb',
            color: unknown,
            atomicRadius: 2.65
        });

        AtomicData.insert({
            number: 38,
            name: 'strontium',
            symbol: 'sr',
            color: unknown,
            atomicRadius: 2.19
        });

        AtomicData.insert({
            number: 39,
            name: 'yttrium',
            symbol: 'y',
            color: unknown,
            atomicRadius: 2.12
        });

        AtomicData.insert({
            number: 40,
            name: 'zirconium',
            symbol: 'zr',
            color: unknown,
            atomicRadius: 2.06
        });

        AtomicData.insert({
            number: 41,
            name: 'niobium',
            symbol: 'nb',
            color: unknown,
            atomicRadius: 1.98
        });

        AtomicData.insert({
            number: 42,
            name: 'molybdenum',
            symbol: 'mo',
            color: unknown,
            atomicRadius: 1.90
        });

        AtomicData.insert({
            number: 43,
            name: 'technetium',
            symbol: 'tc',
            color: unknown,
            atomicRadius: 1.83
        });

        AtomicData.insert({
            number: 44,
            name: 'ruthenium',
            symbol: 'ru',
            color: unknown,
            atomicRadius: 1.78
        });

        AtomicData.insert({
            number: 45,
            name: 'rhodium',
            symbol: 'rh',
            color: unknown,
            atomicRadius: 1.73
        });

        AtomicData.insert({
            number: 46,
            name: 'palladium',
            symbol: 'pd',
            color: unknown,
            atomicRadius: 1.69
        });

        AtomicData.insert({
            number: 47,
            name: 'silver',
            symbol: 'ag',
            color: unknown,
            atomicRadius: 1.65
        });

        AtomicData.insert({
            number: 48,
            name: 'cadmium',
            symbol: 'cd',
            color: unknown,
            atomicRadius: 1.61
        });

        AtomicData.insert({
            number: 49,
            name: 'indium',
            symbol: 'in',
            color: unknown,
            atomicRadius: 1.56
        });

        AtomicData.insert({
            number: 50,
            name: 'tin',
            symbol: 'sn',
            color: unknown,
            atomicRadius: 1.45
        });

        AtomicData.insert({
            number: 51,
            name: 'antimony',
            symbol: 'sb',
            color: unknown,
            atomicRadius: 1.33
        });

        AtomicData.insert({
            number: 52,
            name: 'tellurium',
            symbol: 'te',
            color: unknown,
            atomicRadius: 1.23
        });

        AtomicData.insert({
            number: 53,
            name: 'iodine',
            symbol: 'i',
            color: unknown,
            atomicRadius: 1.15
        });

        AtomicData.insert({
            number: 54,
            name: 'xenon',
            symbol: 'xe',
            color: unknown,
            atomicRadius: 1.08
        });

        AtomicData.insert({
            number: 55,
            name: 'cesium',
            symbol: 'ce',
            color: unknown,
            atomicRadius: 2.98
        });

        AtomicData.insert({
            number: 56,
            name: 'barium',
            symbol: 'ba',
            color: unknown,
            atomicRadius: 2.53
        });

        AtomicData.insert({
            number: 57,
            name: 'lanthanum',
            symbol: 'la',
            color: unknown,
            atomicRadius: 1.95
        });

        AtomicData.insert({
            number: 58,
            name: 'cerium',
            symbol: 'ce',
            color: unknown,
            atomicRadius: 1.85
        });

        AtomicData.insert({
            number: 59,
            name: 'praseodymium',
            symbol: 'pr',
            color: unknown,
            atomicRadius: 2.47
        });

        AtomicData.insert({
            number: 60,
            name: 'neodymium',
            symbol: 'nd',
            color: unknown,
            atomicRadius: 2.06
        });

        AtomicData.insert({
            number: 61,
            name: 'promethium',
            symbol: 'pm',
            color: unknown,
            atomicRadius: 2.05
        });

        AtomicData.insert({
            number: 62,
            name: 'samarium',
            symbol: 'sm',
            color: unknown,
            atomicRadius: 2.38
        });

        AtomicData.insert({
            number: 63,
            name: 'europium',
            symbol: 'eu',
            color: unknown,
            atomicRadius: 2.31
        });

        AtomicData.insert({
            number: 64,
            name: 'gadolinium',
            symbol: 'gd',
            color: unknown,
            atomicRadius: 2.33
        });

        AtomicData.insert({
            number: 65,
            name: 'terbium',
            symbol: 'tb',
            color: unknown,
            atomicRadius: 2.25
        });

        AtomicData.insert({
            number: 66,
            name: 'dysprosium',
            symbol: 'dy',
            color: unknown,
            atomicRadius: 2.28
        });

        AtomicData.insert({
            number: 67,
            name: 'holmium',
            symbol: 'ho',
            color: unknown,
            atomicRadius: 2.26
        });

        AtomicData.insert({
            number: 68,
            name: 'erbium',
            symbol: 'er',
            color: unknown,
            atomicRadius: 2.26
        });

        AtomicData.insert({
            number: 69,
            name: 'thulium',
            symbol: 'tm',
            color: unknown,
            atomicRadius: 2.22
        });

        AtomicData.insert({
            number: 70,
            name: 'ytterbium',
            symbol: 'yb',
            color: unknown,
            atomicRadius: 2.22
        });

        AtomicData.insert({
            number: 71,
            name: 'lutetium',
            symbol: 'lu',
            color: unknown,
            atomicRadius: 2.17
        });

        AtomicData.insert({
            number: 72,
            name: 'hafnium',
            symbol: 'hf',
            color: unknown,
            atomicRadius: 2.08
        });

        AtomicData.insert({
            number: 73,
            name: 'tantalum',
            symbol: 'ta',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 74,
            name: 'tungsten',
            symbol: 'w',
            color: unknown,
            atomicRadius: 1.93
        });

        AtomicData.insert({
            number: 75,
            name: 'rhenium',
            symbol: 're',
            color: unknown,
            atomicRadius: 1.88
        });

        AtomicData.insert({
            number: 76,
            name: 'osmium',
            symbol: 'os',
            color: unknown,
            atomicRadius: 1.85
        });

        AtomicData.insert({
            number: 77,
            name: 'iridium',
            symbol: 'ir',
            color: unknown,
            atomicRadius: 1.80
        });

        AtomicData.insert({
            number: 78,
            name: 'platinum',
            symbol: 'pt',
            color: unknown,
            atomicRadius: 1.77
        });

        AtomicData.insert({
            number: 79,
            name: 'gold',
            symbol: 'au',
            color: unknown,
            atomicRadius: 1.74
        });

        AtomicData.insert({
            number: 80,
            name: 'mercury',
            symbol: 'hg',
            color: unknown,
            atomicRadius: 1.71
        });

        AtomicData.insert({
            number: 81,
            name: 'thallium',
            symbol: 'tk',
            color: unknown,
            atomicRadius: 1.56
        });

        AtomicData.insert({
            number: 82,
            name: 'lead',
            symbol: 'pb',
            color: unknown,
            atomicRadius: 1.54
        });

        AtomicData.insert({
            number: 83,
            name: 'bismuth',
            symbol: 'bi',
            color: unknown,
            atomicRadius: 1.43
        });

        AtomicData.insert({
            number: 84,
            name: 'polonium',
            symbol: 'po',
            color: unknown,
            atomicRadius: 1.35
        });

        AtomicData.insert({
            number: 85,
            name: 'astatine',
            symbol: 'at',
            color: unknown,
            atomicRadius: 1.27
        });

        AtomicData.insert({
            number: 86,
            name: 'radon',
            symbol: 'rn',
            color: unknown,
            atomicRadius: 1.20
        });

        AtomicData.insert({
            number: 87,
            name: 'francium',
            symbol: 'fr',
            color: unknown,
            atomicRadius: 2.60
        });

        AtomicData.insert({
            number: 88,
            name: 'radium',
            symbol: 'ra',
            color: unknown,
            atomicRadius: 2.15
        });

        AtomicData.insert({
            number: 89,
            name: 'actinium',
            symbol: 'ac',
            color: unknown,
            atomicRadius: 1.95
        });

        AtomicData.insert({
            number: 90,
            name: 'thorium',
            symbol: 'th',
            color: unknown,
            atomicRadius: 1.80
        });

        AtomicData.insert({
            number: 91,
            name: 'protactinium',
            symbol: 'pa',
            color: unknown,
            atomicRadius: 1.80
        });

        AtomicData.insert({
            number: 92,
            name: 'uranium',
            symbol: 'u',
            color: unknown,
            atomicRadius: 1.75
        });

        AtomicData.insert({
            number: 93,
            name: 'neptunium',
            symbol: 'np',
            color: unknown,
            atomicRadius: 1.75
        });

        AtomicData.insert({
            number: 94,
            name: 'plutonium',
            symbol: 'pu',
            color: unknown,
            atomicRadius: 1.75
        });

        AtomicData.insert({
            number: 95,
            name: 'americium',
            symbol: 'am',
            color: unknown,
            atomicRadius: 1.75
        });

        AtomicData.insert({
            number: 96,
            name: 'curium',
            symbol: 'cm',
            color: unknown,
            atomicRadius: 1.69
        });

        AtomicData.insert({
            number: 97,
            name: 'berkelium',
            symbol: 'bk',
            color: unknown,
            atomicRadius: 1.70
        });

        AtomicData.insert({
            number: 98,
            name: 'californium',
            symbol: 'cf',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 99,
            name: 'einsteinium',
            symbol: 'es',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 100,
            name: 'fermium',
            symbol: 'fm',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 101,
            name: 'mendelevium',
            symbol: 'md',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 102,
            name: 'nobelium',
            symbol: 'no',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 103,
            name: 'lawrencium',
            symbol: 'lr',
            color: unknown,
            atomicRadius: 2.00
        });

        AtomicData.insert({
            number: 104,
            name: 'rutherfordium',
            symbol: 'rf',
            color: unknown,
            atomicRadius: 1.50
        });

        AtomicData.insert({
            number: 105,
            name: 'dubnium',
            symbol: 'db',
            color: unknown,
            atomicRadius: 1.39
        });

        AtomicData.insert({
            number: 106,
            name: 'seaborgium',
            symbol: 'sg',
            color: unknown,
            atomicRadius: 1.32
        });

        AtomicData.insert({
            number: 107,
            name: 'bohrium',
            symbol: 'bh',
            color: unknown,
            atomicRadius: 1.28
        });

        AtomicData.insert({
            number: 108,
            name: 'hassium',
            symbol: 'hs',
            color: unknown,
            atomicRadius: 1.26
        });

        AtomicData.insert({
            number: 109,
            name: 'meitnerium',
            symbol: 'mt',
            color: unknown,
            atomicRadius: 1.28
        });

        AtomicData.insert({
            number: 110,
            name: 'darmstadtium',
            symbol: 'ds',
            color: unknown,
            atomicRadius: 1.32
        });

        AtomicData.insert({
            number: 111,
            name: 'roentgenium',
            symbol: 'rg',
            color: unknown,
            atomicRadius: 1.38
        });

        AtomicData.insert({
            number: 112,
            name: 'copernicium',
            symbol: 'cn',
            color: unknown,
            atomicRadius: 1.47
        });

        AtomicData.insert({
            number: 113,
            name: 'ununtrium',
            symbol: 'uut',
            color: unknown,
            atomicRadius: 1.70
        });

        AtomicData.insert({
            number: 114,
            name: 'flerovium',
            symbol: 'fl',
            color: unknown,
            atomicRadius: 1.80
        });

        AtomicData.insert({
            number: 115,
            name: 'ununpentium',
            symbol: 'uup',
            color: unknown,
            atomicRadius: 1.87
        });

        AtomicData.insert({
            number: 116,
            name: 'livermorium',
            symbol: 'lv',
            color: unknown,
            atomicRadius: 1.83
        });

        AtomicData.insert({
            number: 117,
            name: 'ununseptium',
            symbol: 'uus',
            color: unknown,
            atomicRadius: 1.83
        });

        AtomicData.insert({
            number: 118,
            name: 'ununoctium',
            symbol: '118',
            color: unknown,
            atomicRadius: 1.57
        });
    }
}

if (Meteor.isServer) {
    Meteor.publish('atomicdata', function () {
        return AtomicData.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('atomicdata')
}
