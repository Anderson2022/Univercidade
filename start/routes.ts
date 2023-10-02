

import Route from '@ioc:Adonis/Core/Route'

Route.get('/cpfs', 'Sessions/RegistersController.document')
Route.get('/cep/:ceps', 'Sessions/RegistersController.cep')
Route.post('/cell/:phones', 'Records/PhoneVerificationController.send')
Route.post('/checked/:phones', 'Records/PhoneVerificationController.verify')

Route.post('/classStudents', 'Registration/RegistrationController.storeStudent')
Route.post('/register', 'Sessions/RegistersController.store')

Route.post('/sessionUser', 'Sessions/SessionUserController.login')
Route.post('/sessionPhone', 'Sessions/SessionUserController.loginPhone')
Route.post('/sessionPhoneLogin/:phone', 'Sessions/SessionUserController.store')

Route.get('/CursesNotOff', 'Records/CoursesController.indexCursesNotOff')

Route.group(() => {
  

  Route.post('/studentCreate', 'Registration/StudentPorLoginsController.store')    
  Route.patch('/studentUpdate/:id', 'Registration/StudentPorLoginsController.update')


  Route.put('/classUpdate', 'Registration/RegistrationController.updateStudent')

  Route.get('/register', 'Sessions/RegistersController.index')
  Route.get('/status', 'Records/StatusController.index')
  Route.put('/status/:id', 'Records/StatusController.update')

  Route.get('/documents', 'Records/DocumentsController.index')
  Route.get('/tokens/:token', 'Sessions/SessionUserController.recoverToken')
  Route.get('/listStudent', 'Records/ListRegistersController.index')
  Route.get('/listStudent/:id', 'Records/ListRegistersController.show')
  Route.patch('/register/:id', 'Sessions/RegistersController.update')
  Route.get('/register/:id', 'Sessions/RegistersController.show')
  Route.delete('/register/:id', 'Sessions/RegistersController.destroy')


  Route.get('/scorePoints/:id', 'Records/ScoreController.show')
  Route.get('/scorePoints', 'Records/ScoreController.indexPoints')
  Route.get('/score', 'Records/ScoreController.index')

  Route.get('/users', 'Sessions/UsersController.index')
  Route.post('/users', 'Sessions/UsersController.store')
  Route.get('/users/:id', 'Sessions/UsersController.show')
  Route.patch('/users/:id', 'Sessions/UsersController.update')
  Route.delete('/users/:id', 'Sessions/UsersController.destroy')

  Route.get('/classes', 'Records/ClassesController.index')
  Route.post('/storeClasses', 'Records/ClassesController.storeClasses')
  Route.get('/classes/date', 'Records/ClassesController.searchByDate')
  Route.get('/classesOrCourse', 'Records/ClassesController.show')
  Route.patch('/updateClasses/:id', 'Records/ClassesController.update')
  Route.delete('/classes/:id', 'Records/ClassesController.destroy')

  Route.get('/requirements/:id', 'Records/RequirementsController.show')
  Route.get('/requirementsCourses/:id', 'Records/RequirementsController.RequirementsCoursesShow')
  Route.get('/courses/:id', 'Records/CoursesController.show')
  Route.get('/requirements', 'Records/RequirementsController.index')
  Route.post('/requirements', 'Records/RequirementsController.store')
  Route.patch('/requirements', 'Records/RequirementsController.update')
  Route.get('/requirementsAll', 'Records/RequirementsController.indexALL')


  Route.get('/courses', 'Records/CoursesController.index')
  Route.post('/courses', 'Records/CoursesController.store')
  Route.patch('/courses/:id', 'Records/CoursesController.update')
  Route.delete('/courses/:id', 'Records/CoursesController.destroy')
  Route.get('/coursesInstitution', 'Records/CoursesController.indexInstitution')

  Route.get('/institution', 'Records/InstitutionsController.index')
  Route.post('/institution', 'Records/InstitutionsController.store')
  Route.get('/institution/:id', 'Records/InstitutionsController.show')
  Route.patch('/institution/:id', 'Records/InstitutionsController.update')
  Route.delete('/institution/:id', 'Records/InstitutionsController.destroy')

  Route.get('/roles', 'Roles/RolesController.index')
  Route.post('/roles', 'Roles/RolesController.store')
  Route.get('/roles/:id', 'Roles/RolesController.show')
  Route.patch('/roles/:id', 'Roles/RolesController.update')
  Route.delete('/roles/:id', 'Roles/RolesController.destroy')

  Route.get('/permissions', 'Roles/PermissionsController.index')

  Route.post('/permissions', 'Roles/PermissionsController.store')
  Route.get('/permissions/:id', 'Roles/PermissionsController.show')
  Route.patch('/permissions/:id', 'Roles/PermissionsController.update')
  Route.delete('/permissions/:id', 'Roles/PermissionsController.destroy')

  Route.get('/permissionsRoles', 'Roles/RolesPermissionsController.index')
  Route.post('/permissionsRoles', 'Roles/RolesPermissionsController.store')
  Route.get('/permissionsRoles/:id', 'Roles/RolesPermissionsController.show')
  Route.patch('/permissionsRoles/:id', 'Roles/RolesPermissionsController.update')
  Route.delete('/permissionsRoles/:id', 'Roles/RolesPermissionsController.destroy')

  Route.delete('/sessionUser', 'Sessions/SessionUserController.destroy')


  Route.get('/coursesStatus', 'Dashboard/DashboardController.indexStatus')
  Route.get('/coursesStatus/:id', 'Dashboard/DashboardController.ShowStatus')
  Route.get('/cousesInfos', 'Dashboard/DashboardController.indexCouses')
  Route.get('/genderInfos', 'Dashboard/DashboardController.indexGender')
  Route.get('/ageInfos', 'Dashboard/DashboardController.indexAge')
  Route.get('/scoreInfos', 'Dashboard/DashboardController.indexScore')
  Route.get('/scoresInfos', 'Dashboard/DashboardController.indexScores')

}).middleware('auth')




Route.get('/teste', 'TestesController.show')
