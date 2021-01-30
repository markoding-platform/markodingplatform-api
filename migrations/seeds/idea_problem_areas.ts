require('dotenv').config();

import {Seeder, Factory} from 'typeorm-seeding';
import {Connection} from 'typeorm';

import {IdeaProblemArea} from '../../src/api/entity';

export default class CreateIdeaProblemAreas implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(IdeaProblemArea)
      .values([
        {problemArea: 'Pandemi Covid-19'},
        {problemArea: 'Pembelajaran Jarak Jauh'},
        {problemArea: 'Kekerasan terhadap anak dan perempuan'},
        {problemArea: 'Kesehatan Mental'},
        {problemArea: 'Lingkungan dan kelestarian alam'},
        {problemArea: 'Lapangan pekerjaan'},
        {problemArea: 'Korupsi'},
        {problemArea: 'Kemacetan'},
        {problemArea: 'Banjir'},
        {problemArea: 'Penegakan hukum'},
        {problemArea: 'Narkoba'},
        {problemArea: 'Perundungan/bullying/cyber-bullying'},
        {problemArea: 'Hoax dan literasi digital'},
        {problemArea: 'Minat baca dan tingkat literasi anak dan remaja'},
        {problemArea: 'Toleransi'},
        {problemArea: 'Perkelahian antar remaja'},
        {problemArea: 'Nasionalisme'},
        {problemArea: 'Disabilitas'},
        {problemArea: 'Pernikahan dini'},
        {problemArea: 'Kesehatan reproduksi'},
        {problemArea: 'Lainnya'},
      ])
      .execute();
  }
}
