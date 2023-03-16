export default {
  profileMe: 'Моя страница',
  profileAdmin: 'Панель администратора',
  ratings: 'Рейтинг',
  rating: 'Рейтинг',
  achievements: 'Достижения',
  users: 'Пользователи',
  stats: 'Показатели',
  events: 'События',
  signOut: 'Выйти',
  feed: 'Лента',
  youHaveAchivs: 'У вас {count} из {total}',
  youAreInRating: 'Вы {count} из {total}',
  whatIsThis: 'Что это?',
  aboutRating: 'Рейтинг рассчитывает на основе всех достижений у всех пользователей.',
  minsAgo: '{count} минут назад',

  // New login v2,
  loginIntoSystemHeader: 'Войти в систему',
  loginEmailLabel: 'Введите почту, вышлем туда код для входа',
  loginEmailError: 'Некорректный адрес, попробуйте еще раз',
  loginSendCode: 'Отправить код',
  loginInputCode: 'Введите код с почты',
  loginResendCode: 'Выслать код еще раз',
  loginCodeResended: 'Код отправлен повторно',
  loginIncorrectCode: 'Неверный код, попробуйте еще раз',
  loginIntoSystemBtn: 'Войти в систему',
  loginUserNotExists: 'Меня нет в системе',
  loginChangeEmail: 'Ввести другой аккаунт',
  loginDialogHeader: 'Меня нет в системе. Что делать?',
  loginDialogBody: `Добавлением пользователей в систему занимаются администраторы.
  Напишите своему на контактную почту или в рабочем чате.`,
  loginDialogBtn: 'Понятно',

  // Admin page
  usersRating: 'Рейтинг пользователей',
  adminMainText: 'Здесь вы можете добавлять пользователей, события, достижения и показатели, а изменять или удалять - в списках соответствующих сущностей.',
  adminUsersText: 'В системе сейчас {count} активных и {deleted} удаленных пользователей, вы можете добавлять пользователей здесь, а удалять и изменять - в списке пользователей.',
  adminRating1: 'По умолчанию рейтинг строится на основе количества выполненных показателей относительно всех достижений.',
  adminRating2: 'Но на странице рейтинга вы можете строить его по отдельным показателям.',
  adminAchievText: 'В системе сейчас {count} достижений, вы можете добавлять их здесь, а удалять и изменять - в списке достижений.',
  adminEventsText: 'В системе сейчас {count} событий, вы можете добавлять их здесь, а удалять и изменять - в списке событий.',
  adminStatsText: 'В системе сейчас {count} показателей, вы можете добавлять их здесь, а удалять и изменять - в списке показателей.',
  adminAddUserViaForm: 'Добавить в ручную',
  adminAddUserViaExcel: 'Добавить из Excel',
  adminGoToUsers: 'Перейти к списку пользователей',
  adminGoToRating: 'Перейти к рейтингу',
  adminAddAchiev: 'Добавить новое достижение',
  adminGoToAchieves: 'Перейти к списку достижений',
  adminAddEvent: 'Добавить новое событие',
  adminGoToEvents: 'Перейти к списку событий',
  adminAddStat: 'Добавить новый показатель',
  adminGoToStats: 'Перейти к списку показателей',

  // Add user modal
  addUserHeader: 'Добавление пользователя',
  addSeveralUsers: 'Для добавления сразу нескольких пользователей',
  addUserGoToExcelMode: 'Перейти к добавлению из Excel',
  fillInfoAboutUser: 'Заполните информацию о пользователе',
  onlyAdminCanChangeEmail: 'Почту может менять только администратор',
  usernamePlaceholder: 'Имя в системе, например - ФИО',
  itsRequiredField: 'Это обязательное поле',
  userCanChangeLater: 'Пользователь сможет поменять позже',
  giveAdminStatus: 'Дать права администратора',
  adminStatusPlaceholder: 'Выдать права можете только Вы, потом вы сможете удалить этого администратора',
  addUser: 'Добавить пользователя',
  adminWithoutUsername: 'Администраторам это поле не нужно',
  userAdded: 'Пользователь создан',

  // Edit user modal
  editUserHeader: 'Изменение пользователя',
  saveChanges: 'Сохранить изменения',

  // Users page
  usersList: 'Список пользователей',
  searchByEmail: 'Поиск по email',
  activeUsers: 'Активные ({count})',
  deletedUsers: 'Заблокированные ({count})',
  adminsUsers: 'Администраторы ({count})',
  notFoundByFilter: 'По вашему запросу ничего не найдено',
  added: 'Добавлен',
  blocked: 'Заблокирован',
  edit: 'Изменить',
  delete: 'Удалить',
  block: 'Заблокировать',
  recover: 'Восстановить',
  deleteAdminConfirmMessage: 'Вы не сможете восстановить удаленного администратора, но сможете создать заново.',
  deleteAdminConfirmOkLabel: 'Удалить навсегда',
  deleteAdminConfirmTitle: 'Удаление администратора',
  deleteUserConfirmMessage: 'Вы сможете восстановить его позже во вкладке "Удаленные".',
  deleteUserConfirmOkLabel: 'Заблокировать',
  deleteUserConfirmTitle: 'Блокировка пользователя',
  cancel: 'Отменить',
  unblock: 'Разблокировать',
  recoverUserConfirmTitle: 'Разблокировка пользователя',
  recoverUserConfirmMessage: 'Восстановить пользователя в систему. Вы всегда можете заблокировать его снова.',

  // Add event modal
  addEventHeader: 'Добавление события',
  fillEventInfo: 'Заполните информацию о событии',
  eventNamePlaceholder: 'Название события, например, Новый год 2023',
  eventDescPlaceholder: 'Описание события',
  eventRequiredField: 'Это обязательное поле',
  fileUpload: 'Выберите изображение',
  eventDatePlaceholder: 'ДД.ММ.ГГГГ - ДД.ММ.ГГГГ',
  addEvent: 'Добавить событие',

  // Edit event modal
  editEventHeader: 'Изменение события',

  // Events page
  findByName: 'Найти по названию',
  noDescription: 'Нет описания',
  eventDuration: 'Продолжительность',
  deleteEventTitle: 'Удалить событие',
  deleteEventConfirm: 'Вы уверены, что хотите удалить событие?',
  deleteEventSuccess: 'Событие удалено',

  // Edit stat modal
  editStatHeader: 'Изменение показателя',

  // User page
  userStatistics: '{count} из {total}',

  // Ratings page
  ratingTitle: 'Рейтинг пользователей',
  ratingSortStat: 'Название показателя',
  sortBy: 'Сортировать по',

  // Add achievement modal
  addAchievementHeader: 'Добавление достижения',
  fillAchievementInfo: 'Заполните информацию о достижении',
  achievementNamePlaceholder: 'Название достижения, например, Самый продуктивный программист',
  achievementDescPlaceholder: 'Описание достижения',
  addAchievement: 'Добавить достижение',

  // Edit achievement modal
  editAchievementHeader: 'Изменение достижения',

  // Achievements page
  deleteAchievementTitle: 'Удалить достижение',
  deleteAchievementConfirm: 'Вы уверены, что хотите удалить достижение?',
  deleteAchievementSuccess: 'Достижение удалено',
}
