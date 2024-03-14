'use strict';

import defaults from '@src/components/vue2-simple-calendar/src/config/defaults';
import languages from '@src/components/vue2-simple-calendar/src/utils/languages';
import calendarComponent from '@src/components/vue2-simple-calendar/src/components/calendar.vue';

function install(Vue, options = {}) {
  const calendarOptions = Object.assign(defaults, options);

  if (options.languages) {
    languages.addLanguage(options.languages);
  }

  const calendar = {
    eventBus: new Vue(),
    translations: languages.getTranslation(calendarOptions.locale)
  };
  

  Vue.prototype.$calendar = Object.assign(calendar, calendarOptions);

  Vue.component(calendarOptions.componentName, calendarComponent);
}

export default install;

if (typeof module === 'object' && module.exports) {
  module.exports.install = install;
}
