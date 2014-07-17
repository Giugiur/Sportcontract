angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/views/header.html","<div id=\"header\">\n                <div class=\"logo\"></div>\n                <div class=\"userOptions\">\n                    <a href=\"\" ng-init=\"dropdown=false;\" ng-click=\"dropdown=!dropdown\" >\n                        <span class=\"userName\">{{user.username}}</span>\n                        <span>{{user.functions[0].team}}</span> &#8212; <span>{{user.functions[0].func}}</span>\n                        <i class=\"fa fa-caret-down\"></i>\n                    </a>\n                    <div ng-show=\"dropdown\">\n                        <ul>\n                            <li ng-repeat=\"language in languages\">\n                                <a href=\"\" ng-click=\"changeLanguage(language);setDropdown(false);\">{{language}}</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"search\">\n                    <i class=\"fa fa-search\"></i>\n                    <input type=\"text\" placeholder=\"League name, club, player, staff&#8230;\" ng-model=\"search.searchterm\">\n\n                    <a href=\"#\"><i class=\"fa fa-plus\"></i></a>\n                </div>\n</div>");
$templateCache.put("common/views/sidebar.html","<div id=\"sideMenu\">\n                    <ul>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-comments-o\"></i>\n                                Communication\n                            </a>\n                        </li>\n                        <li >\n                            <a href=\"#\">\n                                <i class=\"fa fa-cubes\"></i>\n                                Organisation\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-globe\"></i>\n                                Scouting\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-calendar\"></i>\n                                Calendar\n                            </a>\n                        </li>\n                    </ul>\n                </div>");
$templateCache.put("countries/views/countries.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select Country</h2>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"country in countries\" >\n                                            <a ng-click=\"goCountry(country);\"  href=\"\">\n                                                <img ng-src=\"http://nodedevel.sportcontract.eu/{{country.flag}}\" alt=\"International Competition\">\n                                                <span>{{country.name.toLowerCase() | translate}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                       \n                                ");
$templateCache.put("dashboard/views/dashboard.html","	<div ui-view=\"header\"></div>\n	<div id=\"main\">\n				<div ui-view=\"sidebar\"></div>\n                <div id=\"mainBody\">\n                	\n                	<quicksearch search=\"search\">\n\n                	</quicksearch>\n                    <div id=\"tabs\">\n                    	<div class=\"tabCtrls\">\n						    <a href=\"#\"><i class=\"fa fa-home\"></i></a>\n						    <a href=\"#\"><i class=\"fa fa-plus\"></i></a>\n						</div>\n						<ul class=\"etabs\">\n\n							<li ng-repeat=\"tab in tabs\" class=\"tab {{active(tab)}}\" ui-sref-active=\"active\" >\n								<a ng-href=\"{{tab.href}}\" class=\"title\">{{tab.name |translate}}</a>\n								<span class=\"closeTab\"><a href=\"\" ng-click=\"closeTab(tab);\"></a></span>\n							</li>\n						    \n						</ul>\n                        <div class=\"panelContainer\">\n                            <div id=\"tab-home\" class=\"tabContent active\" >\n                                <div class=\"content\"  ui-view=\"tabcontent\" style=\"margin:0px\">\n\n                               	</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>");
$templateCache.put("leagues/views/leagues.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select League</h2>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"league in leagues\" ng-click=\"goLeague(league);\">\n                                            <a href=\"\">\n                                                <img ng-src=\"http://nodedevel.sportcontract.eu/{{league.logo}}\" alt=\"\">\n                                                <span>{{league.name}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                                ");
$templateCache.put("login/views/login.html","<div id=\"main\">\n		<form role=\"form\">\n		  <div class=\"form-group\">\n		    <label for=\"exampleInputEmail1\">Username</label>\n		    <input type=\"text\" class=\"form-control\" ng-model=\"username\" placeholder=\"Enter username\">\n		  </div>\n		  <div class=\"form-group\">\n		    <label for=\"exampleInputPassword1\">Password</label>\n		    <input type=\"password\" class=\"form-control\" ng-model=\"password\" placeholder=\"Password\">\n		  </div>\n		  <div class=\"checkbox\">\n		    <label>\n		      <input type=\"checkbox\"> Remember me\n		    </label>\n		  </div>\n		  <button type=\"submit\" class=\"btn btn-default\" ng-click=\"login(username,password);\">Login</button>\n		</form>	\n</div>");
$templateCache.put("quicksearch/views/quicksearch.html","<div class=\"section first\" id=\"quickSearch\" ng-show=\"search.searchterm.length>0\">\n          \n             \n<a href=\"#\" class=\"close\"><i class=\"fa fa-times\"></i></a>\n          <div class=\"quickSearch\">\n            <div class=\"results\">\n              <div class=\"col\">\n                <div class=\"h6\">Players</div>\n                <ul class=\"list\">\n                  <li class=\"item\" ng-repeat=\"player in players\">\n                    <a href=\"\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-{{player.fields.country[\'iso-3166-2\'].toLowerCase()}}\" alt=\"{{player.fields.country.name}}\">\n                      <ul class=\"info\">\n                        <li class=\"name\">{{player.fields.firstName}} {{player.fields.lastName}} (D)</li>\n                        <li class=\"dob\">{{player.fields.dateOfBirth | date:\'MM.dd.yyyy\'}}</li>\n                        <li class=\"from\">\n                          <span>13&#47;14 Kölner Haie</span>\n                          <span>DEL &#47; GER</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n             <!-- <div class=\"col\">\n                <div class=\"h6\">Staff</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-se\" alt=\"Sweden\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Krupp</li>\n                        <li class=\"dob\">14.02.1965</li>\n                        <li><b>President</b></li>\n                        <li class=\"from\">\n                          <span>13&#47;14 Ice Dragons</span>\n                          <span>DEL &#47; GER</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-ca\" alt=\"Canada\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Liebetrau</li>\n                        <li class=\"dob\">05.11.1955</li>\n                        <li><b>Coach</b></li>\n                        <li class=\"from\">\n                          <span>13&#47;14 Ice Dragons</span>\n                          <span>DEL, Germany</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-se\" alt=\"Sweden\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Krupp</li>\n                        <li class=\"dob\">14.02.1965</li>\n                        <li><b>President</b></li>\n                        <li class=\"from\">\n                          <span>13&#47;14 Ice Dragons</span>\n                          <span>DEL &#47; GER</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-ca\" alt=\"Canada\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Liebetrau</li>\n                        <li class=\"dob\">05.11.1955</li>\n                        <li><b>Coach</b></li>\n                        <li class=\"from\">\n                          <span>13&#47;14 Ice Dragons</span>\n                          <span>DEL, Germany</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col\">\n                <div class=\"h6\">Agents</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-de\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Uwe Krupp</li>\n                        <li class=\"dob\">14.02.1965</li>\n                        <li><b>Scout</b></li>\n                        <li class=\"from\">\n                          <span>Agency Name, Germany</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-se\" alt=\"Sweden\">\n                      <ul class=\"info\">\n                        <li class=\"name\">John Doe</li>\n                        <li class=\"dob\">12.23.1987</li>\n                        <li><b>Agent</b></li>\n                        <li class=\"from\">\n                          <span>Agency Name, Sweden</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>-->\n              <div class=\"col\">\n                <div class=\"h6\">Teams</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-de\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Kölner Haie</li>\n                        <li class=\"from\">\n                          <span>DEL &#47; GER</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-ca\" alt=\"Canada\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Ice Dragons Herford</li>\n                        <li class=\"from\">\n                          <span>CHL &#47; CAN</span>\n                        </li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col\">\n                <div class=\"h6\">Leagues</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-de\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">DEL, Germany</li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-ca\" alt=\"Canada\">\n                      <ul class=\"info\">\n                        <li class=\"name\">CHL, Canada</li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col\">\n                <div class=\"h6\">Countries</div>\n                <ul class=\"list\">\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-de\" alt=\"Germany\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Germany</li>\n                      </ul>\n                    </a>\n                  </li>\n                  <li class=\"item\">\n                    <a href=\"#\">\n                      <img src=\"img/blank.gif\" class=\"flag flag-ca\" alt=\"Canada\">\n                      <ul class=\"info\">\n                        <li class=\"name\">Canada</li>\n                      </ul>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n           </div>");
$templateCache.put("search/views/search.html","");
$templateCache.put("settings/views/settings.html","settings.html");
$templateCache.put("teams/views/teams.html","<div class=\"section noViews\">\n                <div class=\"container-fluid\">\n                  <div class=\"row\">\n                    <div class=\"col-md-12\">\n                                    <h2 class=\"center\">Select Team</h2>\n                                    <ul class=\"countries\">\n                                        <li ng-repeat=\"team in teams\" ng-click=\"goTeam(team);\">\n                                            <a href=\"\">\n                                                <img ng-src=\"http://files.eliteprospects.com/layout/logos/{{team.imageUrl}}\" alt=\"\">\n                                                <span>{{team.name}}</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                   </div>\n                               </div>\n                           </div>\n                       </div>\n                                ");
$templateCache.put("dashboard/views/partials/sample.html"," <div class=\"tabViews\">\n                                    <a href=\"#\" class=\"backBtn\"><i class=\"fa fa-chevron-circle-left\"></i></a>\n                                    <ul class=\"views\">\n                                        <li class=\"active\">\n                                            <a href=\"#\">Detailed View</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Games</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Contact View</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"anchors\">\n                                    <ul>\n                                        <li><a href=\"#\">Cold facts</a></li>\n                                        <li><a href=\"#\">Career Statistics</a></li>\n                                    </ul>\n                                </div>\n                                <div class=\"content\">\n                                    Content goes here&#8230;\n                                </div>");}]);