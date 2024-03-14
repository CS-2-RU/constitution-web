import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../PunishmentTable";

const Rule1p11 = () => {
    return (
        <div className="rule-container">
            <Plain content="Правил сообщества очень много, для них мы создали отдельную <c>таблицу</c>, однако они распространяются не только на сообщения в чате или устные перепалки, так же под это правило попадают оскорбительные названия приватных комнат." />
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        description: 'Не притесняйте других, не организовывайте, не способствуйте и не принимайте участие в притеснениях. <br><b>Пример:</b> Открытый кибербулинг участника сервера | призыв',
                        punishment: {
                            ban: '30 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '2',
                        description: 'Не организовывайте, не способствуйте и не участвуйте в ненавистнических высказываниях или действиях. <br><b>Пример:</b> <m>Негры пидорасы</m>',
                        punishment: {
                            ban: '30 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '3',
                        description: 'Не угрожайте насилием или нанесением вреда другим людям. <br><b>Пример:</b> <m>Давай адрес, приеду буду тебя резать</m>',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '4',
                        description: 'Не используйте Discord для организации, популяризации или поддержки международного терроризма. <br><b>Пример 1:</b> Участник скидывает фотку с Гитлером. <br><b>Пример 2:</b> Участник: <m>Ебать, гидра возродилась, нужно закупаться)))</m>',
                        punishment: {
                            ban: '9999 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '5',
                        description: 'Ни в коем случае не допускайте сексуализации детей. <br><b>Пример:</b> Пользователь скидывает/демонстрирует обнаженные тела лиц младше 18 лет.',
                        punishment: {
                            ban: '9999 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '6',
                        description: 'Не предоставляйте контент для взрослых лицам младше 18 лет. <br><b>Пример:</b> В войсе сидят пользователи младше 18 лет, и на демонстрации человек включает порно.',
                        punishment: {
                            ban: '60 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '7',
                        description: 'Не делитесь контентом откровенно сексуального характера других людей без их согласия. <br><b>Пример:</b> Фотки интимного характера другого пользователя',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '8',
                        description: 'Не делитесь контентом, который отражает или популяризует самоубийства или причинение себе вреда. <br><b>Пример:</b> Гифка/Видео, где человек прыгает с крыши.',
                        punishment: {
                            ban: '90 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '9',
                        description: 'Не делитесь реальными материалами, изображающими кровопролитие, чрезмерное насилие или причинение вреда животным, особенно с намерением доставить беспокойство другим или шокировать их. <br><b>Пример 1:</b> Гифка/видео где человек режет себе руки. <br><b>Пример 2:</b> Гифка/видео, где душат котёнка.',
                        punishment: {
                            ban: '60 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '10',
                        description: 'Не делитесь контентом, который нарушает интеллектуальную собственность или другие права.',
                        punishment: {
                            ban: '30 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '11',
                        description: 'Не сообщайте ложную или вводящую в заблуждение информацию (другое название — дезинформация). <br><b>Пример:</b> Участник: <m>Ребят, я знаю что виталити выиграет, там подставной матч, заливайте кеш туда! Бешенный икс на них!</m>',
                        punishment: {
                            ban: '60 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '12',
                        description: 'Не координируйте и не участвуйте в действиях с целью выдать себя за физическое лицо или организацию. <br><b>Пример:</b> Участник полностью скопировал профиль другого пользователя, и говорит за его имя.',
                        punishment: {
                            ban: '30 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '13',
                        description: 'Не занимайтесь деятельностью, направленной на причинение ущерба или получение несанкционированного доступа к учетной записи другого пользователя, сети или системе. <br><b>Пример:</b> Участник скинул в мемы видос, который крашит дискорд.',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '14',
                        description: 'Не распространяйте и не предоставляйте доступ к контенту, связанному со взломом или распространением украденных товаров, пиратского контента или учетных записей. <br><b>Пример:</b> Пользователь скидывает ссылку на торрент.',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '15',
                        description: 'Не используйте Discord для рассылки спама, манипулирования взаимодействием или нарушения взаимодействия других людей. <br><b>Пример:</b> Участник скидывает всем в лс следующее сообщение: <m>ку,бля, кинь эту ссылку на приглашение в команду, у меня не отправляет, а люди нужны на турик</m> <br> <i>*скам ссылка, под видом регистрации на турнир*</i>',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '16',
                        description: 'Запрещается использовать Discord для продвижения, координирования или проведения финансовых махинаций. <br><b>Пример 1:</b> Участник скидывает в канал #общение следующее сообщение: <m>Ребят, кто хочет подзаработать?) Работа из дома, заработок зависит от вас, в день можно делать по 4к 🤑🤑🤑 TG: lovyshka_mamonta</m> <br><b>Пример 2:</b> Участник скидывает в лс следующее сообщение: <m>Залетай на *****, там чел за месяц поднял 150к) Давай и ты подтягивайся!</m> <br> <i>*ссылка на чат скаммеров*</i>',
                        punishment: {
                            ban: '9999 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '17',
                        description: 'Не организовывайте, не способствуйте и не участвуйте в каком-либо незаконном или опасном виде деятельности. <br><b>Пример 1:</b> Участник: <m>гайс, собираемся на площади в 15:00, отпиздим чурок, устроим митинг</m> - <c>Бан: 9999 дней</c> <br><b>Пример 2:</b> Скримеры, быстро мигающие картинки и тд тп, по ним можно выдать <c>Бан 360 дней</c>, а не на <c>9999 дней</c>',
                        punishment: {
                            ban: '9999 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                    {
                        title: '18',
                        description: 'Не злоупотребляйте продуктами Discord каким-либо образом (Продажа или покупка учетной записи или сервера, или участие в мошеннических программах поощрений Nitro или деятельности по стимулированию.) <br><b>Пример 1:</b> Участник: <m>Ребят, ухожу из дс, могу продать свой акк и свой сервер 1к участников.</m> <br><b>Пример 2:</b> Пользователь скидывает ссылку на получения нитро за регистрацию в стиме, вероятнее всего это скам ссылка, но также не забывайте сами проверять наличие скама.',
                        punishment: {
                            ban: '360 дней',
                            warn: null,
                            mute: null,
                            nar: null,
                        }
                    },
                ]} />
        </div>
    )
}

export default Rule1p11;