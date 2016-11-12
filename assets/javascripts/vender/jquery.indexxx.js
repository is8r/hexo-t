/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Exsample:


$(function() {
  $('#element').pluginName({'foo': 'bar'});
  $('#element').data('pluginName').public_function();
  $('#element').data('pluginName').settings.foo;
});

 */

;(function ( $, window, document, undefined ) {
  var pluginName = "indexxx", defaults = {};
  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      this.createIndexs();

      $('html, body').on('mousewheel', _.throttle(function(event) {
        $('html, body').stop();
      }, 300));
    },
    createIndexs: function () {
      var titles = [];
      $(this.element).parent().find('h2, h3').each(function(index, el) {
        titles.push(el);
      });

      var output = "";
      output += '<ol class="indexxx">'
      for (var i = 0; i < titles.length; i++) {
        var el = titles[i];
        var id = "indexxx"+i;
        var html = "";
        html += '<li class="'+$(el).get(0).tagName+'">';
        html += '<a href="#'+id+'">';
        html += $(el).text();
        html += '</a>';
        html += '</li>';
        output += html;

        if($('#'+id).length == 0) {
          $(el).before('<a id="'+id+'" name="'+id+'"></a>');
        }
      };
      output += '</ol>'
      $(this.element).html(output);

      this.addScroll();
    },
    addScroll: function () {
      var self = this;
      $(this.element).find('a').each(function(index, el) {
        if(!$(el).attr('isReady')) {
          $(el).attr('isReady', true);
          $(el).on('click', function(event) {
            event.preventDefault();
            self.onScroll($(this).attr('href'));
          });
        }
      });
    },
    onScroll: function (e) {
      if (!e || e == "#") target = 'body';
      else target = e;
      var margin = 20;
      var top = 0;
      if($(target).offset()) top = $(target).offset().top - margin;
      $('html, body').animate({scrollTop: top}, 500, 'easeOutExpo');
    }
  };
  $.fn[ pluginName ] = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, pluginName ) ) {
        $.data( this, pluginName, new Plugin( this, options ) );
      }
    });
  };
  $(function() {
    $('[data-indexxx]').indexxx();
  });
})( jQuery, window, document );
