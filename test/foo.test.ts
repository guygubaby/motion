interface IRouteItem {
  name: string
  children: IRouteItem[]
}

const routes: IRouteItem[] = [
  {
    name: 'a',
    children: [
      {
        name: 'b',
        children: [
          {
            name: 'd',
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'c',
    children: [],
  },
]

const target = '/a/b/d'

const preprocessPaths = (path: string): string[] => path.split('/').filter(p => p)

const findRoute = (paths: string[], routes: IRouteItem[]): IRouteItem | null => {
  const bfs = (paths: string[], routes: IRouteItem[]): IRouteItem | null => {
    if (paths.length === 0) return null

    const [tail, ...rest] = paths
    const route = routes.find(r => r.name === tail)
    if (route) {
      if (paths.length === 1) return route
      return bfs(rest, route.children)
    }
    return null
  }

  return bfs(paths, routes)
}

test('test bfs find routes function', () => {
  expect(preprocessPaths(target)).toEqual(['a', 'b', 'd'])

  const paths = preprocessPaths(target)
  expect(findRoute(paths, routes)).toEqual(routes[0].children[0].children[0])

  expect(findRoute(preprocessPaths('/a/c'), routes)).toBeNull()
})
