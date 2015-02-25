angular.module('templates-main', ['../app/views/ng-templates/admin/account.html', '../app/views/ng-templates/admin/class.html', '../app/views/ng-templates/admin/instructor.html', '../app/views/ng-templates/admin/package.html', '../app/views/ng-templates/admin/schedule.html', '../app/views/ng-templates/admin/slider.html', '../app/views/ng-templates/site/about.html', '../app/views/ng-templates/site/account.html', '../app/views/ng-templates/site/career.html', '../app/views/ng-templates/site/class.html', '../app/views/ng-templates/site/contact.html', '../app/views/ng-templates/site/faq.html', '../app/views/ng-templates/site/first-ride.html', '../app/views/ng-templates/site/index.html', '../app/views/ng-templates/site/instructors.html', '../app/views/ng-templates/site/rates.html', '../app/views/ng-templates/site/rewards.html', '../app/views/ng-templates/site/schedule.html', '../app/views/ng-templates/site/whats-new.html', '../app/views/ng-templates/site/workouts.html']);

angular.module("../app/views/ng-templates/admin/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/account.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "    <div class=\"content-filter pad cf border--bottom\">\n" +
    "    <div class=\"content-filter__item space--right\">\n" +
    "      <span class=\"label\">Search Account</span>\n" +
    "      <input class=\"text-input\" placeholder=\"Enter Name\">\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"content-result pad\">\n" +
    "    <span class=\"label\">Results</span>\n" +
    "\n" +
    "    <div class=\"account-list grid\">\n" +
    "\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Jeph Fernandez</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl>\n" +
    "              <dt>Class Package</dt>\n" +
    "              <dd class=\"\">3 Classes Left</dd>\n" +
    "              <dd class=\" space--bottom text-color-light\">expires in 10 days <a href=\"\" class=\"space--half-left\">Extend</a></dd>\n" +
    "              </dl>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Class</a>\n" +
    "            <ul class=\"nav float--right\">\n" +
    "              <li>\n" +
    "                <a href=\"\" data-modal-toggle=\"account-summary\"><i class=\"fa fa-bars\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\"><i class=\"fa fa-ban\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\" class=\"pad--off-right\"><i class=\"fa fa-share\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Anthony De Leon</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>09170839283</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">anthony@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl>\n" +
    "              <dt>Class Package</dt>\n" +
    "              <dd class=\"\">6 Classes Left</dd>\n" +
    "              <dd class=\" space--bottom text-color-light\">expires in 14 days <a href=\"\" class=\"space--half-left\">Extend</a></dd>\n" +
    "              </dl>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Class</a>\n" +
    "            <ul class=\"nav float--right\">\n" +
    "              <li>\n" +
    "                <a href=\"\" data-modal-toggle=\"account-summary\"><i class=\"fa fa-bars\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\"><i class=\"fa fa-ban\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\" class=\"pad--off-right\"><i class=\"fa fa-share\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">John Doe</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>09193212837</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">john@gmail.com</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl>\n" +
    "              <dt>Class Package</dt>\n" +
    "              <dd class=\"\">6 Classes Left</dd>\n" +
    "              <dd class=\" space--bottom text-color-light\">expires in 22 days <a href=\"\" class=\"space--half-left\">Extend</a></dd>\n" +
    "              </dl>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Class</a>\n" +
    "            <ul class=\"nav float--right\">\n" +
    "              <li>\n" +
    "                <a href=\"\" data-modal-toggle=\"account-summary\"><i class=\"fa fa-bars\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\"><i class=\"fa fa-ban\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\" class=\"pad--off-right\"><i class=\"fa fa-share\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Mark Serbol</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>09238493791</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">mark@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl>\n" +
    "              <dt>Class Package</dt>\n" +
    "              <dd class=\"\">4 Classes Left</dd>\n" +
    "              <dd class=\" space--bottom text-color-light\">expires in 12 days <a href=\"\" class=\"space--half-left\">Extend</a></dd>\n" +
    "              </dl>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Class</a>\n" +
    "            <ul class=\"nav float--right\">\n" +
    "              <li>\n" +
    "                <a href=\"\" data-modal-toggle=\"account-summary\"><i class=\"fa fa-bars\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\"><i class=\"fa fa-ban\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\" class=\"pad--off-right\"><i class=\"fa fa-share\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Jeph Fernandez</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl>\n" +
    "              <dt>Class Package</dt>\n" +
    "              <dd class=\"\">3 Classes Left</dd>\n" +
    "              <dd class=\" space--bottom text-color-light\">expires in 10 days <a href=\"\" class=\"space--half-left\">Extend</a></dd>\n" +
    "              </dl>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Class</a>\n" +
    "            <ul class=\"nav float--right\">\n" +
    "              <li>\n" +
    "                <a href=\"\" data-modal-toggle=\"account-summary\"><i class=\"fa fa-bars\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\"><i class=\"fa fa-ban\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"\" class=\"pad--off-right\"><i class=\"fa fa-share\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal account summary -->\n" +
    "  <div class=\"modal\" data-modal=\"account-summary\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Summary of Classes and Packages</h3>\n" +
    "\n" +
    "      <div class=\"space--bottom pad--bottom\">\n" +
    "        <span class=\"label\">Rider</span>\n" +
    "        <h4 class=\"h-small\">Jeph Fernandez</h4>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"space--bottom one-whole\">\n" +
    "\n" +
    "        <table class=\"data-table account-summary-table\">\n" +
    "          <tr>\n" +
    "            <th>Package Type</th>\n" +
    "            <th>Classes Used</th>\n" +
    "            <th>Classes Left</th>\n" +
    "            <th>Expiration Date</th>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>5 Pax</td>\n" +
    "            <td>5</td>\n" +
    "            <td>0</td>\n" +
    "            <td>05 Jan 2015</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>15 Pax</td>\n" +
    "            <td>15</td>\n" +
    "            <td>0</td>\n" +
    "            <td>14 Feb 2015</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>5 Pax</td>\n" +
    "            <td>2</td>\n" +
    "            <td>3</td>\n" +
    "            <td>05 Mar 2015</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Add Class -->\n" +
    "  <div class=\"modal\" data-modal=\"add-package\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Add Class</h3>\n" +
    "      \n" +
    "      <ul class=\"form-fields\">\n" +
    "        <li>\n" +
    "          <span class=\"label\">Rider</span>\n" +
    "          <h4 class=\"h-small\">Jeph Fernandez</h4>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <span class=\"label\">Select Class Package</span>\n" +
    "          <select class=\"select\">\n" +
    "            <option value=\"1\">1 Class</option>\n" +
    "            <option value=\"5\">5 Pax</option>\n" +
    "            <option value=\"10\">10 Pax</option>\n" +
    "          </select>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <span class=\"label\">Or Input Number of Class</span>\n" +
    "          <input class=\"text-input\">\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <span class=\"label\">Set Expiration</span>\n" +
    "          <input class=\"text-input datepicker\" placeholder=\"Defaults to 30 days\">\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <span class=\"label\">Notes</span>\n" +
    "          <textarea class=\"text-input\" cols=\"3\" placeholder=\"Indicate reason for free class\"></textarea>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "     \n" +
    "      <button class=\"btn btn--primary btn--medium space--top modal-close\">Add</button>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "        </div><!-- .main-content -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("../app/views/ng-templates/admin/class.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/class.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "  <div class=\"class-search pad cf\">\n" +
    "    <span class=\"label\">Select Class Schedule</span>\n" +
    "    <div class=\"bp-md-one-fourth float--left\">\n" +
    "      <input class=\"datepicker text-input\" placeholder=\"Date\">\n" +
    "    </div>\n" +
    "    <div class=\"space--left float--left\">\n" +
    "      <select class=\"select\">\n" +
    "        <option value=\"8:30\">8:30 AM</option>\n" +
    "        <option value=\"10:30\">10:30 AM</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"data-list cf pad\">\n" +
    "    <dl class=\"float--left space--right\">\n" +
    "      <dt>Instructor</dt>\n" +
    "      <dd class=\"caps\">Marissa</dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"float--left space--sides\">\n" +
    "      <dt>Class Type</dt>\n" +
    "      <dd class=\"caps\">Pure Electric</dd>\n" +
    "    </dl>\n" +
    "    <dl class=\"float--left space--sides\">\n" +
    "      <dt>Status</dt>\n" +
    "      <dd class=\"caps\">6 Bikes Available</dd>\n" +
    "    </dl>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"result-container pad\">\n" +
    "\n" +
    "    <ul class=\"nav-tabs\">\n" +
    "      <li>\n" +
    "        <a  class=\"active\" href=\"#\" data-tab-toggle=\"booking\">Booking</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#\" data-tab-toggle=\"waitlist\">Waitlist</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"booking tab-pane tab-pane--active\" data-tab-pane=\"booking\">\n" +
    "\n" +
    "      <div class=\"result-header space--bottom cf\">\n" +
    "        <div class=\"result-filter\">\n" +
    "          <span class=\"caps\">5 Riders</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"btn-group\">\n" +
    "          <button class=\"btn btn--small btn--primary\" data-modal-toggle=\"book-ride\">\n" +
    "            Book A Ride\n" +
    "          </button>\n" +
    "          <button class=\"btn btn--small btn--tertiary\">Print Booking List</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"booking-list grid\">\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"booking__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\" box__header\">\n" +
    "              <ul class=\"booking__actions nav\">\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"btn--round bike-number-switch\" data-modal-toggle=\"switch\">\n" +
    "                    <i class=\"fa fa-exchange\"></i>\n" +
    "                    <span class=\"bike-number\">14</span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"cancel-booking\"><i class=\"fa fa-times\"></i></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <h3 class=\"user--name\">Jeph Fernandez</h3>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"booking__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\" box__header\">\n" +
    "              <ul class=\"booking__actions nav\">\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"btn--round bike-number-switch\" data-modal-toggle=\"switch\">\n" +
    "                    <i class=\"fa fa-exchange\"></i>\n" +
    "                    <span class=\"bike-number\">14</span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"cancel-booking\"><i class=\"fa fa-times\"></i></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <h3 class=\"user--name\">Anthony De Leon</h3>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"booking__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\" box__header\">\n" +
    "              <ul class=\"booking__actions nav\">\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"btn--round bike-number-switch\" data-modal-toggle=\"switch\">\n" +
    "                    <i class=\"fa fa-exchange\"></i>\n" +
    "                    <span class=\"bike-number\">14</span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"cancel-booking\"><i class=\"fa fa-times\"></i></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <h3 class=\"user--name\">John Doe</h3>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"booking__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\" box__header\">\n" +
    "              <ul class=\"booking__actions nav\">\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"btn--round bike-number-switch\" data-modal-toggle=\"switch\">\n" +
    "                    <i class=\"fa fa-exchange\"></i>\n" +
    "                    <span class=\"bike-number\">14</span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"cancel-booking\"><i class=\"fa fa-times\"></i></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <h3 class=\"user--name\">Mark Serbol</h3>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"booking__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\" box__header\">\n" +
    "              <ul class=\"booking__actions nav\">\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"btn--round bike-number-switch\" data-modal-toggle=\"switch\">\n" +
    "                    <i class=\"fa fa-exchange\"></i>\n" +
    "                    <span class=\"bike-number\">14</span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href=\"#\" class=\"cancel-booking\"><i class=\"fa fa-times\"></i></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <h3 class=\"user--name\">Jeph Fernandez</h3>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- /.booking -->\n" +
    "\n" +
    "    <div class=\"waitlist tab-pane\" data-tab-pane=\"waitlist\">\n" +
    "\n" +
    "      <div class=\"result-header space--bottom cf\">\n" +
    "        <div class=\"result-filter\">\n" +
    "          <span class=\"caps\">5 Riders</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"btn-group\">\n" +
    "          <button class=\"btn btn--small btn--tertiary\">Print Waitlist</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"account-list grid\">\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\"pad\">\n" +
    "              <b class=\"h--small\">Jeph Fernandez</b>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pad--sides\">\n" +
    "              <div class=\"data-list\">\n" +
    "\n" +
    "                <dl class=\"data--inline\">\n" +
    "                  <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                  <dd>09198372938</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <dl class=\"data--inline space--bottom\">\n" +
    "                  <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                  <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "                </dl>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "              <a class=\"user-move-class\">Move to Class</a>\n" +
    "              <a class=\"user-remove-waitlist space--left link--secondary float--right\">Remove</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\"pad\">\n" +
    "              <b class=\"h--small\">Anthony De Leon</b>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pad--sides\">\n" +
    "              <div class=\"data-list\">\n" +
    "\n" +
    "                <dl class=\"data--inline\">\n" +
    "                  <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                  <dd>09173649321</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <dl class=\"data--inline space--bottom\">\n" +
    "                  <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                  <dd class=\"inline space--bottom\">anthony@greenlemon.co</dd>\n" +
    "                </dl>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "              <a class=\"user-move-class\">Move to Class</a>\n" +
    "              <a class=\"user-remove-waitlist space--left link--secondary float--right\">Remove</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\"pad\">\n" +
    "              <b class=\"h--small\">John Doe</b>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pad--sides\">\n" +
    "              <div class=\"data-list\">\n" +
    "\n" +
    "                <dl class=\"data--inline\">\n" +
    "                  <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                  <dd>09183729273</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <dl class=\"data--inline space--bottom\">\n" +
    "                  <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                  <dd class=\"inline space--bottom\">john@gmail.com</dd>\n" +
    "                </dl>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "              <a class=\"user-move-class\">Move to Class</a>\n" +
    "              <a class=\"user-remove-waitlist space--left link--secondary float--right\">Remove</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\"pad\">\n" +
    "              <b class=\"h--small\">Mark Serbol</b>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pad--sides\">\n" +
    "              <div class=\"data-list\">\n" +
    "\n" +
    "                <dl class=\"data--inline\">\n" +
    "                  <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                  <dd>09178327329</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <dl class=\"data--inline space--bottom\">\n" +
    "                  <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                  <dd class=\"inline space--bottom\">mark@greenlemon.co</dd>\n" +
    "                </dl>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "              <a class=\"user-move-class\">Move to Class</a>\n" +
    "              <a class=\"user-remove-waitlist space--left link--secondary float--right\">Remove</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__item bp-sm-one-half bp-lg-one-third\">\n" +
    "          <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "            <div class=\"pad\">\n" +
    "              <b class=\"h--small\">Jeph Fernandez</b>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pad--sides\">\n" +
    "              <div class=\"data-list\">\n" +
    "\n" +
    "                <dl class=\"data--inline\">\n" +
    "                  <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                  <dd>09183781293</dd>\n" +
    "                </dl>\n" +
    "\n" +
    "                <dl class=\"data--inline space--bottom\">\n" +
    "                  <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                  <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "                </dl>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "              <a class=\"user-move-class\">Move to Class</a>\n" +
    "              <a class=\"user-remove-waitlist space--left link--secondary float--right\">Remove</a>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- /.waitlist -->\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Bookin-->\n" +
    "  <div class=\"modal\" data-modal=\"book-ride\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Book A Ride</h3>\n" +
    "      <div class=\"user-select cf\">\n" +
    "        <div class=\"space--bottom one-whole bp-md-one-half float--left space--right pad--right\">\n" +
    "          <span class=\"label\">Rider</span>\n" +
    "          <input class=\"text-input\" placeholder=\"Input Name\" value=\"Jeph Fernandez\">\n" +
    "        </div>\n" +
    "        <div class=\"space--bottom bp-md-one-third float--left\">\n" +
    "          <span class=\"label\">Bike Number</span>\n" +
    "          <select class=\"select\">\n" +
    "            <option value=\"1\">1</option>\n" +
    "            <option value=\"2\">2</option>\n" +
    "            <option value=\"3\">3</option>\n" +
    "            <option value=\"4\">4</option>\n" +
    "            <option value=\"5\">5</option>\n" +
    "            <option value=\"6\">6</option>\n" +
    "            <option value=\"7\" selected>7</option>\n" +
    "            <option value=\"8\">8</option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"user-class-details\">\n" +
    "        <span class=\"caps\">3 Classes Left</span>\n" +
    "      </div>\n" +
    "      <button class=\"btn btn--medium btn--primary space--top modal-close\">Book</button>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Switch Bike -->\n" +
    "  <div class=\"modal\" data-modal=\"switch\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Switch Bike</h3>\n" +
    "\n" +
    "      <div class=\"user-select space--bottom\">\n" +
    "        <span class=\"label\">Rider</span>\n" +
    "        <h4 class=\"h-small\">Jeph Fernandez</h4>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"space--bottom one-whole bp-md-one-half float--left space--right pad--right\">\n" +
    "        <span class=\"label\">Current Bike</span>\n" +
    "        <h4 class=\"h-small\">14</h4>\n" +
    "      </div>\n" +
    "      <div class=\"space--bottom bp-md-one-third float--left\">\n" +
    "        <span class=\"label\">Switch to</span>\n" +
    "        <select class=\"select\">\n" +
    "          <option value=\"1\">1</option>\n" +
    "          <option value=\"2\">2</option>\n" +
    "          <option value=\"3\">3</option>\n" +
    "          <option value=\"4\">4</option>\n" +
    "          <option value=\"5\">5</option>\n" +
    "          <option value=\"6\">6</option>\n" +
    "          <option value=\"7\" selected>7</option>\n" +
    "          <option value=\"8\">8</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn--primary btn--medium space--top modal-close\">Switch</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "        </div><!-- .main-content-->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("../app/views/ng-templates/admin/instructor.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/instructor.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "    <div class=\"content-result pad\">\n" +
    "      <div class=\"cf space--bottom\">\n" +
    "        <span class=\"label inline\">Instructors</span>\n" +
    "        <button class=\"btn btn--small btn--secondary float--right\" data-modal-toggle=\"add-instructor\">Add Instructor</button>\n" +
    "      </div>\n" +
    "\n" +
    "    <div class=\"account-list grid\">\n" +
    "\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Risa</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\"  >Update</a>\n" +
    "            <a href=\"\" class=\"float--right link--secondary\">Remove</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Migs</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\"  >Update</a>\n" +
    "            <a href=\"\" class=\"float--right link--secondary\">Remove</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Trish</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\"  >Update</a>\n" +
    "            <a href=\"\" class=\"float--right link--secondary\">Remove</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Kris</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\"  >Update</a>\n" +
    "            <a href=\"\" class=\"float--right link--secondary\">Remove</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"grid__item bp-md-one-half bp-lg-one-third\">\n" +
    "        <div class=\"account__item box--bordered box--white space--bottom cf\">\n" +
    "\n" +
    "          <div class=\"pad\">\n" +
    "            <b class=\"h--small\">Yessa</b>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"pad--sides\">\n" +
    "            <div class=\"data-list\">\n" +
    "\n" +
    "              <dl class=\"data--inline\">\n" +
    "                <dt><i class=\"fa fa-phone\"></i></dt>\n" +
    "                <dd>0916238313</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "              <dl class=\"data--inline space--bottom\">\n" +
    "                <dt><i class=\"fa fa-envelope\"></i></dt>\n" +
    "                <dd class=\"inline space--bottom\">jeph@greenlemon.co</dd>\n" +
    "              </dl>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"account__options pad--sides pad--half-ends space--top cf\">\n" +
    "            <a href=\"\" class=\"float--left\"  >Update</a>\n" +
    "            <a href=\"\" class=\"float--right link--secondary\">Remove</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "\n" +
    "          <!-- modal Add Slider -->\n" +
    "          <div class=\"modal\" data-modal=\"add-instructor\">\n" +
    "            <div class=\"modal__box pad\">\n" +
    "              <span class=\"close-btn modal-close\">X</span>\n" +
    "              <h3 class=\"h--medium brand-color space--bottom\">Add Instructor</h3>\n" +
    "              \n" +
    "              <ul class=\"form-fields\">\n" +
    "                <li>\n" +
    "                  <span class=\"label\">First Name</span>\n" +
    "                  <input class=\"text-input\">\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <span class=\"label\">Last Name</span>\n" +
    "                  <input class=\"text-input\">\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <span class=\"label\">Contact Number</span>\n" +
    "                  <input class=\"text-input\">\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <span class=\"label\">Email Address</span>\n" +
    "                  <input class=\"text-input\">\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              \n" +
    "              <button class=\"btn btn--medium btn--primary space--top modal-close\">Add</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "        </div><!-- .main-content -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/admin/package.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/package.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "  <div class=\"grid content pad\">\n" +
    "\n" +
    "    <div class=\"grid__item\">\n" +
    "    <div class=\"packages box--white box--bordered\">\n" +
    "      <div class=\"box__header align--middle cf pad\">\n" +
    "        <span class=\"label label--inline\">Packages</span>\n" +
    "        <button class=\"btn btn--small btn--primary float--right\" data-modal-toggle=\"add-package\">Add Package</button>\n" +
    "      </div>\n" +
    "      <div class=\"pad\">\n" +
    "\n" +
    "        <table class=\"data-table\">\n" +
    "          <thead>\n" +
    "            <tr>\n" +
    "              <th>Name</th>\n" +
    "              <th>Number of Classes</th>\n" +
    "              <th>Price</th>\n" +
    "              <th>Expiration</th>\n" +
    "              <th>&nbsp;</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "            <tr>\n" +
    "              <td>5 Pax</td>\n" +
    "              <td>5 Classes</td>\n" +
    "              <td><small>PHP</small> 3,200</td>\n" +
    "              <td>30 days</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Remove\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Edit\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "              <td>10 Pax</td>\n" +
    "              <td>10 Classes</td>\n" +
    "              <td><small>PHP</small> 3,200</td>\n" +
    "              <td>30 days</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Remove\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Edit\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "              <td>20 Pax</td>\n" +
    "              <td>20 Classes</td>\n" +
    "              <td><small>PHP</small> 3,200</td>\n" +
    "              <td>60 days</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Remove\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Edit\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Add Slider -->\n" +
    "  <div class=\"modal\" data-modal=\"add-package\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Add Package</h3>\n" +
    "\n" +
    "      <div class=\"cf\">\n" +
    "        <div class=\"space--bottom float--left space--right\">\n" +
    "          <span class=\"label\">Name</span>\n" +
    "          <input class=\"text-input\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"space--bottom float--left space--right\">\n" +
    "          <span class=\"label\">Number of Classes</span>\n" +
    "          <input class=\"text-input\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"space--bottom float--left\">\n" +
    "          <span class=\"label\">Price</span>\n" +
    "          <input class=\"text-input\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn--medium btn--primary space--top modal-close\">Add</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "        </div><!-- .main-content -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("../app/views/ng-templates/admin/schedule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/schedule.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "   <div class=\"grid content pad\">\n" +
    "\n" +
    "    <div class=\"grid__item\">\n" +
    "    <div class=\"sliders box--white box--bordered\">\n" +
    "      <div class=\"box__header align--middle cf pad\">\n" +
    "        <span class=\"label label--inline\">Schedules</span>\n" +
    "        <button class=\"btn btn--small btn--primary float--right\" data-modal-toggle=\"add-schedule\">Add Class Schedule</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"calendar pad\">\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal View Schedule -->\n" +
    "  <div class=\"modal view-schedule\" data-modal=\"view-schedule\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">8:30 AM &mdash; mon 2/23</h3>\n" +
    "\n" +
    "     <div class=\"data-list cf pad--ends\">\n" +
    "        <dl class=\"space--bottom space--right float--left\">\n" +
    "          <dt class=\"label\">Class Type</span>\n" +
    "          <dd>Pure Electric<dd>\n" +
    "        </dl>\n" +
    "\n" +
    "        <dl class=\"space--bottom space--sides float--left\">\n" +
    "          <dt class=\"label\">Instructor</span>\n" +
    "          <dd>Marissa<dd>\n" +
    "        </dl>\n" +
    "\n" +
    "        <dl class=\"space--bottom space--sides float--left\">\n" +
    "          <dt class=\"label\">Riders</span>\n" +
    "          <dd>28<dd>\n" +
    "        </dl>\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn--medium btn--primary space--top modal-close\">Edit</button>\n" +
    "      <button class=\"btn btn--medium btn--tertiary space--top modal-close\">Cancel Class</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Add Schedule -->\n" +
    "  <div class=\"modal\" data-modal=\"add-schedule\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">8:30 AM &mdash; mon 2/23</h3>\n" +
    "\n" +
    "     <div class=\"data-list cf pad--ends\">\n" +
    "       <dl class=\"space--bottom\">\n" +
    "          <dt class=\"label\">Date</span>\n" +
    "          <dd class=\"bp-md-one-half\">\n" +
    "            <input class=\"text-input datepicker\">\n" +
    "          <dd>\n" +
    "        </dl>\n" +
    "\n" +
    "        <dl class=\"space--bottom\">\n" +
    "          <dt class=\"label\">Time</span>\n" +
    "          <dd class=\"bp-md-one-half\">\n" +
    "            <input class=\"text-input\">\n" +
    "          <dd>\n" +
    "        </dl>\n" +
    "\n" +
    "        <dl class=\"space--bottom\">\n" +
    "          <dt class=\"label\">Class Type</span>\n" +
    "          <dd class=\"bp-md-one-half\">\n" +
    "            <select class=\"select\">\n" +
    "              <option value=\"marissa\">Pure Electric</option>\n" +
    "              <option value=\"abel\">Power Hour</option>\n" +
    "              <option value=\"mc\">Electric Endurance</option>\n" +
    "            </select>\n" +
    "          <dd>\n" +
    "        </dl>\n" +
    "\n" +
    "        <dl class=\"space--bottom\">\n" +
    "          <dt class=\"label\">Instructor</span>\n" +
    "          <dd class=\"bp-md-one-half\">\n" +
    "            <select class=\"select\">\n" +
    "              <option value=\"marissa\">Marissa</option>\n" +
    "              <option value=\"abel\">Abel</option>\n" +
    "              <option value=\"mc\">MC</option>\n" +
    "            </select>\n" +
    "          <dd>\n" +
    "        </dl>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn--medium btn--primary space--top modal-close\">Edit</button>\n" +
    "      <button class=\"btn btn--medium btn--tertiary space--top modal-close\">Cancel Class</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div><!-- .main-content -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/fullcalendar/dist/fullcalendar.min.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "    <script src=\"/assets/vendor/moment/moment.js\"></script>\n" +
    "    <script src=\"/assets/vendor/fullcalendar/dist/fullcalendar.min.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("../app/views/ng-templates/admin/slider.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/admin/slider.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "\n" +
    "  <head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "\n" +
    "    <title>Admin | Electric Studio</title>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/css/admin.css\">\n" +
    "  </head>\n" +
    "\n" +
    "  <body>\n" +
    "    <div class=\"page-wrapper\">\n" +
    "      <div class=\"page-sidebar\">\n" +
    "        <div class=\"brand pad\">\n" +
    "          <img src=\"/assets/images/electricstudio-nameplate.png\" class=\"nameplate\">\n" +
    "          <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"main-nav nav nav--stacked\">\n" +
    "          <li class=\"active\">\n" +
    "            <a data-dropdown-toggle=\"dashboard-menu\">\n" +
    "              <i class=\"fa fa-th-large\"></i>\n" +
    "              <span class=\"nav-label\">Dashboard</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"nav nav--stacked sub-nav\" data-dropdown=\"dashboard-menu\">\n" +
    "              <li><a href=\"/analytics\">Analytics</a></li>\n" +
    "              <li><a href=\"/packages\">Packages</a></li>\n" +
    "              <li><a href=\"/instructors\">Instructors</a></li>\n" +
    "              <li><a href=\"/sliders\">Sliders</a></li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/classes\">\n" +
    "              <i class=\"fa fa-th-list\"></i>\n" +
    "              <span class=\"nav-label\">Classes</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/accounts\">\n" +
    "              <i class=\"fa fa-users\"></i>\n" +
    "              <span class=\"nav-label\">Accounts</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"/schedules\">\n" +
    "              <i class=\"fa fa-calendar\"></i>\n" +
    "              <span class=\"nav-label\">Schedules</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"page-content\">\n" +
    "\n" +
    "        <div class=\"page-header pad\">\n" +
    "\n" +
    "          <button class=\"sidebar-toggle btn btn--small btn--primary\">\n" +
    "            <i class=\"fa fa-bars\"></i>\n" +
    "          </button>\n" +
    "          \n" +
    "          <div class=\"user\">\n" +
    "            <div class=\"user__pic\">\n" +
    "              <img src=\"/assets/images/pic-placeholder.png\" alt=\"\">\n" +
    "            </div>\n" +
    "            \n" +
    "            <span class=\"user__name\">Mark S.</span>\n" +
    "            <a href=\"\" class=\"user__logout\"><i class=\"fa fa-sign-out\"></i> Log Out</a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"main-content\">\n" +
    "\n" +
    "   <div class=\"grid content pad\">\n" +
    "\n" +
    "    <div class=\"grid__item\">\n" +
    "    <div class=\"sliders box--white box--bordered\">\n" +
    "      <div class=\"box__header align--middle cf pad\">\n" +
    "        <span class=\"label label--inline\">Homepage Slider</span>\n" +
    "        <button class=\"btn btn--small btn--primary float--right\" data-modal-toggle=\"add-slide\">Add Slide</button>\n" +
    "      </div>\n" +
    "      <div class=\"pad pad--off-top\">\n" +
    "\n" +
    "        <table class=\"slider-list data-table\">\n" +
    "          <thead>\n" +
    "            <tr>\n" +
    "              <th>Background Image</th>\n" +
    "              <th>Text</th>\n" +
    "              <th class=\"options-cell\">&nbsp;</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "            <tr>\n" +
    "              <td>\n" +
    "                <img class=\"slider-image\" src=\"/assets/images/slider-image-1.jpg\">\n" +
    "              </td>\n" +
    "              <td>Let's go for a ride</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Edit\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Remove\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "              <td>\n" +
    "                <img class=\"slider-image\" src=\"/assets/images/slider-image-2.jpg\">\n" +
    "              </td>\n" +
    "              <td>Plug In</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Edit\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Remove\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "              <td>\n" +
    "                <img class=\"slider-image\" src=\"/assets/images/slider-image-3.jpg\">\n" +
    "              </td>\n" +
    "              <td>RIDE - CLIMB - PUSH - STRETCH - SPRINT - CRUNCH - LIFT - DANCE</td>\n" +
    "              <td>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-trash\"></i> Edit\n" +
    "                </button>\n" +
    "                <button class=\"btn btn--small btn--secondary\">\n" +
    "                  <i class=\"fa fa-pencil\"></i> Remove\n" +
    "                </button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- modal Add Slider -->\n" +
    "  <div class=\"modal\" data-modal=\"add-slide\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Add Slide</h3>\n" +
    "\n" +
    "      <div class=\"space--bottom\">\n" +
    "        <span class=\"label\">Background Image</span>\n" +
    "        <input type=\"file\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"space--bottom\">\n" +
    "        <span class=\"label\">Text</span>\n" +
    "        <input placeholder=\"Add Text\" class=\"text-input\">\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"btn btn--medium btn--primary space--top modal-close\">Add</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div><!-- .main-content -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/selectize/dist/css/selectize.default.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"/assets/vendor/pickadate/lib/themes/classic.date.css\">\n" +
    "\n" +
    "    <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/selectize/dist/js/standalone/selectize.min.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.js\"></script>\n" +
    "    <script src=\"/assets/vendor/pickadate/lib/picker.date.js\"></script>\n" +
    "\n" +
    "    <script src=\"/assets/js/script.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("../app/views/ng-templates/site/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/about.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <!-- page content starts here-->\n" +
    "  <div class=\"slider-container about\">\n" +
    "    <ul class=\"slider\">\n" +
    "      <li class=\"slide slide-1\"><span>The Electric Experience</span></li>\n" +
    "      <li class=\"slide slide-2\"><span>Let's Go <br>For A Ride</span></li>\n" +
    "      <li class=\"slide slide-3\"><span>Plug In</span></li>\n" +
    "    </ul>\n" +
    "  \n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">About Us</h2>\n" +
    "      <p class=\"intro\">We are the premier indoor cycling boutique offering a full-body fitness experience. Founded by innovative team of fitness professionals set on revolutionizing the fitness culture in the Philippines. Our rides are the ultimate sweat session&endash;an energizing workout to challenge you physically and strengthen you mentally.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-gray parts-3\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <section>\n" +
    "        <h2 class=\"h medium\">The Experience</h2>\n" +
    "        <p>Riding to the beat of the music in unison cultivates a sense of camaraderie and support that helps you push forward. We believe that any positive change is contagious and what good you do for yourself, you also do for others.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <h2 class=\"h medium\">The Community</h2>\n" +
    "        <p>Riding to the beat of the music in unison cultivates a sense of camaraderie and support that helps you push forward. We believe that any positive change is contagious and what good you do for yourself, you also do for others.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <h2 class=\"h medium\">The Change</h2>\n" +
    "        <p>We encourage and inspire each other to go beyond our limits. We believe that we are good in our own, but definitely stronger together.</p>\n" +
    "      </section>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "\n" +
    "<!-- page content ends here-->\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/account.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <!-- page content starts here -->\n" +
    "  <div class=\"content bg-lightGray sidebar-layout\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      \n" +
    "      <div class=\"main\">\n" +
    "        <h2 class=\"h large primary\">Your Account Info</h2>\n" +
    "        <section>\n" +
    "          <h3 class=\"h medium\">Personal Info</h3>\n" +
    "          <div class=\"col-2\">\n" +
    "            <input class=\"input\" placeholder=\"First Name\" value=\"John\">\n" +
    "            <input class=\"input\" placeholder=\"Last Name\" value=\"Doe\">\n" +
    "            <input class=\"input\" placeholder=\"Email Address\" value=\"john@gmail.com\">\n" +
    "            <input class=\"input\" placeholder=\"Mobile Number\" value=\"09197362863\">\n" +
    "          </div>  \n" +
    "          <h4 class=\"h small\">Birthday</h4>\n" +
    "          <div class=\"select\">\n" +
    "            <label>Month</label>\n" +
    "            <select>\n" +
    "              <option>02</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          <div class=\"select\">\n" +
    "            <label>Day</label>\n" +
    "            <select>\n" +
    "              <option>24</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          <div class=\"select\">\n" +
    "            <label>Year</label>\n" +
    "            <select>\n" +
    "              <option>1988</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "        </section> \n" +
    "        <section>\n" +
    "          <h3 class=\"h medium\">Change Password</h3>\n" +
    "          <input class=\"input\" placeholder=\"Password\">\n" +
    "          <input class=\"input\" placeholder=\"Retype Password\">\n" +
    "        </section>\n" +
    "        <section>\n" +
    "          <h3 class=\"h medium\">Emergency Contact</h3>\n" +
    "          <input class=\"input\" placeholder=\"Full Name\" value=\"Jeph Fernandez\">\n" +
    "          <input class=\"input\" placeholder=\"Contact Number\" value=\"09178832293\">\n" +
    "        </section>\n" +
    "        <section>\n" +
    "          <h3 class=\"h medium\">Billing</h3>\n" +
    "          <input class=\"input\" placeholder=\"Full Name\" value=\"John Doe\">\n" +
    "          <input class=\"input\" placeholder=\"Email Address\" value=\"john@gmail.com\">\n" +
    "          <a class=\"button small pads primary\">Log on to Paypal</a>\n" +
    "        </section>\n" +
    "        \n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"sidebar light\">\n" +
    "        <h2 class=\"h small\">My Classes</h2>\n" +
    "        <p>\n" +
    "          <a href=\"/reserved\" class=\"link basic\">Reserved</a><br>\n" +
    "          <a href=\"/history\" class=\"link basic\">History</a>\n" +
    "        </p>\n" +
    "        <h2 class=\"h small\">My Packages</h2>\n" +
    "        <h2 class=\"h small\">My Account</h2>\n" +
    "        <p>\n" +
    "          <a href=\"/account\" class=\"link basic\">Personal Info</a><br> \n" +
    "          <a href=\"/billing\" class=\"link basic\">Billing</a>\n" +
    "        </p>\n" +
    "        <h2 class=\"h small\">My Rewards</h2>\n" +
    "        <a class=\"link\" href=\"/logout\">Sign Out</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!-- page content ends here -->\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/career.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/career.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <!--  page content starts here-->\n" +
    "  <div class=\"content bg-lightGray min-height\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">Career</h2>\n" +
    "      <p class=\"intro\">Interested in joining Team Electric? We are hiring!</p>\n" +
    "      <section>\n" +
    "        <h2 class=\"h small\">Marketing and Communications Manager</h2>\n" +
    "        <h2 class=\"h small\">Studio Customer Service Leads</h2>\n" +
    "      </section>\n" +
    "      <a class=\"link\">Send Your CV to careers@electricstudio.ph</a>\n" +
    "  \n" +
    "    </div>\n" +
    "  </div>\n" +
    "<!--  page content ends here-->\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/class.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/class.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <!--  page content starts here-->\n" +
    "<div class=\"content schedule bg-lightGray\">\n" +
    "  <div class=\"wrapper\">\n" +
    "    <div class=\"header\">\n" +
    "      <h2 class=\"range\">Oct 30, 2014</h2>\n" +
    "      <div class=\"nav left\"><i class=\"fa fa-angle-left\"></i></div>\n" +
    "      <div class=\"nav right\"><i class=\"fa fa-angle-right\"></i></div>\n" +
    "    </div>\n" +
    "    <div class=\"header\">\n" +
    "      <h2 class=\"range\"><span>Thursday</span> 8:30 AM</h2>\n" +
    "      <div class=\"nav left\"><i class=\"fa fa-angle-left\"></i></div>\n" +
    "      <div class=\"nav right\"><i class=\"fa fa-angle-right\"></i></div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"class\">\n" +
    "      <table class=\"seats\">\n" +
    "        <tr>\n" +
    "          <td><span>1</span></td>\n" +
    "          <td><span>2</span></td>\n" +
    "          <td><span>3</span></td>\n" +
    "          <td class=\"unavailable\"><span>4</span></td>\n" +
    "          <td><span>5</span></td>\n" +
    "          <td><span>6</span></td>\n" +
    "          <td class=\"unavailable\"><span>7</span></td>\n" +
    "          <td><span>8</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td><span>9</span></td>\n" +
    "          <td class=\"unavailable\"><span>10</span></td>\n" +
    "          <td><span>11</span></td>\n" +
    "          <td><span>12</span></td>\n" +
    "          <td class=\"unavailable\"><span>13</span></td>\n" +
    "          <td class=\"unavailable\"><span>14</span></td>\n" +
    "          <td><span>15</span></td>\n" +
    "          <td><span>16</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td><span>17</span></td>\n" +
    "          <td class=\"unavailable\"><span>18</span></td>\n" +
    "          <td><span>19</span></td>\n" +
    "          <td><span>20</span></td>\n" +
    "          <td><span>21</span></td>\n" +
    "          <td><span>22</span></td>\n" +
    "          <td class=\"unavailable\"><span>23</span></td>\n" +
    "          <td><span>24</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td><span>25</span></td>\n" +
    "          <td class=\"unavailable\"><span>26</span></td>\n" +
    "          <td><span>27</span></td>\n" +
    "          <td class=\"hidden\"><span></span></td>\n" +
    "          <td><span>28</span></td>\n" +
    "          <td class=\"unavailable\"><span>29</span></td>\n" +
    "          <td><span>30</span></td>\n" +
    "          <td><span>31</span></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td class=\"unavailable\"><span>32</span></td>\n" +
    "          <td><span>33</span></td>\n" +
    "          <td><span>34</span></td>\n" +
    "          <td class=\"hidden\"><span></span></td>\n" +
    "          <td class=\"hidden\"><span></span></td>\n" +
    "          <td><span>35</span></td>\n" +
    "          <td><span>36</span></td>\n" +
    "          <td><span>37</span></td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "      \n" +
    "      <div class=\"class-instructor\">\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/instructors-3.png\">\n" +
    "        </div>\n" +
    "        <h3 class=\"h small center primary\">Marissa</h3>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <ul class=\"legend\">\n" +
    "      <li class=\"free\">Free Bikes</li>\n" +
    "      <li class=\"reserved\">Reserved Bikes</li>\n" +
    "      <li class=\"selection\">Your Selection</li>\n" +
    "    </ul>\n" +
    "    <a class=\"button large center\">Book A Ride</a>\n" +
    "    <a class=\"h small primary center link\" href=\"/schedule\">Back to Schedules</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--page content ends here-->\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/contact.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/contact.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <!--  page content starts here-->\n" +
    "  <div class=\"content bg-gray contact\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Contact Us</h2>\n" +
    "      <p class=\"intro\">Feel free to drop by, drop us a line or leave a message.</p>\n" +
    "      <section class=\"info\">\n" +
    "        <h2 class=\"h medium\">The Studio</h2>\n" +
    "        <p>3/F Megaworld Building <br>Forbes Town Center <br>Bonifacio Global City <br>Taguig City, Philippines</p>\n" +
    "        <h2 class=\"h medium\">Hours of Operation</h2>\n" +
    "        <p>Open 7 days a week. <br>The studio opens 30 minutes before class.</p>\n" +
    "        <a class=\"link\" href=\"/schedule\">Schedule</a>\n" +
    "        <h2 class=\"h small\">Call</h2>\n" +
    "        <p>632.817.4632 - 34</p>\n" +
    "        <h2 class=\"h small\">Email</h2>\n" +
    "        <p>hello@electricstudio.com</p>\n" +
    "        <h2 class=\"h small\">Follow Us</h2>\n" +
    "        <ul class=\"social\">\n" +
    "          <li>\n" +
    "            <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </section>\n" +
    "      <section class=\"map\">\n" +
    "        <iframe src=\"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3861.8073677585357!2d121.05212960000003!3d14.553005699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sforbes+town+center%2C+bonifacio+global+city!5e0!3m2!1sen!2sph!4v1421920012693\" width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"border:0\"></iframe>\n" +
    "      </section>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "<!--  page content ends here-->\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/faq.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/faq.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content\">\n" +
    "  <div class=\"wrapper\">\n" +
    "    <h2 class=\"h large primary\">FAQs</h2>\n" +
    "    <section>\n" +
    "      <h2 class=\"h medium\">Booking</h2>\n" +
    "      <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "\n" +
    "      <h2 class=\"h medium\">Reservation</h2>\n" +
    "      <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "\n" +
    "      <h2 class=\"h medium\">Waitlist</h2>\n" +
    "      <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "\n" +
    "      <h2 class=\"h medium\">Cancellation</h2>\n" +
    "      <p>Must be made 12 hours before class.</p>\n" +
    "      <a class=\"link\">What to expect on your first ride</a>\n" +
    "    </section>  \n" +
    "  </div>  \n" +
    "</div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/first-ride.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/first-ride.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"slider-container first-ride\">\n" +
    "    <ul class=\"slider\">\n" +
    "      <li class=\"slide slide-1 font-medium light\"><span>Take Us For A Ride</span></li>\n" +
    "      <li class=\"slide slide-2\"><span>Let's Go <br>For A Ride</span></li>\n" +
    "      <li class=\"slide slide-3\"><span>Plug In</span></li>\n" +
    "    </ul>\n" +
    "  \n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">Your First Ride</h2>\n" +
    "      <p class=\"intro\">45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "      <a class=\"link\" href=\"/rates-and-packages\">How to book a ride</a>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-lightGray sidebar-layout\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      \n" +
    "      <div class=\"main color-secondary\">\n" +
    "        <section class=\"image-layout\">\n" +
    "          <div class=\"image\">\n" +
    "            <img src=\"/assets/images/mini-4.png\">\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <span class=\"num\">1</span>\n" +
    "            <h2 class=\"h medium face-primary\">Book Online</h2>\n" +
    "            <p>You must create an account before you buy a ride to book a class. For your first time we recommend buying the First Timer Package so you can try as many instructors and rides in a month.</p>\n" +
    "            <a class=\"link\" href=\"/rates-and-packages\">How to book a ride</a>\n" +
    "          </div>  \n" +
    "        </section>  \n" +
    "        \n" +
    "        <section class=\"image-layout\">\n" +
    "          <div class=\"image\">\n" +
    "            <div class=\"img-wrapper\">\n" +
    "            <img src=\"/assets/images/mini-1.png\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <span class=\"num\">2</span>\n" +
    "            <h2 class=\"h medium face-primary\">All you need</h2>\n" +
    "            <p>We suggest form-fitting sportswear. Bring a change of clothes since you're sure to sweat during class!</p>\n" +
    "          </div>\n" +
    "        </section>  \n" +
    "        \n" +
    "        <section class=\"image-layout\">\n" +
    "          <div class=\"image\">\n" +
    "            <div class=\"img-wrapper\">\n" +
    "            <img src=\"/assets/images/mini-2.png\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <span class=\"num\">3</span>\n" +
    "            <h2 class=\"h medium face-primary\">Be early, be ready</h2>\n" +
    "            <p>Get the most of your electric experience and make sure to arrive 30 minutes before your class.</p>\n" +
    "            <p>We will check you in, provide you with shoes, set up your bike and provide you with a studio tour. If you do not claim your bike 5 minutes before your class, your bike may be released.</p>\n" +
    "          </div>\n" +
    "        </section>\n" +
    "        \n" +
    "        <section class=\"image-layout\">\n" +
    "          <div class=\"image\">\n" +
    "            <div class=\"img-wrapper\">\n" +
    "            <img src=\"/assets/images/mini-3.png\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <span class=\"num\">4</span>\n" +
    "            <h2 class=\"h medium face-primary\">Know your essentials</h2>\n" +
    "            <h2 class=\"h small\">Shoes</h2>\n" +
    "            <p>You clip unto the bike for a more stable and smoother ride. Shoes are free for the first timer, otherwise they can be rented for PHP 30. For riders with their own cycling shoes, our pedals are LOOK KEO compatible.</p>\n" +
    "            <h2 class=\"h small\">Towels</h2>\n" +
    "            <p>There are complimentary towels for your use.</p>\n" +
    "            <h2 class=\"h small\">Water</h2>\n" +
    "            <p>We have water available for sale, but we've got fountains for you to fill up your own bottles.</p>\n" +
    "            <h2 class=\"h small\">Lockers</h2>\n" +
    "            <p>Our Lockers have coded keypads, so leave your lock behind.</p>\n" +
    "            <h2 class=\"h small\">Ammenities</h2>\n" +
    "            <p>We have shower stocked with bath and body products so you can head straight to where you need to be right after class.</p>\n" +
    "          </div>\n" +
    "        </section>\n" +
    "        \n" +
    "        <section class=\"image-layout\">\n" +
    "          <div class=\"image\">\n" +
    "            <div class=\"img-wrapper\">\n" +
    "            <img src=\"/assets/images/mini-1.png\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"text\">\n" +
    "            <span class=\"num\">5</span>\n" +
    "            <h2 class=\"h medium face-primary\">Set Up and Safety</h2>\n" +
    "            <p>There are 3 places to adjust your bike to find the perfect riding position for you:</p>\n" +
    "            <p><span class=\"num inline\">1</span> Seat height</p>\n" +
    "            <p><span class=\"num inline\">2</span> Fore/Aft seat position</p>\n" +
    "            <p><span class=\"num inline\">3</span> Handlebar height</p>\n" +
    "            <p>Staff wil be there to assist you and record your settings for future rides.</p>\n" +
    "            <p>Before starting your ride, check that all bike pins are tight, your cycling shoes are securely clipped in the pedals, and your brake is working.</p>\n" +
    "          </div>\n" +
    "        </section>\n" +
    "        \n" +
    "        <a class=\"button large center\">Book A Ride</a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"sidebar\">\n" +
    "        <h2 class=\"h small primary\">Booking</h2>\n" +
    "        <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "        \n" +
    "        <h2 class=\"h small primary\">Reservation</h2>\n" +
    "        <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "        \n" +
    "        <h2 class=\"h small primary\">Waitlist</h2>\n" +
    "        <p>45-minute indoor cycling classes are full-body workouts focused on optimal movements, music and motivation. It's extremely cardio, rocking out your core, upper and lower muscles.</p>\n" +
    "        \n" +
    "        <h2 class=\"h small primary\">Cancellation</h2>\n" +
    "        <p>Must be made 12 hours before class.</p>\n" +
    "        \n" +
    "        <a class=\"link\" href=\"/faq\">FAQs</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/index.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"slider-container home fitscreen\">\n" +
    "    <ul class=\"slider\">\n" +
    "      <li class=\"slide slide-1\"><span>Let's Go <br>For A Ride</span></li>\n" +
    "      <li class=\"slide slide-2\"><span>Plug In</span></li>\n" +
    "      <li class=\"slide slide-3 font-small light\"><span>RIDE - CLIMB - PUSH - STRETCH - SPRINT - CRUNCH - LIFT - DANCE</span></li>\n" +
    "    </ul>\n" +
    "  \n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/instructors.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/instructors.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">Meet Our Pack</h2>\n" +
    "      <p class=\"intro\">Our instructors have been selected for their high energy and ability to inspire a class.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-lightGray parts-4 instructors-info\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-raisa.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Raisa</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-migs.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Migs</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-trish.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Trish</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-kris.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Kris</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-yessa.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Yessa</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-mel.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Mel</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-rachel.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Rachel</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-abel.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Abel</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-mitch.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Mitch</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"image\">\n" +
    "          <img src=\"/assets/images/es-armand.jpg\">\n" +
    "        </div>  \n" +
    "        <h2 class=\"h medium primary\">Armand</h2>\n" +
    "        <p>Mini but mighty Marissa, lectured at the University of Cumbria in Dance, Jazz, Musical Theathre and Contemporary.</p>\n" +
    "      </section>\n" +
    "      \n" +
    "      <div class=\"book-cta\">\n" +
    "        <a class=\"button large center primary\"  href=\"/rates-and-packages\">Book A Ride</a>\n" +
    "      </div>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/rates.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/rates.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"slider-container rates\">\n" +
    "    <ul class=\"slider\">\n" +
    "      <li class=\"slide slide-1 font-medium\"><span>Be Part of Our Pack</span></li>\n" +
    "      <li class=\"slide slide-2\"><span>Let's Go <br>For A Ride</span></li>\n" +
    "      <li class=\"slide slide-3\"><span>Plug In</span></li>\n" +
    "    </ul>\n" +
    "  \n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">Rates &amp; Packages</h2>\n" +
    "      <a href=\"/first-ride\" class=\"link\">What to expect on your first ride</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-gray parts-4 rates-info\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <section>\n" +
    "        <h2>1 <span>Class</span></h2>\n" +
    "        <p class=\"price\">PHP <span>700</span></p>\n" +
    "        <p>Expires in 30 days</p>\n" +
    "        <a class=\"button small\">Buy</a>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <h2>5 <span>Classes</span></h2>\n" +
    "        <p class=\"price\">PHP <span>3,200</span></p>\n" +
    "        <p>Expires in 30 days</p>\n" +
    "        <a class=\"button small\">Buy</a>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <h2>10 <span>Classes</span></h2>\n" +
    "        <p class=\"price\">PHP <span>6,000</span></p>\n" +
    "        <p>Expires in 30 days</p>\n" +
    "        <a class=\"button small\">Buy</a>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <h2>20 <span>Classes</span></h2>\n" +
    "        <p class=\"price\">PHP <span>18,000</span></p>\n" +
    "        <p>Expires in 30 days</p>\n" +
    "        <a class=\"button small\">Buy</a>\n" +
    "      </section>\n" +
    "      <div class=\"faq\">\n" +
    "        <p>If it's your first time, call our studio to check for special promos and packages.</p>\n" +
    "        <p>You must purchase Electric Studio classes before you can reserve a spot in the class. Classes are transferrable between studios, but may cost different amounts. To purchases classes for another studio, click on the change studio dropdown menu and select your desired location. A mandatory waiver must be signed by parent/guardian, for riders under the age of 18 to take class at Electric Studio.</p>\n" +
    "        <a class=\"link\" href=\"/faq\">Faqs</a>\n" +
    "      </div>  \n" +
    "    </div>  \n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/rewards.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/rewards.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-lightGray sidebar-layout\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      \n" +
    "      <div class=\"main\">\n" +
    "        <h2 class=\"h large primary\">My Rewards</h2>\n" +
    "        <p class=\"intro\">Invite your friends and earn a FREE Electric ride when 5 of them signup for their first ride.</p>\n" +
    "        <section>\n" +
    "          <h3 class=\"h medium\">Share this link</h3>\n" +
    "          <input class=\"input\" value=\"http://electricstudio.com\">\n" +
    "        </section>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"sidebar light\">\n" +
    "        <h2 class=\"h small primary\">My Classes</h2>\n" +
    "        <p>Reserved <br> Bookmarks <br> History</p>\n" +
    "        <h2 class=\"h small primary\">My Packages</h2>\n" +
    "        <h2 class=\"h small primary\">My Account</h2>\n" +
    "        <p>Personal Info <br> Billing</p>\n" +
    "        <h2 class=\"h small primary\">My Rewards</h2>\n" +
    "        <a class=\"link\">Sign Out</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/schedule.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/schedule.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content schedule bg-lightGray\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      \n" +
    "      <div class=\"header\">\n" +
    "        <h2 class=\"range\">18 Jan - 24 Jan</h2>\n" +
    "        <div class=\"nav left\"><i class=\"fa fa-angle-left\"></i></div>\n" +
    "        <div class=\"nav right\"><i class=\"fa fa-angle-right\"></i></div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">M</h2>\n" +
    "        <h3 class=\"date\">Jan 19</h2>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailale\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">T</h2>\n" +
    "        <h3 class=\"date\">Jan 20</h2>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">W</h2>\n" +
    "        <h3 class=\"date\">Jan 21</h2>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">Th</h2>\n" +
    "        <h3 class=\"date\">Jan 22</h2>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">F</h2>\n" +
    "        <h3 class=\"date\">Jan 23</h2>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">S</h2>\n" +
    "        <h3 class=\"date\">Jan 24</h2>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column\">\n" +
    "        <h2 class=\"day\">Su</h2>\n" +
    "        <h3 class=\"date\">Jan 25</h2>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"column preview\">\n" +
    "        <h2 class=\"day\">M</h2>\n" +
    "        <h3 class=\"date\">Jan 26</h2>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">7:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">MC</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">8:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Marissa</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">10:30 AM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Kristina</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">1:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Abel</span>\n" +
    "        </a>\n" +
    "        <a class=\"row unavailable\" href=\"/class\">\n" +
    "          <span class=\"time\">5:30 PM</span>\n" +
    "          <span class=\"class\">Class Type 1</span>\n" +
    "          <span class=\"instructor\">Mario</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/whats-new.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/whats-new.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content\">\n" +
    "  <div class=\"wrapper\">\n" +
    "    <h2 class=\"h large primary\">What's New</h2>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/xRv-2XJrgi/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Something tells us this will be a great year. Hello 2015!</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-12-31T16:11:42+00:00\">Dec 12, 2014 at 8:11am PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/xI_Hhgprvb/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Sunday workout essentials</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-12-28T06:30:47+00:00\">Dec 12, 2014 at 10:30pm PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/w_CLnYJrmM/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Hope you&#39;re all rockin&#39; around the Christmas tree! 🎄 Have a Merry Christmas from Team Electric ⚡️</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-12-24T09:45:09+00:00\">Dec 12, 2014 at 1:45am PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/wyHel0Jrl-/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Gearing up for the holidays! ⚡️ #comingsoon Sign up at www.electricstudio.ph</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-12-19T09:21:19+00:00\">Dec 12, 2014 at 1:21am PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/wiucp5prkZ/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Crew love #electriceleven #electricstudio #teamelectric</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-12-13T09:53:59+00:00\">Dec 12, 2014 at 1:53am PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "    <div class=\"image-box\">\n" +
    "      <blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://instagram.com/p/vQ93BwJrvY/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_top\">Sneak peak of your #electriceleven. #teamelectric #electricstudio #fitness #indoorcycling #manila #philippines</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A photo posted by ELECTRIC STUDIO (@teamelectricph) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2014-11-11T15:50:56+00:00\">Nov 11, 2014 at 7:50am PST</time></p></div></blockquote>\n" +
    "<script async defer src=\"//platform.instagram.com/en_US/embeds.js\"></script>\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "</div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);

angular.module("../app/views/ng-templates/site/workouts.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/ng-templates/site/workouts.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">\n" +
    "  <title>Home - Electric Studio</title>\n" +
    "  \n" +
    "  <link rel=\"stylesheet\" href=\"assets/css/site.css\">\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <header class=\"main-header\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1 class=\"brand\">\n" +
    "        <a href=\"/\">\n" +
    "        <img src=\"/assets/images/electricstudio-nameplate.png\" alt=\"Electric Studio Logo\" class=\"nameplate\">\n" +
    "        </a>\n" +
    "        <img src=\"/assets/images/electricstudio-logo.png\" class=\"logo\">\n" +
    "      </h1>\n" +
    "      \n" +
    "      <ul class=\"main-menu\">\n" +
    "        <li>\n" +
    "          <a href=\"/about\">About Us</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/instructors\">Instructors</a>\n" +
    "        </li>  \n" +
    "        <li>\n" +
    "          <a href=\"/whats-new\">What's New</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <div class=\"account-header-menu\">\n" +
    "        <div class=\"options\">\n" +
    "          <a class=\"login-toggle\">Login /</a> \n" +
    "          <a class=\"signup-toggle\">Sign up</a>\n" +
    "          <a class=\"account\" href=\"/account\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/reserved\">My Classes</a>\n" +
    "            <a href=\"/rates-and-packages\">My Packages</a>\n" +
    "            <a href=\"/account\">My Account</a>\n" +
    "            <a href=\"/logout\">Sign Out</a>\n" +
    "          </div>  \n" +
    "        </div>\n" +
    "      </div>  \n" +
    "        \n" +
    "      <div class=\"book-menu\">\n" +
    "        <a class=\"book-toggle\">Book A Ride</a>\n" +
    "        \n" +
    "        <div class=\"menu-list\">\n" +
    "          <div class=\"holder\">\n" +
    "            <a href=\"/workouts\">The Workouts</a>\n" +
    "            <a href=\"/rates-and-packages\">Rates &amp; Packages</a>\n" +
    "            <a href=\"/schedule\">Schedule</a>\n" +
    "          </div>  \n" +
    "        </div>  \n" +
    "      </div>\n" +
    "        \n" +
    "      \n" +
    "      <a class=\"menu-toggle\"><i class=\"fa fa-bars\"></i></a>\n" +
    "      \n" +
    "    </div>  \n" +
    "  </header>\n" +
    "  \n" +
    "  <div class=\"header-form-container login\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Log In</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"login-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"Username / Email Address\" name=\"email\" required>\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\" required>\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Log In\" class=\"button\" name=\"login\">\n" +
    "      </form>\n" +
    "    </div>  \n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"header-form-container signup\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large light\">Sign Up</h2>\n" +
    "      <p class=\"notify\">Your Username / Email Address do not match. Please re-enter your informatin to Log In.</p>\n" +
    "      <form class=\"signup-form\" method=\"post\">\n" +
    "        <input class=\"input-box\" placeholder=\"First Name\" name=\"firstname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Last Name\" name=\"lastname\">\n" +
    "        <input class=\"input-box\" placeholder=\"Email Address\" name=\"email\">\n" +
    "        <input class=\"input-box\" placeholder=\"Mobile Number\" name=\"number\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Password\" name=\"password\">\n" +
    "        <input type=\"password\" class=\"input-box\" placeholder=\"Re-type Password\" name=\"password2\">\n" +
    "\n" +
    "        <input type=\"submit\" value=\"Sign Up\" class=\"button\" name=\"signup\">\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"slider-container workouts\">\n" +
    "    <ul class=\"slider\">\n" +
    "      <li class=\"slide slide-1\"><span>Feel the beat</span></li>\n" +
    "      <li class=\"slide slide-2\"><span>Let's Go <br>For A Ride</span></li>\n" +
    "      <li class=\"slide slide-3\"><span>Plug In</span></li>\n" +
    "    </ul>\n" +
    "  \n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"content\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h2 class=\"h large primary\">The Workout</h2>\n" +
    "      <p class=\"intro\">Each experience is a high-intensity full-body workout guided by a great team, supportive and positive instructors, and to a great soundtrack. It's extreme cardio, rocking your core, upper, and lower muscles.</p>\n" +
    "      <a href=\"/first-ride\" class=\"link\">What to expect on your first ride</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  \n" +
    "  <div class=\"content bg-gray parts-3\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <section>\n" +
    "        <div class=\"circles items-1 animated\" data-animation=\"flipInX\">\n" +
    "          <div class=\"item horizontal type-1\"></div>\n" +
    "        </div>\n" +
    "        <h2 class=\"h medium light\">Pure Electric</h2>\n" +
    "        <p>Our signature ride that incorporate full body movements, music, and free weights. A great class to start with.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"circles items-2 animated\" data-animation=\"flipInX\">\n" +
    "          <div class=\"item type-1\"></div>\n" +
    "          <div class=\"item vertical type-2\"></div>\n" +
    "        </div>\n" +
    "        <h2 class=\"h medium light\">Power Hour</h2>\n" +
    "        <p>For those that want a more challenging ride, push yourself with an extra 15 minutes of electic experience.</p>\n" +
    "      </section>\n" +
    "      <section>\n" +
    "        <div class=\"circles items-3 animated\" data-animation=\"flipInX\">\n" +
    "          <div class=\"item type-3\"></div>\n" +
    "          <div class=\"item vertical type-1\"></div>\n" +
    "          <div class=\"item diagonal type-2\"></div>\n" +
    "        </div>\n" +
    "        <h2 class=\"h medium light\">Electric Endurance</h2>\n" +
    "        <p>Think about going the distance with double the intensity through this back to back rides.</p>\n" +
    "      </section>\n" +
    "      \n" +
    "      <div class=\"book-cta\">\n" +
    "        <a class=\"button large center\" href=\"/schedule\">Book A Ride</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    \n" +
    "  </div>\n" +
    "\n" +
    "  <footer class=\"main-footer\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <ul class=\"footer-links\">\n" +
    "        <li>© ELECTRIC STUDIO 2015</li>\n" +
    "        <li><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li><a href=\"/career\">Carreer</a></li>\n" +
    "        <li><a href=\"/contact\">Contact Us</a></li>\n" +
    "      </ul>\n" +
    "      \n" +
    "      <ul class=\"social-links\">\n" +
    "        <li>\n" +
    "          <a href=\"mailto:info@electricstudio.ph\"><i class=\"fa fa-envelope\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://www.facebook.com/teamelectricph\"><i class=\"fa fa-facebook\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"http://instagram.com/teamelectricph/\"><i class=\"fa fa-instagram\"></i></a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a href=\"https://twitter.com/\"><i class=\"fa fa-twitter\"></i></a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>  \n" +
    "  </footer>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/vendor/unslider/src/unslider.min.js\"></script>\n" +
    "  <script src=\"/assets/vendor/FitText.js/jquery.fittext.js\"></script>\n" +
    "  \n" +
    "  <script src=\"/assets/js/site.js\"></script>\n" +
    "</body>  \n" +
    "</html>");
}]);
