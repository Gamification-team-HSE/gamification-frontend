export default {
  profileMe: 'Me',
  profileAdmin: 'Admin',
  ratings: 'Ratings',
  rating: 'Rating',
  achievements: 'Achievements',
  users: 'Users',
  stats: 'Stats',
  events: 'Events',
  signOut: 'Sign out',
  feed: 'Feed',
  youHaveAchivs: 'You have {count} out of {total}',
  youAreInRating: 'You are {count} out of {total}',
  whatIsThis: 'What is this?',
  aboutRating: 'Rating based on total achievements count between other users. It`s okay if you are not in the top.',
  minsAgo: '{count} mins ago',

  // Login v2 page
  loginIntoSystemHeader: 'Sign In',
  loginEmailLabel: 'Enter an email, we will send code for sign in',
  loginEmailError: 'Incorrect email, please try again',
  loginSendCode: 'Send code',
  loginInputCode: 'Enter the code',
  loginResendCode: 'Send code again',
  loginCodeResended: 'Code sent again',
  loginIncorrectCode: 'Incorrect code, please try again',
  loginIntoSystemBtn: 'Sign in',
  loginUserNotExists: 'Account not exist',
  loginChangeEmail: 'Change email',
  loginDialogHeader: 'I do not have an account. How to sign up?',
  loginDialogBody: `Administrators of the system have permissions to add new users.
  Contact yours using email or in working chats.`,
  loginDialogBtn: 'Got it',

  // Admin page
  usersRating: 'Users rating',
  adminMainText: 'Here you can include users, events, achievements and indicators, and change or exclude - in the list of relevant entities.',
  adminUsersText: 'There are currently {count} active and {deleted} deleted users in the system, you can add users here, and delete and modify them in the user list.',
  adminRating1: 'By default, the rating is based on the number of completed milestones relative to all achievements.',
  adminRating2: 'But on the rating page, you can build it by individual indicators.',
  adminAchievText: 'There are now {count} achievements in the system, you can add them here, and delete and change them in the list of achievements.',
  adminEventsText: 'There are now {count} events in the system, you can add them here, and delete and change them in the list of events.',
  adminStatsText: 'There are now {count} indicators in the system, you can add them here, and delete and change them in the list of indicators.',
  adminAddUserViaForm: 'Add manually',
  adminAddUserViaExcel: 'Import from Excel',
  adminGoToUsers: 'Go to all users',
  adminGoToRating: 'Go to ratings',
  adminAddAchiev: 'Add new achievement',
  adminGoToAchieves: 'Go to all achievements',
  adminAddEvent: 'Add new event',
  adminGoToEvents: 'Go to all events',
  adminAddStat: 'Add new stat counter',
  adminGoToStats: 'Go to stats',

  // Add user modal
  addUserHeader: 'Creating user',
  addSeveralUsers: 'For adding several users at once',
  addUserGoToExcelMode: 'Go to import from Excel',
  fillInfoAboutUser: 'Fill user info, please',
  onlyAdminCanChangeEmail: 'Email can be changed only by administrator',
  usernamePlaceholder: 'Username in system',
  itsRequiredField: 'It is required field',
  userCanChangeLater: 'User can change it later',
  giveAdminStatus: 'Give admin access',
  adminStatusPlaceholder: 'Only you can give admin access, later you can delete this user',
  addUser: 'Add user',
  adminWithoutUsername: 'Admins have not username',
  userAdded: 'User created',

  // Edit user modal
  editUserHeader: 'User editing',
  saveChanges: 'Save Changes',

  // Users page
  usersList: 'List of users',
  searchByEmail: 'Search by email',
  activeUsers: 'Active ({count})',
  deletedUsers: 'Blocked ({count})',
  adminsUsers: 'Administrators ({count})',
  notFoundByFilter: 'Nothing found for your request',
  added: 'Added',
  blocked: 'Blocked',
  edit: 'Edit',
  delete: 'Delete',
  block: 'Block',
  recover: 'Recover',
  deleteAdminConfirmMessage: 'You will not be able to restore a deleted administrator, but you can create a new one.',
  deleteAdminConfirmOkLabel: 'Delete permanently',
  deleteAdminConfirmTitle: 'Removing an administrator',
  deleteUserConfirmMessage: 'You can restore it later in the "Deleted" tab.',
  deleteUserConfirmOkLabel: 'Block',
  deleteUserConfirmTitle: 'User blocking',
  cancel: 'Cancel',
  unblock: 'Unblock',
  recoverUserConfirmTitle: 'User recover',
  recoverUserConfirmMessage: 'Restore the user to the system. You can always block it again.',

  // Add event modal
  addEventHeader: 'Creating event',
  fillEventInfo: 'Fill event information, please',
  eventNamePlaceholder: 'Event name, e.g. New Year 2023',
  eventDescPlaceholder: 'Event description',
  eventRequiredField: 'It is required field',
  fileUpload: 'Choose image',
  eventDatePlaceholder: 'YYYY/MM/DD - YYYY/MM/DD',
  addEvent: 'Add event',

  // Edit event modal
  editEventHeader: 'Event editing',
}
