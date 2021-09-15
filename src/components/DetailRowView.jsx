import React from 'react'

export default ({person}) => (
    <div>
        <p>Выбран пользователь <b>{person.firstName + ' ' + person.lastName}</b></p>
        <p>
            Описание: <br />
            <textarea defaultValue={person.description} />
        </p>

        <p>Адрес проживания: <b>{person.adress.streetAddress}</b></p>
        <p>Город: <b>{person.adress.city}</b></p>
        <p>Провинция/штат: <b>{person.adress.state}</b></p>
        <p>Индекс: <b>{person.adress.zip}</b></p>

    </div>
)

