const compose = (middlewares) => {
  return ctx => {
    const dispatch = i => {
      if (!middlewares[i]) return Promise.resolve()
      return Promise.resolve(middlewares[i](ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
}

const FactoryFn = n => async (ctx, next) => {
  console.log(`middleware${n} start`)
  next && await next()
  console.log(`middleware${n} end`)
}

compose([FactoryFn(1), FactoryFn(2), FactoryFn(3)])()