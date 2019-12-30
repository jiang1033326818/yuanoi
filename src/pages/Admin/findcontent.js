
export function findAllself (arr1, id) {
  var shit = []
  var forFn = function (arr,id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item.pos === id) {
        console.log(item.id)
        let fuck = {
          id:item.id,
          title:item.title,
          name:item.name,
          pid:item.pid,
          dept:item.dept,
          phone:item.phone,
          pos:item.pos,
          leader:item.leader,
          relationship:item.relationship,
        }
        shit=[fuck]
        break
      }
      else  {
        if (item.children) {
          forFn(item.children,id)
        }
      }
    }
  }
  forFn(arr1, id)

  return shit
}


export default findAllself
