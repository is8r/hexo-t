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

;(function(jQuery) {
  var pluginName = 'amzn';
  $[pluginName] = function(element, options) {

    //----------------------------------------------------------------------

    var defaults = {
        pluginName: pluginName
    }
    var plugin = this;
    plugin.settings = {}
    var $element = $(element);
    var el = element;
    var options;

    plugin.init = function() {
      options = plugin.settings = $.extend({}, defaults, options);

      // trace(srcL);
      // trace(link);
      plugin.createLinks();
    }

    //----------------------------------------------------------------------

    plugin.createLinks = function(e) {
      var affid = 'txx-22';
      var asin = $(el).data('amazon');
      var srcL = 'http://images-jp.amazon.com/images/P/'+asin+'.09.LZZZZZZZ.jpg';
      var src = 'http://images-jp.amazon.com/images/P/'+asin+'.09.MZZZZZZZ.jpg';
      var link = 'http://amazon.jp/o/ASIN/'+asin+'/'+affid+'/ref=nosim';

      //$(el).next().prepend('<img src="'+src+'" />');
      //$(el).next().wrap('<a href="'+link+'" target="_blank"></a>');
      // $(el).prepend('<a href="'+link+'" target="_blank"><img src="'+srcL+'" /></a>');
      $(el).prepend('<img src="'+srcL+'" />');
      $(el).attr('href', link);
      $(el).attr('target', '_blank');
      $(el).addClass('amzn');
    }

    //----------------------------------------------------------------------

    plugin.init();
  }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

  $(function() {
    $('[data-amazon]').amzn();
  });

})(jQuery);

