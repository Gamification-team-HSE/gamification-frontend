import { LayoutRoute } from 'src/types'

export const userRoutes: Array<LayoutRoute> = [
  {
    route: 'main',
    label: 'Me',
    color: 'primary',
  },
  {
    route: 'ratings',
    label: 'Ratings',
  },
  {
    route: 'achievements',
    label: 'Achievements',

  },
  {
    route: 'users',
    label: 'Users',
  },
]

export const adminRoutes: Array<LayoutRoute> = [
  {
    route: 'admin.main',
    label: 'Admin',
    color: 'primary',
  },
  {
    route: 'admin.ratings',
    label: 'Ratings',
  },
  {
    route: 'admin.achievements',
    label: 'Achievements',
  },
  {
    route: 'admin.users',
    label: 'Users',
  },
  {
    route: 'admin.stats',
    label: 'Stats',
  },
  {
    route: 'admin.events',
    label: 'Events',
  },
]
