
export function findAllParent (arr1, name,leader) {
  console.log(name)
  var temp = []
  var forFn = function (arr,name, leaders) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item.name === leader) {
        let a = {
          id:item.id,
          title:item.title,
          name:item.name,
          leader:item.leader,
          dept:item.dept,
          phone:item.phone,
          pos:item.pos,
          relationship:item.relationship,
        }
        temp.push(a)
      }
      else  {
        if (item.children) {
          forFn(item.children,name, leaders)
        }
      }
    }
  }
  forFn(arr1, name,leader)
  return temp
}


export default findAllParent
