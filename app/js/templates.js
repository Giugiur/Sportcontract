angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/views/header.html","<div id=\"header\">\n                <div class=\"logo\"><i class=\"fa fa-check-square-o\"></i> Sport<span>Contract</span></div>\n                <div class=\"userOptions\">\n                    <a href=\"#\">\n                        <span class=\"userName\">Peter Manager</span>\n                        <span>Adler Mannheim</span> &#8212; <span>Sport Manager</span>\n                        <i class=\"fa fa-caret-down\"></i>\n                    </a>\n                </div>\n                <div class=\"search\">\n                    <i class=\"fa fa-search\"></i>\n                    <input type=\"text\" placeholder=\"League name, club, player, staff&#8230;\">\n                    <a href=\"#\"><i class=\"fa fa-plus\"></i></a>\n                </div>\n</div>");
$templateCache.put("common/views/sidebar.html","<div id=\"sideMenu\">\n                    <ul>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-comments-o\"></i>\n                                Communication\n                            </a>\n                        </li>\n                        <li class=\"active\">\n                            <a href=\"#\">\n                                <i class=\"fa fa-cubes\"></i>\n                                Organisation\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-globe\"></i>\n                                Scouting\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                                <i class=\"fa fa-calendar\"></i>\n                                Calendar\n                            </a>\n                        </li>\n                    </ul>\n                </div>");
$templateCache.put("countries/views/countries.html","\n                                    <h2 class=\"center\">Select Country</h2>\n                                    <ul class=\"countries\">\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/international.jpg\" alt=\"International Competition\">\n                                                <span>International Competition</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/austria.jpg\" alt=\"Austria\">\n                                                <span>Austria</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/germany.jpg\" alt=\"Germany\">\n                                                <span>Germany</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/denmark.jpg\" alt=\"Denmark\">\n                                                <span>Denmark</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/norvey.jpg\" alt=\"Norvey\">\n                                                <span>Norvey</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/russia.jpg\" alt=\"Russia\">\n                                                <span>Russia</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/finland.jpg\" alt=\"Finland\">\n                                                <span>Finland</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/czech.jpg\" alt=\"Czech Republic\">\n                                                <span>Czech Republic</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/sweden.jpg\" alt=\"Sweden\">\n                                                <span>Sweden</span>\n                                            </a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">\n                                                <img src=\"img/flags/switzerland.jpg\" alt=\"Switzerland\">\n                                                <span>Switzerland</span>\n                                            </a>\n                                        </li>\n                                    </ul>\n                                ");
$templateCache.put("dashboard/views/dashboard.html","	<div ui-view=\"header\"></div>\n	<div id=\"main\">\n				<div ui-view=\"sidebar\"></div>\n                <div id=\"mainBody\">\n                    <div id=\"tabs\">\n                    	<div class=\"tabCtrls\">\n						    <a href=\"#\"><i class=\"fa fa-home\"></i></a>\n						    <a href=\"#\"><i class=\"fa fa-plus\"></i></a>\n						</div>\n						<ul class=\"etabs\">\n						    <li class=\"tab active\">\n						        <a ui-sref=\"dashboard.countries\" class=\"title active\">Home</a>\n						        <span class=\"closeTab\"><a href=\"#\"></a></span>\n						    </li>\n						    <li class=\"tab\">\n						        <a ui-sref=\"dashboard.sample\" class=\"title\">Views Sample</a>\n						        <span class=\"closeTab\"><a href=\"#\"></a></span>\n						    </li>\n						</ul>\n                        <div class=\"panelContainer\">\n                            <div id=\"tab-home\" class=\"tabContent active\" >\n                                <div class=\"content\"  ui-view=\"tabcontent\" style=\"margin:0px\">\n\n                               	</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>");
$templateCache.put("dashboard/views/partials/sample.html"," <div class=\"tabViews\">\n                                    <a href=\"#\" class=\"backBtn\"><i class=\"fa fa-chevron-circle-left\"></i></a>\n                                    <ul class=\"views\">\n                                        <li class=\"active\">\n                                            <a href=\"#\">Detailed View</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Games</a>\n                                        </li>\n                                        <li>\n                                            <a href=\"#\">Contact View</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"anchors\">\n                                    <ul>\n                                        <li><a href=\"#\">Cold facts</a></li>\n                                        <li><a href=\"#\">Career Statistics</a></li>\n                                    </ul>\n                                </div>\n                                <div class=\"content\">\n                                    Content goes here&#8230;\n                                </div>");}]);