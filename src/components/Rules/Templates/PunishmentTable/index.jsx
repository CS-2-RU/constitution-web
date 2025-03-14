import React from "react";

const PunishmentTable = ({data, headline = null, afterDescription = null}) => {
    let isDescription = false;
    for (let i of data) {
        if (i.description) {
            isDescription = true;
            break;
        }
    }
    return(
        <div className={`rule-punishment-table ${isDescription ? 'long' : 'short'}`}>
            {headline && <span className="rule-example-headline"
                               dangerouslySetInnerHTML={{__html: headline}}/>}
            {data && data.length > 0 &&
                <table className="punishment-table">
                    <tr className="rule-punishment-tr">
                        <th className="rule-punishment-th">Пункт</th>
                        {isDescription && <th className="rule-punishment-th">Описание</th>}
                        <th className="rule-punishment-th">Наказание</th>
                    </tr>
                    {data.map((row) => (
                        <tr className="rule-punishment-tr" key={row.title}>
                            <td className="rule-punishment-td rule-punishment-title"
                                dangerouslySetInnerHTML={{__html: row.title}}/>
                            {isDescription && <td className="rule-punishment-td rule-punishment-description"
                                    dangerouslySetInnerHTML={{__html: row.description}}/>}
                            <td className="rule-punishment-td rule-punishment-punishment">
                                {row.punishment.verbal && <span className="punishment-key verbal">Словесное предупреждение</span>}
                                {row.punishment.mute && <span className="punishment-key mute">Мут: <span className="punishment-value">{row.punishment.mute}</span></span>}
                                {row.punishment.warn && <span className="punishment-key warn">Пред</span>}
                                {row.punishment.timeout && <span className="punishment-key timeout">Таймаут: <span className="punishment-value">{row.punishment.timeout}</span></span>}
                                {row.punishment.localban && <span className="punishment-key ban">Локал Бан: <span className="punishment-value">{row.punishment.localban}</span></span>}
                                {row.punishment.older && <span className="punishment-key older">Обращение к старшей администрации</span>}
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {afterDescription && <span className="rule-after-decsription" dangerouslySetInnerHTML={{__html: afterDescription}}></span>}
        </div>
    )
}

export default PunishmentTable;