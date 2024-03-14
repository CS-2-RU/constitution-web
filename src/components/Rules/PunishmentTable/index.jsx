import React from "react";

const PunishmentTable = ({data, headline = null, afterDescription = null}) => {
    return(
        <div className="rule-punishment-table">
            {headline && <span className="rule-example-headline"
                               dangerouslySetInnerHTML={{__html: headline}}/>}
            {data && data.length > 0 &&
                <table className="punishment-table">
                    <tr className="rule-punishment-tr">
                        <th className="rule-punishment-th">Пункт</th>
                        <th className="rule-punishment-th">Описание</th>
                        <th className="rule-punishment-th">Наказание</th>
                    </tr>
                    {data.map((row) => (
                        <tr className="rule-punishment-tr" key={row.title}>
                            <td className="rule-punishment-td rule-punishment-title"
                                dangerouslySetInnerHTML={{__html: row.title}}/>
                            <td className="rule-punishment-td rule-punishment-description"
                                dangerouslySetInnerHTML={{__html: row.description}}/>
                            <td className="rule-punishment-td rule-punishment-punishment">
                                {row.punishment.nar && <span className="punishment-key nar">Нар</span>}
                                {row.punishment.mute && <span className="punishment-key mute">Мут: <span
                                            className="punishment-value">{row.punishment.mute}</span>
                                </span>}
                                {row.punishment.warn && <span className="punishment-key warn">Пред</span>}
                                {row.punishment.ban && <span className="punishment-key ban">Бан: <span
                                            className="punishment-value">{row.punishment.ban}</span>
                                </span>}
                            </td>
                        </tr>
                    ))}
                </table>
            }
            {afterDescription &&
                <span className="rule-after-decsription"
                      dangerouslySetInnerHTML={{__html: afterDescription}}></span>}
        </div>
    )
}

export default PunishmentTable;