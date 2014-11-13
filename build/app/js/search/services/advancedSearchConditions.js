'use strict';

angular.module('app.search')
    .service('asConditions', function asConditions() {

        var self = this;

        var currentSeason = '2013';

        self.getOperators = function(){

            return {
                collection: [
                    {key: 'must', val: 'must be'},
                    {key: 'should', val: 'should be'},
                    {key: 'must_not', val: 'must not be'}
                ],
                default: 'must'
            };

        }


        self.getRelations = function(ctrl) {
            switch(ctrl) {
                case 'slider' :
                    return {
                        collection: [
                            {
                                key: 'eq',
                                val: 'absolutely'
                            },
                            {
                                key: 'from_to',
                                val: 'between'
                            },
                            {
                                key: 'gt',
                                val: '>'
                            },
                            {
                                key: 'gteq',
                                val: '>='
                            },
                            {
                                key: 'lt',
                                val: '<'
                            },
                            {
                                key: 'lteq',
                                val: '<='
                            }
                        ],
                        default: 'eq'
                    }
                    break;
                default :
                    return {
                        collection: [
                            {
                                key: 'eq',
                                val: 'is'
                            }
                        ],
                        default: 'eq'
                    }
                    break;

            }
        }

        self.conditions = {
            country: {
                name: 'country',
                key: ['country.name'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection: [],
                        default: 'Sweden'
                    },
                    slider: null,
                    format: 'string',
                    whitespace: true,
                    replace: ''
                },
                control:'dropdown',
                depends: ['league','country'],
                query: 'match'
            },
            shoots: {
                name: 'shoots',
                key: ['shoots'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection: [
                            'left',
                            'right'
                        ],
                        default: 'left'
                    },
                    slider: null,
                    format: 'string',
                    whitespace: false,
                    replace: '_'
                },
                control:'dropdown',
                depends:['shoots'],
                query: 'term'
            },
            position: {
                name: 'position',
                key: ['playerPosition'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection : [
                            'goalie',
                            'defenseman',
                            'forward',
                            'centre',
                            'left wing',
                            'right wing'
                        ],
                        default: 'goalie'
                    },
                    slider: null,
                    format:'string',
                    whitespace: false,
                    replace: '_'
                },
                control:'dropdown',
                depends:['position'],
                query: 'term'
            },
            age: {
                name: 'age',
                key: ['dateOfBirth'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 1,
                            ceil:50,
                            min: 16,
                            max: 45,
                            step:1
                        },
                        normal:{
                            floor: 1,
                            ceil:50,
                            value: 16,
                            step:1
                        },
                        default: 18
                    },
                    format:'date',
                    whitespace: false,
                    replace: '-'
                },
                control:'slider',
                depends:['age'],
                query: 'term'
            },
            league: {
                name: 'league',
                key: ['latestPlayerStats.league.name'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection: [],
                        default: 'SHL'
                    },
                    slider: null,
                    format: 'string',
                    whitespace: true,
                    replace: ''
                },
                control:'dropdown',
                depends:['league','country'],
                query: 'match'
            }/*,
             contractStatus: {
             name: 'contract status',
             key: 'contract_status',
             relations: {
             collection:[
             {
             key: 'eq',
             val: 'is'
             },
             {
             key: 'not_eq',
             val: 'is not'
             }
             ],
             default: 'eq'
             },
             operators: {
             collection: [
             'and',
             'or'
             ],
             default: 'and'
             },
             characteristics: {
             dropdown: {
             collection: [
             '',
             '',
             ''
             ],
             default: ''
             },
             slider: null,
             format: 'string'
             }
             }*/
            ,
            nationality: {
                name: 'nationality',
                key: ['country.name'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection: [],
                        default: 'Sweden'
                    },
                    slider: null,
                    format: 'string',
                    whitespace: true,
                    replace: ''
                },
                control:'dropdown',
                depends:['nationality','passport'],
                query:'match'
            },
            passport: {
                name: 'passport',
                key: ['secondaryCountry.name'],
                relations: self.getRelations(),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: {
                        collection: [],
                        default: 'Sweden'
                    },
                    slider: null,
                    format: 'string',
                    whitespace: true,
                    replace: ''
                },
                control:'dropdown',
                depends:['passport','nationality'],
                query:'match'
            }/*,
             height: {

             format:'number'
             }
             ,
             weight: {
             format:'number'
             }
             ,
             agentStatus: {
             format:'string'
             }
             ,
             seasons: {
             format:'number'
             }
             ,
             team: {
             format:'string'
             }*/
            ,
            goals: {
                name: 'Goals',
                key: ['latestPlayerStats.G'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['goals','position'],
                query:'term'
            }
            ,
            assists: {
                name: 'Assists',
                key: ['latestPlayerStats.A'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['assists','position'],
                query:'term'
            },
            TP: {
                name: 'TP',
                key: ['latestPlayerStats.TP'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['TP','position'],
                query:'term'
            },
            GAA: {
                name: 'GAA',
                key: ['latestPlayerStats.GAA'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['GAA','position'],
                query:'term'
            },
            GP: {
                name: 'GP',
                key: ['latestPlayerStats.GP'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['GP','position'],
                query:'term'
            },
            PIM: {
                name: 'PIM',
                key: ['latestPlayerStats.PIM'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['PIM','position'],
                query:'term'
            },
            PM: {
                name: 'PM',
                key: ['latestPlayerStats.PM'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['PM','position'],
                query:'term'
            },
            SVP: {
                name: 'SVP',
                key: ['latestPlayerStats.SVP'],
                relations: self.getRelations('slider'),
                operators: self.getOperators(),
                characteristics: {
                    dropdown: null,
                    slider:{
                        range: {
                            floor: 0,
                            ceil:100,
                            min: 10,
                            max: 50,
                            step:1
                        },
                        normal:{
                            floor: 0,
                            ceil:100,
                            value: 1,
                            step:1
                        },
                        default: 1
                    },
                    format:'number',
                    whitespace: true,
                    replace: ''
                },
                control:'slider',
                depends:['SVP','position'],
                query:'term'
            }


        };
    });