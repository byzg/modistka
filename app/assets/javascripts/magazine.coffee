scrollable = null
itemsInBlock = 6
$(document).ready ->
  if window.location.hash and (activeItem = $(".magazine-item[rel='#{window.location.hash.split("#")[1]}']"))
    $('.magazine-image img').attr 'src', activeItem.attr('href')
    activeItem.addClass 'active'

    $('.magazine-scroll').scrollable().navigator()
    scrollable = $('.magazine-scroll').data('scrollable')
    scrollable.seekTo Math.floor((activeItem.attr('rel') - 1) / itemsInBlock)
  
    if $('.magazine-scroll-navi a').length * 14 > 660
      w = 660
    else
      w = $('.magazine-scroll-navi a').length * 14
    $('.magazine-scroll-navi').attr 'style', "width: #{w}px"
    $(".magazine-scroll-navi").attr("style", "width: #{$('.magazine-scroll-navi a').length * 14}px");

$(document).on 'click', '.magazine-item', (e)->
  e.preventDefault()
  $('.magazine-image img').attr 'src', $(this).attr('href')
  $('.magazine-item.active').removeClass 'active'
  $(this).addClass 'active'
  window.location.hash = $(this).attr('rel')

$(document).on 'click', '.magazine-image', ->
  activeItemNumber = parseInt(window.location.hash.split('#')[1])
  activeItem = $(".magazine-item[rel='#{(if isNaN(activeItemNumber) then 0 else activeItemNumber) + 1}']")
  if activeItem.length
    activeItem.click()
    scrollable.seekTo Math.floor((activeItem.attr('rel') - 1) / itemsInBlock)
