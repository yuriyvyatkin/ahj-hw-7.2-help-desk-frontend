# Домашнее задание №2 к лекции «Работа с HTTP»

[![Build status](https://ci.appveyor.com/api/projects/status/8u2dp4t65h15utuj?svg=true)](https://ci.appveyor.com/project/yuriyvyatkin/ahj-hw-7-2-help-desk-frontend)

Ссылка на Github Pages: https://yuriyvyatkin.github.io/ahj-hw-7.2-help-desk-frontend/

## HelpDesk: Frontend

#### Легенда

API вами написано, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

#### Описание

Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![](./pic/helpdesk.png)

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![](./pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![](./pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![](./pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на самом тикете (но не на контролах - сделано, редактировать или удалить):

![](./pic/helpdesk-5.png)

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере, который вы написали в предыдущей задаче.

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса, мы прекрасно понимаем, что на малых объёмах информации нет смысла делать её отдельно.
