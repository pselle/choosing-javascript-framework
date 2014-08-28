(function (angular) {
  'use strict';

  angular.module('realtorsApp').directive('favorite', function () {

    // this is a Directive Definition Object (DDO).  all Directives should return one.
    return {
      // this magic character declares the directive as only usable in an "element" context
      // thus, <favorite></favorite> will work, but <div favorite></div> will not.
      restrict: 'E',

      // when the AngularJS compiler encounters this directive, fully *replace* the markup with this template.
      // so your markup will be <favorite></favorite>, but when you inspect the HTML, you see the template
      // (below)
      replace: true,

      // this is often best expressed as a templateUrl, which can point to a partial or a cached template ID,
      // but for our purposes, the markup is dinky enough that we can get away with this.
      // see how we can actually embed directives in here.
      // note: we removed the original ngClass directive to show a trivial example of custom DOM interaction.
      template: '<button class="pure-button"><i class="fa fa-star" ng-class="{red: property.favorite}"></i> Toggle Favorite</button>',

      // also rather ugly, this makes our Directive have a new Scope.  this Scope is special in that it's an
      // "isolate" Scope, which means it DOES NOT INHERIT from its Parent.  this is useful to keep
      // your directive reusable and testable, and to avoid Scope pollution.
      scope: {
        // this means "put a property called 'property' on my Scope, and its value will be a reference to the
        // object specified on the attribute with the same name"; i.e. property="property"
        property: '='
      },

      // this is the "linker" function.  AngularJS compilation happens in two phases ("compile" then "link"),
      // and a Scope is only available during the linking phase, which is about all you need to know for now.
      // the link() function always receives three parameters: a Scope, the element (tag) itself as a jqLite
      // object, and another object representing the element's attributes.  jqLite is like jQuery but..uh..lite,
      // and is part of AngularJS.
      // note: we do not use "attrs" in this Directive.
      link: function (scope, element, attrs) {

        // this is an example of a watch.  whenever the value of property.favorite changes *via any means*, the handler
        // will fire, as long as this directive is in the DOM.
        scope.$watch('property.favorite', function (favorite) {
          if (favorite) {
            element.addClass('pure-button-active');
          } else {
            element.removeClass('pure-button-active');
          }
        });

        // this is a toggle, so if we click, we need to set "favorite" if it's not set, or vice-versa;
        element.bind('click', function () {
          // because we're updating our property.favorite value here, the watch above will fire.
          scope.property.favorite = !scope.property.favorite;

          // finally, we are NOT in an AngularJS context here; this is basically a jQuery event handler!
          // we must cause a digest.
          scope.$apply();
        });

        // VERY IMPORTANT.  without this you will cause memory leaks.  if/when this directive leaves the DOM,
        // any jqLite bindings will remain.  this responds to the "$destroy" event, which is called just before
        // a Scope is destroyed (*this* directive's Scope).  when it's time to destroy the Scope, it's time to destroy
        // the directive, so here we unbind our "click" handler.
        scope.$on('$destroy', function () {
          element.unbind('click');
        });
      }
    };

  });

})(window.angular);
