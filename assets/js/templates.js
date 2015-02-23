angular.module('templates-main', ['../app/views/ng-templates/admin/account.html', '../app/views/ng-templates/admin/class.html', '../app/views/ng-templates/admin/package.html', '../app/views/ng-templates/admin/schedule.html', '../app/views/ng-templates/admin/slider.html']);

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
    "    <link rel=\"stylesheet\" href=\"/assets/css/styles.min.css\">\n" +
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
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Package</a>\n" +
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
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Package</a>\n" +
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
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Package</a>\n" +
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
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Package</a>\n" +
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
    "            <a href=\"\" class=\"float--left\" data-modal-toggle=\"add-package\">Add Package</a>\n" +
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
    "  <!-- modal Add Package -->\n" +
    "  <div class=\"modal\" data-modal=\"add-package\">\n" +
    "    <div class=\"modal__box pad\">\n" +
    "      <span class=\"close-btn modal-close\">X</span>\n" +
    "      <h3 class=\"h--medium brand-color space--bottom\">Add Package</h3>\n" +
    "\n" +
    "      <div class=\"space--bottom pad--bottom\">\n" +
    "        <span class=\"label\">Rider</span>\n" +
    "        <h4 class=\"h-small\">Jeph Fernandez</h4>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"space--bottom one-whole\">\n" +
    "        <div class=\"space--ends two-thirds\">\n" +
    "          <span class=\"label\">Select Class Package</span>\n" +
    "          <select class=\"select\">\n" +
    "            <option value=\"1\">1 Class</option>\n" +
    "            <option value=\"5\">5 Classes</option>\n" +
    "            <option value=\"10\">10 Classes</option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"space--ends\">\n" +
    "          <span class=\"label\">Notes</span>\n" +
    "          <textarea class=\"text-input\" cols=\"3\"></textarea>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"space--ends\">\n" +
    "          <span class=\"label\">Input Password</span>\n" +
    "          <input class=\"text-input\">\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
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
    "    <script src=\"/assets/js/script.min.js\"></script>\n" +
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
    "    <link rel=\"stylesheet\" href=\"/assets/css/styles.min.css\">\n" +
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
    "\n" +
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
    "    <script src=\"/assets/js/script.min.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
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
    "    <link rel=\"stylesheet\" href=\"/assets/css/styles.min.css\">\n" +
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
    "    <script src=\"/assets/js/script.min.js\"></script>\n" +
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
    "    <link rel=\"stylesheet\" href=\"/assets/css/styles.min.css\">\n" +
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
    "\n" +
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
    "    <script src=\"/assets/js/script.min.js\"></script>\n" +
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
    "    <link rel=\"stylesheet\" href=\"/assets/css/styles.min.css\">\n" +
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
    "\n" +
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
    "    <script src=\"/assets/js/script.min.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n" +
    "");
}]);
