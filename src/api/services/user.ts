import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {User, UserInput} from '../entity';

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
        name: data.name,
        email: data.email,
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

    if (!user?.isEmailVerified && data.isEmailVerified) {
      await this.repository.update(
        {
          id: user.id,
        },
        {
          isEmailVerified: true,
        },
      );

      user = {
        ...user,
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
        {profileType: 'teacher'},
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name LIKE :name', {name: `%${name}%`});
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
        {profileType: 'student'},
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name LIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }

  async getUserStudentNotInTeam(
    name?: string,
    schoolId?: string,
    limit = 10,
    offset = 0,
  ): Promise<User[]> {
    let userQuery = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('teams', 'team', 'user.id != team.user_id')
      .limit(limit)
      .offset(offset * limit)
      .orderBy('user.name', 'ASC');

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
        {profileType: 'student'},
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name LIKE :name', {name: `%${name}%`});
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
        {profileType: 'mentor'},
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name LIKE :name', {name: `%${name}%`});
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
        {profileType: 'supporter'},
      );
    }

    if (name) {
      userQuery = userQuery.where('user.name LIKE :name', {name: `%${name}%`});
    }

    const users = await userQuery.getMany();

    return users;
  }
}
