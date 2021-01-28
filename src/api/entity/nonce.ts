import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('nonces')
export class Nonce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  nonce: string;

  @Column('timestamp')
  expiredAt: Date;
}

export type SSORequest = {
  sso: string;
  sig: string;
};

export type SSOResponse = {
  nonce: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
};
