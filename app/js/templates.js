angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/views/header.html","<div id=\"header\">\n                <div class=\"logo\"></div>\n                <div class=\"userOptions\">\n                    <a href=\"\" ng-init=\"dropdown=false;\" ng-click=\"dropdown=!dropdown\" >\n                        <span class=\"userName\">{{user.username}}</span>\n                        <span>{{user.functions[0].team}}</span> &#8212; <span>{{user.functions[0].func}}</span>\n                        <i class=\"fa fa-caret-down\"></i>\n                    </a>\n                    <div ng-show=\"dropdown\">\n                        <ul>\n                            <li ng-repeat=\"language in languages\">\n                                <a href=\"\" ng-click=\"changeLanguage(language);setDropdown(false);\">{{language}}</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"search\">\n                    <i class=\"fa fa-search\"></i>\n                    <input type=\"text\" placeholder=\"League name, club, player, staff&#8230;\" ng-model=\"search.searchterm\">\n\n                    <a href=\"\" ng-click=\"search.advanced = !search.advanced\"><i class=\"fa fa-plus\"></i></a>\n                </div>\n</div>");
$templateCache.put("common/views/sidebar.html","<div id=\"sideMenu\">\n                    <ul>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-comments-o\"></i>\n                                <span>Communication</span>\n                            </a>\n                        </li>\n                        <li >\n                            <a href=\"#\">\n                                <i class=\"fa fa-cubes\"></i>\n                                <span>Organisation</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-globe\"></i>\n                                <span>Scouting</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-calendar\"></i>\n                                <span>Calendar</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>");
$templateCache.put("countries/views/countries.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <div class=\"h2 center\">Select Country</div>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"country in countries | orderBy:\'name\'\" >\n                                            <a ng-click=\"goCountry(country);\"  href=\"\">\n                                                <img ng-src=\"http://beta.eliteprospects.com/images/flags/64/{{country[\'iso3166_3\']}}.png\" alt=\"{{country.name}}\" style=\"width:120px;height:120px;\">\n                                                <span style=\"text-tranform:capitalize;display:block;height:18px;overflow-y:hidden;\">{{country.name.toLowerCase() | translate }}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                       \n                                ");
$templateCache.put("dashboard/views/dashboard.html","	<div ui-view=\"header\"></div>\n	<div id=\"main\">\n				<div ui-view=\"sidebar\"></div>\n                <div id=\"mainBody\">\n                	<advanced-search ng-show=\"search.advanced\"></advanced-search>\n                	<quicksearch search=\"search\">\n\n                	</quicksearch>\n                    <div id=\"tabs\">\n                    	<div class=\"tabCtrls\">\n						    <a href=\"#\"><i class=\"fa fa-home\"></i></a>\n						    <a href=\"#\"><i class=\"fa fa-plus\"></i></a>\n						</div>\n						<ul class=\"etabs\">\n\n							<li ng-repeat=\"tab in tabs\" class=\"tab {{active(tab)}}\" ui-sref-active=\"active\" >\n								<a ng-href=\"{{tab.href}}\" class=\"title\">{{tab.name |translate}}</a>\n								<span class=\"closeTab\" ><a href=\"\" ng-click=\"closeTab(tab);\"></a></span>\n							</li>\n						    \n						</ul>\n                        <div class=\"panelContainer\">\n                            <div id=\"tab-home\" class=\"tabContent active\" >\n                                <div class=\"content\"  ui-view=\"tabcontent\" style=\"margin:0px\">\n\n                               	</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>");
$templateCache.put("leagues/views/leagues.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select League</h2>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"league in leagues\" ng-click=\"goLeague(league);\">\n                                            <a href=\"\">\n                                                <img ng-src=\"{{league.imageUrl}}\" alt=\"\">\n                                                <span>{{league.name}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                                ");
$templateCache.put("login/views/login.html","<div id=\"main\">\n		<form role=\"form\">\n		  <div class=\"form-group\">\n		    <label for=\"exampleInputEmail1\">Username</label>\n		    <input type=\"text\" class=\"form-control\" ng-model=\"username\" placeholder=\"Enter username\">\n		  </div>\n		  <div class=\"form-group\">\n		    <label for=\"exampleInputPassword1\">Password</label>\n		    <input type=\"password\" class=\"form-control\" ng-model=\"password\" placeholder=\"Password\">\n		  </div>\n		  <div class=\"checkbox\">\n		    <label>\n		      <input type=\"checkbox\"> Remember me\n		    </label>\n		  </div>\n		  <button type=\"submit\" class=\"btn btn-default\" ng-click=\"login(username,password);\">Login</button>\n		</form>	\n</div>");
$templateCache.put("player/views/player.html","{{player}}");
$templateCache.put("players/views/players.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select Player</h2>\n                                    <select ng-options=\"season as season for season in seasons\" ng-model=\"season\" ng-change=\"changeSeason();\" >\n                                      <option value=\"\">Select a season</option>\n                                    </select>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"player in players\" ng-click=\"goPlayer(player.player);\">\n                                            <a href=\"\">\n                                                <img ng-src=\"http://files.eliteprospects.com/layout/players/{{player.player.imageUrl}}\" alt=\"\">\n                                                <span>{{player.player.firstName}} {{player.player.lastName}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                                ");
$templateCache.put("quicksearch/views/quicksearch.html","<div class=\"section first\" id=\"quickSearch\" ng-show=\"search.searchterm.length>0\">\n          \n             \n<a href=\"\" ng-click=\"search.searchterm=\'\'\" class=\"close\"><i class=\"fa fa-times\"></i></a>\n          <div class=\"quickSearch\">\n            <div class=\"results\">\n              <div class=\"col\">\n                <div class=\"h6\">Players</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"player in players\">\n                    <a href=\"\" ng-click=\"newTab(\'Player: \'+ player._source.firstName +  \' \' + player._source.lastName,\'dashboard.player\',player)\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{player._source.country[\'iso3166_2\'].toLowerCase()}}\" alt=\"{{player._source.country.name}}\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{player._source.firstName}} {{player._source.lastName}} (D)</li>\n                        <li class=\"dob\">{{player._source.dateOfBirth | date:\'MM.dd.yyyy\'}}</li>\n                        <li class=\"from\">\n                          <span>13&#47;14 {{player._source.latestPlayerStats.team.name}}</span>\n                          <span>{{player._source.latestPlayerStats.league.name}} &#47; {{player._source.latestPlayerStats.league.country.abbreviation}}</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n             <div class=\"col\">\n                <div class=\"h6\">Staff</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"staff in staffs\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{staff._source.country[\'iso3166_2\'].toLowerCase()}}\" alt=\"Sweden\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{staff._source.firstName}} {{staff._source.lastName}}</li>\n                        <li class=\"dob\">{{staff._source.dateOfBirth | date:\'MM.dd.yyyy\'}}</li>\n                        <li><b>{{staff._source.latestStaffStats.staffRole}}</b></li>\n                        <li class=\"from\">\n                          <span>13&#47;14 {{staff._source.latestStaffStats.team.name}}</span>\n                          <span>{{staff._source.latestStaffStats.league.name}} &#47; {{staff._source.country[\'iso3166_3\']}}</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  \n                </ul>\n              </div>\n              <!--<div class=\"col\">\n                <div class=\"h6\">Agents</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-de\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Krupp</li>\n                        <li class=\"dob\">14.02.1965</li>\n                        <li><b>Scout</b></li>\n                        <li class=\"from\">\n                          <span>Agency Name, Germany</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-se\" alt=\"Sweden\">\n                      <ul class=\"info\">\n                        <li class=\"name\">John Doe</li>\n                        <li class=\"dob\">12.23.1987</li>\n                        <li><b>Agent</b></li>\n                        <li class=\"from\">\n                          <span>Agency Name, Sweden</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>-->\n              <div class=\"col\">\n                <div class=\"h6\">Teams</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"team in teams\">\n                    <a href=\"\" ng-click=\"newTab(\'Players of \'+ team._source.name,\'dashboard.players\',team)\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{team._source.country[\'iso3166_2\'].toLowerCase()}}\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{team._source.name}}</li>\n                        <li class=\"from\">\n                          <span>{{team._source.latestTeamStats.league.name}} &#47; {{team._source.latestTeamStats.league.country[\'iso3166_3\']}}</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col\">\n                <div class=\"h6\">Leagues</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"league in leagues\">\n                    <a href=\"\" ng-click=\"newTab(\'Teams of \'+ league._source.name,\'dashboard.teams\',league)\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{league._source.country[\'iso3166_2\'].toLowerCase()}}\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{league._source.name}}, {{league._source.country.name}}</li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col\">\n                <div class=\"h6\">Countries</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"country in countries\">\n                    <a href=\"\" ng-click=\"newTab(\'Leagues of \'+ country._source.name,\'dashboard.leagues\',country)\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{country._source[\'iso3166_2\'].toLowerCase()}}\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{country._source.name}}</li>\n                      </ul>\n                    </a>\n                  </li>\n                  \n                </ul>\n              </div>\n            </div>\n          </div>\n           </div>");
$templateCache.put("search/views/search.html","<div>\n<div class=\"section first\"  style=\"max-height:460px;\">\n          <a href=\"\" ng-click=\"close()\" class=\"close\"><i class=\"fa fa-times\"></i></a>\n          <div class=\"finder\">\n            <div class=\"row\">\n                <div class=\"filter\">\n                  <div class=\"h2\">Filter</div>\n                  <div class=\"filterHead\">\n                    <div class=\"filterAdd\">\n                      <select ng-model=\"condition\"\n                        ng-options=\"condition as condition for condition in mod\" >\n                        <option>Select condition</option>\n                        \n                      </select>\n                      <button ng-click=\"addFilter();\">Add</button>\n                    </div>\n                    <div class=\"filterCtrl\">\n                      <a href=\"#\" class=\"btnModal\"><i class=\"fa fa-folder-open-o\"></i> <span>load</span></li></a>\n                      <a href=\"#\" class=\"btnModal\"><i class=\"fa fa-save\"></i> <span>save</span></li></a>\n                    </div>\n                  </div>\n                  <div class=\"filterList form\">\n                    <ul>\n                        <li ng-repeat=\"filter in filters.conditions\">\n                          <label class=\"short\">\n                              <input type=\"checkbox\" checked=\"checked\"> {{filter.condition.name}}\n                          </label>\n\n                          <!--No dropdown hide-->\n                          <span class=\"medium switch\" ng-if=\"!filter.condition.char_ctrl == \'slider\'\">\n                            <label>\n                              <input ng-model=\"filter.condition.operator\"\n                                 type=\"radio\" name=\"toggleCountry\" checked=\"checked\" value=\"must\"> is\n                            </label>\n                            <label>\n                              <input ng-model=\"filter.condition.operator\" \n                                 type=\"radio\" name=\"toggleCountry\" value=\"must_not\"> not\n                            </label>\n                          </span>\n\n                          <!--Dropdown show -->\n                          <span class=\"medium\" ng-if=\"filter.condition.char_ctrl == \'slider\'\">\n                              <select class=\"search-filter-relation\" \n                                    ng-model=\"filter.condition.relation\" ng-options=\"relation.key as relation.val for relation in filter.condition.relations\">\n                              </select>\n                          </span> \n\n                          <span class=\"long\">\n                                  <sc-country ng-if=\"filter.condition.char_ctrl == \'dropdown\' && (filter.condition.name == \'country\' || filter.condition.name == \'passport\' || filter.condition.name == \'nationality\')\" conditions=\"filters.conditions\" class=\"search-filter-characteristic\" ng-model=\"filter.condition.value\" options=\"filter.condition.char.collection\">\n                              </sc-country>\n                          <sc-league ng-if=\"filter.condition.char_ctrl == \'dropdown\' && (filter.condition.name == \'league\')\" conditions=\"filters.conditions\" class=\"search-filter-characteristic\" ng-model=\"filter.condition.value\" options=\"filter.condition.char.collection\">\n                              </sc-league>\n                          <sc-default ng-if=\"filter.condition.char_ctrl == \'dropdown\' && (filter.condition.name != \'league\' && filter.condition.name != \'country\' && filter.condition.name != \'passport\' && filter.condition.name != \'nationality\')\" conditions=\"filters.conditions\" class=\"search-filter-characteristic\" ng-model=\"filter.condition.value\" options=\"filter.condition.char.collection\">\n                              </sc-default>\n                          <div ng-if=\"filter.condition.char_ctrl == \'slider\'\">\n                              <div ng-if=\"filter.condition.relation == \'from_to\'\">\n                                  <rzslider rz-slider-floor=\"filter.condition.char.range.floor\" rz-slider-ceil=\"filter.condition.char.range.ceil\" rz-slider-model=\"filter.condition.char.range.min\" rz-slider-high=\"filter.condition.char.range.max\" rz-slider-step=\"{{filter.condition.char.range.step}}\"></rzslider>\n                                  </div>\n                              <div ng-if=\"filter.condition.relation != \'from_to\'\">\n                                  <rzslider rz-slider-floor=\"filter.condition.char.normal.floor\" rz-slider-ceil=\"filter.condition.char.normal.ceil\" rz-slider-model=\"filter.condition.value\"></rzslider>\n                                  </div>\n                              </div>\n                          </span>\n                          <a href=\"\" ng-click=\"removeFilter(filter);\"><i class=\"fa fa-times\"></i></a>\n                        </li>\n                    </ul>\n                  </div><!--.filterList-->\n                </div><!--.row-->\n                <div class=\"result\" style=\"overflow-y:auto;max-height:440px;\">\n                  <div class=\"h2\">Results</div>\n                  <table>\n                    <colgroup style=\"width: 5%;\">\n                    <colgroup span=\"4\" style=\"width: 22%;\"></colgroup>\n                    <thead>\n                      <tr>\n                        <th></th>\n                        <th>Name</th>\n                        <th>Position</th>\n                        <th>Born</th>\n                        <th>League</th>\n                      </tr>\n                    </thead>\n                    <tbody >\n                      <tr ng-show=\"!results || results.hits.length==0\">\n                        <td colspan=\"2\">No results, please create a query</td>\n                      <tr>\n                      <tr ng-repeat=\"player in results.hits\">\n                        <td>\n                          <img src=\"img/blank.gif\" \n                          class=\"flag flag-{{player._source.country[\'iso3166_2\'].toLowerCase()}}\" alt=\"{{player._source.country.name}}\">\n                        </td>\n                        <td><a href=\"\" ng-click=\"newTab(\'Player: \'+ player._source.firstName +  \' \' + player._source.lastName,\'dashboard.player\',player)\">{{player._source.firstName}} {{player._source.lastName}}</a></td>\n                        <td style=\"text-transform:capitalize;\">{{player._source.playerPosition}}</td>\n                        <td>{{player._source.dateOfBirth}}</td>\n                        <td>{{player._source.latestPlayerStats.league.name}}</td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n          </div><!--.finder-->\n        </div><!--.section.first-->\n</div>");
$templateCache.put("settings/views/settings.html","settings.html");
$templateCache.put("teams/views/teams.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select Team</h2>\n                                    <select ng-options=\"season as season for season in seasons\" ng-model=\"season\" ng-change=\"changeSeason();\" >\n                                      <option value=\"\">Select a season</option>\n                                    </select>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"team in teams\" ng-click=\"goTeam(team.team);\">\n                                            <a href=\"\">\n                                                <img ng-src=\"http://files.eliteprospects.com/layout/logos/{{team.team.imageUrl}}\" alt=\"\">\n                                                <span>{{team.team.name}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                                ");
$templateCache.put("dashboard/views/partials/sample.html"," <div class=\"tabViews\">\n                                    <a href=\"#\" class=\"backBtn\"><i class=\"fa fa-chevron-circle-left\"></i></a>\n                                    <ul class=\"views\">\n                                        <li class=\"active\">\n                                            <a href=\"#\">Detailed View</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Games</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Contact View</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"anchors\">\n                                    <ul>\n                                        <li><a href=\"#\">Cold facts</a></li>\n                                        <li><a href=\"#\">Career Statistics</a></li>\n                                    </ul>\n                                </div>\n                                <div class=\"content\">\n                                    Content goes here&#8230;\n                                </div>");}]);