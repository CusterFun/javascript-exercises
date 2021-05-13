// 嵌套
test = () => {
  fetch('//api.github.com/users').then(res => res.json()).then(json => {
    console.log(json);
    fetch('//api.github.com/users/custer-go').then(res => res.json()).then(json2 => {
      console.log(json2);
    })
  })
}

test2 = async () => {
  // 用户列表接口
  const res = await fetch('//api.github.com/users');
  const json = await res.json();
  console.log(json);
  // 详细用户接口
  const res2 = await fetch('//api.github.com/users/custer-go');
  const json2 = await res2.json();
  console.log(json2);
}