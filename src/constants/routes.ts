import { LayoutRoute } from 'src/types'

export const userRoutes: Array<LayoutRoute> = [
  {
    route: 'main',
    label: 'profileMe',
    color: 'primary',
    icon: 'sym_o_person',
  },
  {
    route: 'ratings',
    label: 'ratings',
    icon: 'sym_o_trending_up',
  },
  {
    route: 'achievements',
    label: 'achievements',
    icon: 'sym_o_hotel_class',

  },
  {
    route: 'users',
    label: 'users',
    icon: 'sym_o_group',
  },
]

export const adminRoutes: Array<LayoutRoute> = [
  {
    route: 'admin.main',
    label: 'profileAdmin',
    color: 'primary',
    icon: 'sym_o_admin_panel_settings',
  },
  {
    route: 'admin.users',
    label: 'users',
    icon: 'sym_o_group',
  },
  {
    route: 'admin.ratings',
    label: 'ratings',
    icon: 'sym_o_trending_up',
  },
  {
    route: 'admin.achievements',
    label: 'achievements',
    icon: 'sym_o_hotel_class',
  },
  {
    route: 'admin.events',
    label: 'events',
    icon: 'sym_o_celebration',

  },
  {
    route: 'admin.stats',
    label: 'stats',
    icon: 'sym_o_analytics',
  },
]
