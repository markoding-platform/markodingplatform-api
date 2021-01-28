import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Profile, ProfileInput, User} from '../entity';

@Service()
export default class ProfileService {
  private profileRepository!: Repository<Profile>;
  private userRepository!: Repository<User>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.profileRepository = this.database.connection.getRepository(Profile);
    this.userRepository = this.database.connection.getRepository(User);
  }

  async getById(id: string): Promise<Profile | undefined> {
    return this.profileRepository.findOne({id});
  }

  async store(userId: string, profile: Partial<Profile>): Promise<Profile> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw {
        statusCode: 500,
        message: 'user not found',
      };
    }

    const newProfile = await this.profileRepository.save(profile);

    user.profile = newProfile;

    await this.userRepository.save(user);

    return newProfile;
  }

  async update(id: string, profile: Partial<ProfileInput>): Promise<Profile> {
    await this.profileRepository.save({
      id,
      ...profile,
    });

    const updated = await this.getById(id);

    if (!updated) {
      throw {
        statusCode: 500,
        message: 'user is not found',
      };
    }

    return updated;
  }
}
