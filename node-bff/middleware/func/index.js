import * as get_Info_func from './get_info';

export default () => {
  const func = Object.assign({}, get_Info_func);
  return async (ctx, next) => {
    for (let v in func) {
      if (func.hasOwnProperty(v)) ctx[v] = func[v];
    }
    await next();
  }
}