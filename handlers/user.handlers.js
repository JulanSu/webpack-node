exports.get_user_detail = function (req,res) {
  var locals = {
    a:1,
    b:2,
    c:3,
    d:4
  }
  res.render('user/detail',{
    title:'个人中心',
    description:'我的个人中心',
    data:locals
  })
}