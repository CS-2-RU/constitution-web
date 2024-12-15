import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import UserChat from "../Templates/UserChat";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p10 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            mute: '24 часа',
                            ban: '360 дней'
                        }
                    }
                ]} />
            <Plain content="К личной информации относятся: имя, адрес проживания, почты и другие ресурсы способные как либо выдать информацию о человеке." />
            <Plain content="В зависимости от тяжести нарушения, зависит последующее наказание. Правило очень гибкое, выдавайте на свое усмотрение." />
            <BulletPoints headline="Пути решения при сливе в общий чат:" content={[
                "Удаляете сообщение"
            ]} />
            <UserChat headline="Пример:" content={[
                ["user-a", "Пользователь 1", "<u>@Inn3X</u> - его зовут Илья", null],
            ]} />
            <Plain content="В этом случае, нужно сразу удалить сообщение, написать указанному человеку в лс, и сказать что его имя слили." />
            <Plain content="Если человеку это не понравилось, в этом случае можете выдать пред по <c>1.10</c>, который раскрыл его имя, в скобочках можно дописать (имя)." />
            <UserChat headline="Пример 2:" content={[
                ["user-a", "Пользователь 2", "<u>@F1asc0</u> - вот его вк <c>https://vk.com/f1asco</c>", null],
            ]} />
            <Plain content="Удаляете сообщение, и при таком случае, если у указанного участника, в профиле в “Обо мне” или в привязанных к дискорду соц.сетях не стоит ссылок, которые слил <u>@Пользователь 2</u>, то в этом случае можно выдать бан <c>30-60д</c>, по усмотрению" />
            <UserChat headline="Пример 2:" content={[
                ["user-a", "Пользователь 3", "Сухарик живет в Йошкар-Ола по адресу улица Зарубина, 43", null],
            ]} />
            <Plain content="Делаете те же шаги что и в остальных примерах, но в этом случае бан от 360 дней." />
            <Plain content="Слив админ инфы/личной инфы полученной в админ канале наказывается вплоть до <r>снятия!</r>" />
        </div>
    )
}

export default Rule1p10;