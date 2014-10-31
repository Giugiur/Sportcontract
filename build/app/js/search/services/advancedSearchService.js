/**
 * Created by thgoede on 11.06.14.
 */
'use strict';

angular.module('app.search')
    .service('asService', ['asConditions','$compile',function asService(asConditions,$compile){
        var self = this;

        self.conditions = asConditions.conditions;

        self.modules =
        {
            player : ['nationality','passport','shoots','age','dateOfBirth','position','league','team','goals','assists','TP','GP','GAA','SVP','PIM','PM']
        }
        ;

        self.loadModule = function(mod){

            return self.modules[mod];


        };

        self.loadConditions = function(mod){
            var conditions = [];
            for(var i in mod){
                conditions.push(self.conditions[mod[i]]);
            }

            return conditions;
        };
/*
        self.loadConditionCharacteristics = function(conditions){
            angular.forEach(conditions, function(val,key){
                if(val !== undefined) {
                    var cond = val.name;
                    if (cond == 'country' || cond == 'nationality' || cond == 'passport') {
                        Countries.getCountriesNames().then(function (data) {
                            conditions[key].characteristics.dropdown.collection = data;
                        });
                    } else if (cond == 'league') {
                        Leagues.getLeaguesNames().then(function (data) {
                            conditions[key].characteristics.dropdown.collection = data;
                        });
                    }

                }
            });

            return conditions;
        }
*/
        self.loadConditionVals = function(condition){

            return self.conditions[condition];
        }
/*
        self.checkDependencies = function(newFilter, filters){
            angular.forEach(filters.conditions, function(filter){

                var index = newFilter.characteristics.dropdown.collection.indexOf(filter.condition.value);
                newFilter.characteristics.dropdown.collection.splice(index,1);

            });

            return newFilter;
        }
 */
        self.getDirective = function(condition){

            return "";

        };

        self.addFilter = function (condition,newFilter) {

            return {condition : {

                active: true,
                name : condition,
                operator: newFilter.operators.default,
                operators: newFilter.operators.collection,
                key: newFilter.key,
                relation: newFilter.relations.default,
                relations: newFilter.relations.collection,
                char_ctrl: newFilter.control,
                char:  newFilter.characteristics[newFilter.control],
                value: newFilter.characteristics[newFilter.control].default,
                format: newFilter.characteristics.format,
                whitespace : newFilter.characteristics.whitespace,
                replace : newFilter.characteristics.replace,
                query: newFilter.query

            }};


        }

        self.convertValue = function(value, whitespace, replace){
            if(!whitespace){
                return value.replace(' ',replace);
            }

            return value;
        }

/*
        self.getDirectives = function(){

            return "<div class=\"as-row\" ng-repeat=\"filter in filters\">{{filter.condition}}</div>";
        }

        //<as-condition component-api=\"filter.api\" operators=\"filter.operators.collection\" relations=\"filter.relations.collection\" filter=\"filter\"></as-condition>

        self.setFilters = function(newval){
            var oldval = self.getFilters();

            if (newval.length) {

                if (oldval != undefined && oldval.length) {

                    for (var i = 0; i < newval.length; i++) {
                        if (oldval[i] != undefined) {
                            if (newval[i].condition !== oldval[i].condition) {

                                var new_val = asService.conditions[newval[i].condition];

                                newval[i].key = new_val.key;
                                newval[i].relation = new_val.relations.default;
                                newval[i].char_ctrl = new_val.control;
                                newval[i].char = new_val.characteristics[new_val.control];
                                newval[i].value = new_val.characteristics[new_val.control].default;
                                newval[i].format = new_val.characteristics.format;
                            }
                        }
                    }
                }

                self.filters = newval;
            }
        }
*/


        return self;

    }]);
