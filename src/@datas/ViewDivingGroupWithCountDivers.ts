import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT *
    FROM [dbo].[diving_group_entity] dg
    INNER JOIN (
        SELECT divers.divingGroupEntityId
                , COUNT(divers.personEntityId) AS CountDivers
        FROM [dbo].[person_entity_dives_diving_group_entity] divers
        GROUP BY divers.divingGroupEntityId
    ) AS ReqCountDivers ON ReqCountDivers.divingGroupEntityId = dg.id`,
})
export class ViewDivingGroupWithCountDivers {
  @ViewColumn()
  id: number;
  @ViewColumn()
  date: Date;
  @ViewColumn()
  minimumRank: number;
  @ViewColumn()
  CountDivers: number;
}
