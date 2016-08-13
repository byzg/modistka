$(document).ready ->
  if location.pathname.match(/\/users\/new/)
    $('#user_phone').mask("(999) 999-9999")

  if location.pathname == '/users'
    location.hash = '#new_user'