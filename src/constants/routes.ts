import { LayoutRoute } from 'src/types'

export const userRoutes: Array<LayoutRoute> = [
  {
    route: 'main',
    label: 'Me',
    color: 'primary',
    icon: 'sym_o_person',
  },
  {
    route: 'ratings',
    label: 'Ratings',
    icon: 'sym_o_trending_up',
  },
  {
    route: 'achievements',
    label: 'Achievements',
    icon: 'sym_o_hotel_class',

  },
  {
    route: 'users',
    label: 'Users',
    icon: 'sym_o_group',
  },
]

export const adminRoutes: Array<LayoutRoute> = [
  {
    route: 'admin.main',
    label: 'Admin',
    color: 'primary',
    icon: 'sym_o_person',

  },
  {
    route: 'admin.ratings',
    label: 'Ratings',
    icon: 'sym_o_trending_up',

  },
  {
    route: 'admin.achievements',
    label: 'Achievements',
    icon: 'sym_o_hotel_class',

  },
  {
    route: 'admin.users',
    label: 'Users',
    icon: 'sym_o_group',

  },
  {
    route: 'admin.stats',
    label: 'Stats',
    icon: 'sym_o_analytics',

  },
  {
    route: 'admin.events',
    label: 'Events',
    icon: 'sym_o_celebration',

  },
]
