'use strict';

angular.module('app.search')
    .directive('advancedSearch', ['$http','asConditions','asService','api', function ($http, asConditions, asService,api) {

        return {
            restrict : 'E',
            replace : true,
            transclude : true,
            templateUrl : 'search/views/search.html',
            scope : {},
            controller : function($scope){
                this.getCurrentFilters = function(){
                    return $scope.filters.conditions;
                }

            },
            link : function(scope,element,attrs){

                scope.mod = asService.loadModule('player');

                scope.conditions = asService.loadConditions(scope.mod);

                //scope.conditions = asService.loadConditionCharacteristics(scope.conditions);


                scope.filters = {position : {goalie : false,defenseman : false,forward : false}, conditions : []};

                var _default = 0;

                scope.addFilter = function () {

                    var newFilter = asService.loadConditionVals(scope.condition);

                    /*
                    if(scope.filters.conditions.length > 0)
                        newFilter = asService.checkDependencies(newFilter,scope.filters);
                    */

                    scope.filters.conditions.push(asService.addFilter(scope.condition,newFilter));

                    //set condition select box back to default
                    $('.search-filter option').prop('selected', function () {
                        return this.defaultSelected;

                    });

                    scope.initiateQuery();

                    scope.condition = "";

                };


                scope.removeFilter = function(condition){
                    var index = scope.filters.conditions.indexOf(condition);
                    scope.filters.conditions.splice(index,1);

                    scope.initiateQuery();
                };


                scope.$watch('filters', function (newval,oldval) {
                    //console.log(scope.filters);

                    if (newval.conditions.length) {
                        if(oldval.conditions != undefined && oldval.conditions.length) {
                            for (var i = 0; i < newval.conditions.length; i++) {
                                if(oldval.conditions[i] != undefined) {
                                    if (newval.conditions[i].condition.name !== oldval.conditions[i].condition.name) {

                                     var new_val = asService.loadConditionVals(newval.conditions[i].condition.name);

                                        newval.conditions[i].condition.key = new_val.key;
                                        newval.conditions[i].condition.relation = new_val.relations.default,
                                        newval.conditions[i].condition.char_ctrl = new_val.control,
                                        newval.conditions[i].condition.char = new_val.characteristics[new_val.control],
                                        newval.conditions[i].condition.value = new_val.characteristics[new_val.control].default,
                                        newval.conditions[i].condition.format = new_val.characteristics.format;
                                        newval.conditions[i].condition.whitespace = new_val.characteristics.whitespace;
                                        newval.conditions[i].condition.replace = new_val.characteristics.replace;
                                        newval.conditions[i].condition.query = new_val.query;
                                    }
                                }
                            }
                        }

                    }

                    //console.log(scope.filters.conditions);
                    //scope.filteredConditions = conditionFilterFilter(scope.conditions,newval.conditions);
                    //console.log(scope.filteredConditions);

                    scope.initiateQuery();

                }, true);

/*
                scope.initiateFilteredQuery = function(){
                    var query = '{ "from" : 0, "size" : 25,' +
                                    ' "query" : { ' +
                                                ' "filtered" : { ' +
                                                                ' "query" : { ' +
                                                                                ' "match_all" : {} ' +
                                                                            ' }, ' +
                                                                ' "filter" : { ' +
                                                                                ' "term" : { ';

                    for(var filter in scope.filters.conditions) {
                        var elem = scope.filters.conditions[filter].condition;
                        if (elem.active) {

                            query += '"'+elem.key+'" : "'+elem.value+'"';
                        }
                    }

                    query +=                                                                         ' } ' +
                                                                            ' } ' +
                                                            ' } ' +
                                            ' } '
                }
*/

                scope.buildQuery = function(filters, task){

                    var query = '';
                    var no_query = '';

                    var must = ' "must" : [';
                    var must_count = 0;
                    var should = ' "should" : [';
                    var should_count = 0;
                    var not = ' "must_not" : [';
                    var not_count = 0;

                    query += '{ ';

                    for (var filter in filters.conditions) {
                        var elem = filters.conditions[filter].condition;


                        if (elem.active && elem.query == task ) {
                            var value = elem.value;

                            if(elem.format == 'string')
                                value = asService.convertValue(value,elem.whitespace,elem.replace);

                            if (elem.operator == 'must' && elem.key.length <= 1) {

                                switch (elem.relation) {
                                    case "eq" :
                                        if (must_count > 0)
                                            must += ',';

                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var from = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                            var to = (today.getFullYear() - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + from + '",' +
                                                '"lte" : "' + to + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "'+task+'" : {  ' +
                                                '"' + elem.key + '" : "' + value + '"' +
                                                '} ' +
                                                '} ';
                                        }

                                        must_count++;

                                        break;

                                    case "not_eq" :
                                        /*
                                         if (not_count > 0)
                                         not += ',';
                                         if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                         var today = new Date();

                                         var from = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                         var to = (today.getFullYear() - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                         not +=
                                         ' { "range" : {  ' +
                                         ' "' + elem.key + '" : { ' +
                                         '"gte" : "' + from + '",' +
                                         '"lte" : "' + to + '"' +
                                         ' } ' +
                                         '' +
                                         '} ' +
                                         '} ';
                                         } else {
                                         not +=
                                         ' { "term" : {  ' +
                                         '"' + elem.key + '" : "' + value + '"' +
                                         '} ' +
                                         '} ';
                                         }
                                         not_count++;
                                         */
                                        break;

                                    case "from_to" :

                                        if (must_count > 0)
                                            must += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var from = ((today.getFullYear() - 1) - elem.char.range.max) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                            var to = (today.getFullYear() - elem.char.range.min) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + from + '",' +
                                                '"lte" : "' + to + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + elem.char.range.min + '",' +
                                                '"lte" : "' + elem.char.range.max + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        }
                                        must_count++;

                                        break;

                                    case "gt" :

                                        if (must_count > 0)
                                            must += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lt" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        must_count++;

                                        break;

                                    case "lt" :

                                        if (must_count > 0)
                                            must += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        must_count++;

                                        break;

                                    case "gteq" :

                                        if (must_count > 0)
                                            must += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lte" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        must_count++;

                                        break;

                                    case "lteq" :

                                        if (must_count > 0)
                                            must += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            must +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lte" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        must_count++;

                                        break;
                                }


                            }

                            if (elem.operator == 'must_not' && elem.key.length <= 1) {

                                switch (elem.relation) {
                                    case "eq" :
                                        if (not_count > 0)
                                            not += ',';

                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var from = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                            var to = (today.getFullYear() - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + from + '",' +
                                                '"lte" : "' + to + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "'+task+'" : {  ' +
                                                '"' + elem.key + '" : "' + value + '"' +
                                                '} ' +
                                                '} ';
                                        }

                                        not_count++;

                                        break;

                                    case "not_eq" :
                                        /*
                                         if (not_count > 0)
                                         not += ',';
                                         if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                         var today = new Date();

                                         var from = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                         var to = (today.getFullYear() - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                         not +=
                                         ' { "range" : {  ' +
                                         ' "' + elem.key + '" : { ' +
                                         '"gte" : "' + from + '",' +
                                         '"lte" : "' + to + '"' +
                                         ' } ' +
                                         '' +
                                         '} ' +
                                         '} ';
                                         } else {
                                         not +=
                                         ' { "term" : {  ' +
                                         '"' + elem.key + '" : "' + value + '"' +
                                         '} ' +
                                         '} ';
                                         }
                                         not_count++;
                                         */
                                        break;

                                    case "from_to" :

                                        if (not_count > 0)
                                            not += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var from = ((today.getFullYear() - 1) - elem.char.range.max) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                            var to = (today.getFullYear() - elem.char.range.min) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + from + '",' +
                                                '"lte" : "' + to + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + elem.char.range.min + '",' +
                                                '"lte" : "' + elem.char.range.max + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        }
                                        not_count++;

                                        break;

                                    case "gt" :

                                        if (not_count > 0)
                                            not += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lt" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        not_count++;

                                        break;

                                    case "lt" :

                                        if (not_count > 0)
                                            not += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lt" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        not_count++;

                                        break;

                                    case "gteq" :

                                        if (not_count > 0)
                                            not += ',';
                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lte" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        not_count++;

                                        break;

                                    case "lteq" :

                                        if (not_count > 0)
                                            not += ',';

                                        if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                            var today = new Date();

                                            var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"gte" : "' + value + '"' +
                                                ' } ' +
                                                '' +
                                                '} ' +
                                                '} ';
                                        } else {
                                            not +=
                                                ' { "range" : {  ' +
                                                ' "' + elem.key + '" : { ' +
                                                '"lte" : "' + value + '"' +
                                                ' } ' +
                                                '} ' +
                                                '} ';
                                        }
                                        not_count++;

                                        break;
                                }


                            }

                            if (elem.operator == 'should' || elem.key.length > 1) {

                                angular.forEach(elem.key, function (key) {

                                    switch (elem.relation) {
                                        case "eq" :
                                            if (should_count > 0)
                                                should += ',';

                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var from = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                                var to = (today.getFullYear() - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gte" : "' + from + '",' +
                                                    '"lte" : "' + to + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "'+task+'" : {  ' +
                                                    '"' + key + '" : "' + value + '"' +
                                                    '} ' +
                                                    '} ';
                                            }

                                            should_count++;

                                            break;

                                        case "not_eq" :


                                            /*//not
                                             if (not_count > 0)
                                             not += ',';
                                             if(elem.char_ctrl == 'slider' && elem.format == 'date') {

                                             var today = new Date();

                                             var from = ((today.getFullYear()-1) - value) + '-' + (((today.getMonth()+1) < 10 ) ? "0"+(today.getMonth()+1) : (today.getMonth()+1)) + '-' + ((today.getDate() < 10) ? "0"+today.getDate() : today.getDate());
                                             var to = (today.getFullYear() - value) + '-' + (((today.getMonth()+1) < 10 ) ? "0"+(today.getMonth()+1) : (today.getMonth()+1)) + '-' + ((today.getDate() < 10) ? "0"+today.getDate() : today.getDate());

                                             not +=
                                             ' { "range" : {  ' +
                                             ' "' + elem.key + '" : { ' +
                                             '"gte" : "' + from + '",' +
                                             '"lte" : "' + to + '"' +
                                             ' } ' +
                                             '' +
                                             '} ' +
                                             '} ';
                                             }else{
                                             not +=
                                             ' { "match" : {  ' +
                                             '"' + elem.key + '" : "' + value + '"' +
                                             '} ' +
                                             '} ';
                                             }
                                             not_count++;
                                             *///not

                                            break;

                                        case "from_to" :

                                            if (must_count > 0)
                                                must += ',';
                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var from = ((today.getFullYear() - 1) - elem.char.range.max) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
                                                var to = (today.getFullYear() - elem.char.range.min) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gte" : "' + from + '",' +
                                                    '"lte" : "' + to + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gte" : "' + elem.char.range.min + '",' +
                                                    '"lte" : "' + elem.char.range.max + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            }
                                            should_count++;

                                            break;
                                        case "gt" :

                                            if (should_count > 0)
                                                should += ',';
                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"lt" : "' + value + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gt" : "' + value + '"' +
                                                    ' } ' +
                                                    '} ' +
                                                    '} ';
                                            }
                                            should_count++;

                                            break;

                                        case "lt" :

                                            if (should_count > 0)
                                                should += ',';
                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var value = ((today.getFullYear() - 1) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gt" : "' + value + '"' +
                                                    ' } ' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"lt" : "' + value + '"' +
                                                    ' } ' +
                                                    '} ' +
                                                    '} ';
                                            }
                                            should_count++;

                                            break;

                                        case "gteq" :

                                            if (should_count > 0)
                                                should += ',';
                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"lte" : "' + value + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gte" : "' + value + '"' +
                                                    ' } ' +
                                                    '} ' +
                                                    '} ';
                                            }
                                            should_count++;

                                            break;

                                        case "lteq" :

                                            if (should_count > 0)
                                                should += ',';

                                            if (elem.char_ctrl == 'slider' && elem.format == 'date') {

                                                var today = new Date();

                                                var value = ((today.getFullYear()) - value) + '-' + (((today.getMonth() + 1) < 10 ) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());

                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"gte" : "' + value + '"' +
                                                    ' } ' +
                                                    '' +
                                                    '} ' +
                                                    '} ';
                                            } else {
                                                should +=
                                                    ' { "range" : {  ' +
                                                    ' "' + key + '" : { ' +
                                                    '"lte" : "' + value + '"' +
                                                    ' } ' +
                                                    '} ' +
                                                    '} ';
                                            }
                                            should_count++;

                                            break;
                                    }
                                });

                            }
                        }
                    }

                    must += ']';
                    should += ']';
                    not += ']';

                    if(must_count > 0)
                        query += must;

                    if(should_count > 0) {
                        if (must_count > 0)
                            query += ','
                        query += should;
                    }

                    if(not_count > 0) {
                        if (must_count > 0 || should_count > 0)
                            query += ','
                        query += not;
                    }

                    query += ' }';

                    if((must_count + should_count + not_count) >= 1)
                        query = '{ "bool" : '+query+' }';

                    switch(task){
                        case "match" :
                            query = ' "query" : '+query;
                            no_query = ' "query" : { "match_all" : {} } ';
                            break;
                        case "term" :
                            query = ', "filter" : '+query;
                            no_query = ', "filter" : { } ';
                            break;
                    }

                    if((must_count + should_count + not_count) < 1)
                        query = no_query;


                    return query;
                }

                scope.initiateQuery = function(){
                    //console.log(scope.filters);

                    var query = '{ "from" : 0, "size" : 25,' +
                                    ' "query" : {' +
                                        ' "filtered" : {';

                    query += scope.buildQuery(scope.filters,'match');

                    query += scope.buildQuery(scope.filters,'term');


                    query +=   '} ' +
                            '}' +
                        '}';

                    console.log(query);

                    $http.get(api  + '/api/advancedSearch/players/'+query).success(function (data) {
                        scope.results = data;
                    });

                }


                scope.condition = "";
                //scope.filters = [{condition: '', relations: '', characteristics: '', range: ''}];
                scope.results = null;

            }

        }

    }]);


