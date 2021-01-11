import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';
import * as firebase from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as serviceAccount from '../../config/firebase-service-account.json';

import Database from '../../config/database';
import {Chat, ChatInput} from '../entity';

const params = serviceAccount as any;

firebase.initializeApp({
  credential: firebase.credential.cert(params),
  databaseURL: 'https://markoding-platform.firebaseio.com',
});

@Service()
export default class ChatService {
  private repository!: Repository<Chat>;
  private rdb!: any;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Chat);
    this.rdb = firebase.database();
  }

  async getRecent(limit: number, offset: number): Promise<Chat[]> {
    return this.repository
      .createQueryBuilder('Chat')
      .leftJoinAndSelect('Chat.user', 'user')
      .orderBy('Chat.created_at', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async getById(id: number): Promise<Chat | undefined> {
    return this.repository
      .createQueryBuilder('Chat')
      .where('Chat.id = :id', {
        id,
      })
      .leftJoinAndSelect('Chat.user', 'user')
      .getOne();
  }

  async store(data: Partial<ChatInput>): Promise<Chat> {
    const chat = await this.repository.save(data);
    if (chat) {
      const receiverRef = this.rdb.ref('chat');
      receiverRef.set({
        id: chat.id,
        t: firebase.database.ServerValue.TIMESTAMP,
      });
    }
    return chat;
  }
}
