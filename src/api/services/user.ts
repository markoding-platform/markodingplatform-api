import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';
import {camelCase} from 'lodash';

import Database from '../../config/database';
import {User, UserInput, UserUpdateInput} from '../entity';

export interface NotInTeamParams {
  name?: string;
  schoolId?: string;
  selfUserId?: string;
  limit?: number;
  offset?: number;
}

@Service()
export default class UserService {
  private repository!: Repository<User>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(User);
  }

  async findOrCreate(data: UserInput): Promise<User> {
    let user = await this.repository
      .createQueryBuilder('user')
      .where({
        externalId: data.externalId,
      })
      .leftJoinAndSelect('user.profile', 'profile')
      .getOne();

    if (!user) {
      user = await this.repository.save({
        ...data,
        isEmailVerified: false,
      });
    }

    if (user) {
      await this.repository.update(
        {
          id: user.id,
        },
        {
          ...data,
        },
      );

      user = {
        ...user,
        ...data,
        isEmailVerified: true,
      };
    }

    return user as User;
  }

  async getOne(user: Partial<User>): Promise<User | undefined> {
    return this.repository.findOne(user);
  }

  async getUserTeacher(
    name?: string,
    schoolId?: string,
    limit = 10,
    offset = 0,
  ): Promise<User[]> {
    let userQuery = this.repository
      .createQueryBuilder('user')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.created_at', 'DESC');

    if (schoolId) {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.school_id = :schoolId AND profile.profile_type = :profileType',
        {schoolId, profileType: 'teacher'},
      );
    } else {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.profile_type = :profileType',
        {
          profileType: 'teacher',
        },
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name ILIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserStudent(
    name?: string,
    schoolId?: string,
    limit = 10,
    offset = 0,
  ): Promise<User[]> {
    let userQuery = this.repository
      .createQueryBuilder('user')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.created_at', 'DESC');

    if (schoolId) {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.school_id = :schoolId AND profile.profile_type = :profileType',
        {schoolId, profileType: 'student'},
      );
    } else {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.profile_type = :profileType',
        {
          profileType: 'student',
        },
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name ILIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserStudentNotInTeam(params: NotInTeamParams): Promise<User[]> {
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;

    let userQuery = this.repository
      .createQueryBuilder('user')
      .leftJoin('idea_users', 'ideaUser', 'user.id != ideaUser.user_id')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.name', 'ASC');

    if (params?.schoolId) {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.school_id = :schoolId AND profile.profile_type = :profileType',
        {schoolId: params.schoolId, profileType: 'student'},
      );
    } else {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.profile_type = :profileType',
        {
          profileType: 'student',
        },
      );
    }

    if (params?.name) {
      userQuery = userQuery
        .where('user.name ILIKE :name', {name: `%${params.name}%`})
        .andWhere('user.id != :selfId', {selfId: params.selfUserId});
    } else {
      userQuery = userQuery.where('user.id != :selfId', {
        selfId: params.selfUserId,
      });
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserMentor(
    name?: string,
    schoolId?: string,
    limit = 10,
    offset = 0,
  ): Promise<User[]> {
    let userQuery = this.repository
      .createQueryBuilder('user')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.created_at', 'DESC');

    if (schoolId) {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.school_id = :schoolId AND profile.profile_type = :profileType',
        {schoolId, profileType: 'student'},
      );
    } else {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.profile_type = :profileType',
        {
          profileType: 'mentor',
        },
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name ILIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserSupporter(
    name?: string,
    schoolId?: string,
    limit = 10,
    offset = 0,
  ): Promise<User[]> {
    let userQuery = this.repository
      .createQueryBuilder('user')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.created_at', 'DESC');

    if (schoolId) {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.school_id = :schoolId AND profile.profile_type = :profileType',
        {schoolId, profileType: 'student'},
      );
    } else {
      userQuery = userQuery.innerJoinAndSelect(
        'user.profile',
        'profile',
        'profile.profile_type = :profileType',
        {
          profileType: 'supporter',
        },
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name ILIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserDetail(id: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', {
        id,
      })
      .innerJoinAndSelect('user.profile', 'profile')
      .getOne();
  }

  async updateById(
    id: string,
    userData: Partial<UserUpdateInput>,
  ): Promise<User> {
    const {raw} = await this.repository
      .createQueryBuilder()
      .update(User)
      .set(userData)
      .where('id = :id', {id})
      .returning('*')
      .execute();

    Reflect.ownKeys(raw[0]).forEach((key) => {
      Reflect.set(raw[0], camelCase(key as string), raw[0][key]);
    });

    return raw[0];
  }

  async getUserLeader(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .limit(10)
      .orderBy('user.skilvulPoint + user.markodingPoint', 'DESC')
      .getMany();
  }
}
