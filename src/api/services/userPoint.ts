import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';
import {
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';

import Database from '../../config/database';
import {
  activityPoints,
  activityPointType,
} from '../../libs/constants/pointActivity';
import {UserPoint} from '../entity';

@Service()
export default class UserPointService {
  private repository!: Repository<UserPoint>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(UserPoint);
  }

  async addUserPoint(
    userId: string,
    activity: activityPointType,
  ): Promise<UserPoint | undefined> {
    const activityPoint = activityPoints[activity];

    if (!activityPoint.rules) {
      const userPoint = this.repository.save({
        actityType: activity,
        activityText: activityPoint.activity,
        point: activityPoint.point,
        user_id: userId,
      });

      return userPoint;
    }

    let queryUserPoint = this.repository.createQueryBuilder();

    switch (activityPoint.rules.period) {
      case 'forever':
        queryUserPoint = queryUserPoint.where(
          'user_id = :userId AND activity_type = :activity',
          {userId, activity},
        );
        break;
      case 'daily':
        let yesterdayEOD = addDays(new Date(), -1);
        yesterdayEOD = setHours(yesterdayEOD, 59);
        yesterdayEOD = setMinutes(yesterdayEOD, 59);
        yesterdayEOD = setSeconds(yesterdayEOD, 59);
        yesterdayEOD = setMilliseconds(yesterdayEOD, 999);

        queryUserPoint = queryUserPoint.where(
          'user_id = :userId \
          AND activity_type = :activity \
          AND created_at < :createdAt',
          {
            userId,
            activity,
            createdAt: yesterdayEOD,
          },
        );
        break;
    }

    const userPointCount = await queryUserPoint.getCount();

    if (activityPoint.rules.max >= userPointCount) return;

    const userPoint = this.repository.save({
      actityType: activity,
      activityText: activityPoint.activity,
      point: activityPoint.point,
      user_id: userId,
    });

    return userPoint;
  }

  async getAllUserPointsByUserId(userId: string): Promise<UserPoint[]> {
    const userPoints = await this.repository
      .createQueryBuilder()
      .where('user_id = :userId', {userId})
      .getMany();

    return userPoints;
  }
}
