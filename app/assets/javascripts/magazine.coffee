$ ->
#  ya_share_init window.location.href, 'Журнал Л\'Этуаль. Май 2016', $('.magazine-image img').attr('src')
#  $('.magazine-scroll').scrollable().navigator()
#  if $('.magazine-scroll-navi a').length * 14 > 660
#    w = 660
#  else
#    w = $('.magazine-scroll-navi a').length * 14
#  $('.magazine-scroll-navi').attr 'style', 'width: ' + w + 'px'
  #$(".magazine-scroll-navi").attr("style", "width: " + $(".magazine-scroll-navi a").length * 14 + "px");
  $('.magazine-item').click ->
    $('.magazine-image img').attr 'src', $(this).attr('href')
    $('.magazine-item.active').removeClass 'active'
    $(this).addClass 'active'
    window.location.hash = $(this).attr('rel')
#    ya_share_init window.location.href, 'Журнал Л\'Этуаль. Май 2016', $('.magazine-image img').attr('src')
    false
#  api = $('.magazine-scroll').data('scrollable')
#  items_in_block = 6
#  activeItem = undefined
  $('.magazine-image').click ->
    activeItemNumber = parseInt(window.location.hash.split('#')[1])
    activeItem = $(".magazine-item[rel='#{(if isNaN(activeItemNumber) then 0 else activeItemNumber) + 1}']")
    activeItem.click() if activeItem.length
#      api.seekTo Math.floor((activeItem.attr('rel') - 1) / items_in_block)
#    return
  if window.location.hash and (activeItem = $(".magazine-item[rel='#{window.location.hash.split("#")[1]}']"))
    $('.magazine-image img').attr 'src', activeItem.attr('href')
    activeItem.addClass 'active'
#    api.seekTo Math.floor((activeItem.attr('rel') - 1) / items_in_block)